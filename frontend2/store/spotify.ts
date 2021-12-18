import {
  Action,
  Module,
  Mutation,
  MutationAction,
  VuexModule,
} from 'vuex-module-decorators'
import { SpotifyWebApi } from 'spotify-web-api-ts'
import {
  AudioFeatures,
  Playlist,
  PrivateUser,
} from 'spotify-web-api-ts/types/types/SpotifyObjects'
import { GetMyPlaylistsResponse } from 'spotify-web-api-ts/types/types/SpotifyResponses'

@Module({
  name: 'spotify',
  stateFactory: true,
  namespaced: true,
})
export default class SpotifyStore extends VuexModule {
  spotify: SpotifyWebApi = new SpotifyWebApi()

  me: PrivateUser | null = null
  playlists: GetMyPlaylistsResponse | null = null

  playlistDetails: Map<string, Playlist> = new Map()
  trackFeatures: Map<string, AudioFeatures> = new Map()

  redirectUri?: string

  get hasAccessToken() {
    return this.spotify.getAccessToken() !== ''
  }

  get hasDetails() {
    return this.me !== null && this.playlists !== null
  }

  @Mutation
  setAccessToken(accessToken: string) {
    this.spotify.setAccessToken(accessToken)
  }

  @MutationAction
  async setDetails() {
    return {
      me: await this.spotify.users.getMe(),
      playlists: await this.spotify.playlists.getMyPlaylists(),
    }
  }

  @Mutation
  setPlaylistDetails(playlist: Playlist) {
    this.playlistDetails.set(playlist.id, playlist)
  }

  @Action
  async getPlaylistDetails(playlistId: string): Promise<Playlist> {
    let playlist = this.playlistDetails.get(playlistId)

    if (!playlist) {
      playlist = await this.spotify.playlists.getPlaylist(playlistId)
      this.context.commit('setPlaylistDetails', playlist)
    }
    return playlist
  }

  @Mutation
  setTrackFeatures(features: AudioFeatures) {
    this.trackFeatures.set(features.id, features)
  }

  @Action
  async getTrackFeatures(trackId: string): Promise<AudioFeatures> {
    let features = this.trackFeatures.get(trackId)

    if (!features) {
      features = await this.spotify.tracks.getAudioFeaturesForTrack(trackId)
      this.context.commit('setTrackFeatures', features)
    }
    return features
  }

  @Action
  async getPlaylistTrackFeatures(playlistId: string): Promise<AudioFeatures[]> {
    const playlist = await this.getPlaylistDetails(playlistId)
    const trackIds = playlist.tracks.items.map((item) => item.track.id)
    const features = (await this.spotify.tracks.getAudioFeaturesForTracks(
      trackIds
    )) as AudioFeatures[]

    for (const trackFeatures of features) {
      this.context.commit('setTrackFeatures', trackFeatures)
    }

    return features
  }
}
