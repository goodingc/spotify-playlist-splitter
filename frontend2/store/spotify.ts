import {
  Action,
  Module,
  Mutation,
  MutationAction,
  VuexModule,
} from 'vuex-module-decorators'
import { SpotifyWebApi } from 'spotify-web-api-ts'
import {
  Artist,
  AudioFeatures,
  Playlist,
  PlaylistItem,
  PrivateUser,
  SimplifiedPlaylist,
} from 'spotify-web-api-ts/types/types/SpotifyObjects'

@Module({
  name: 'spotify',
  stateFactory: true,
  namespaced: true,
})
export default class SpotifyStore extends VuexModule {
  spotify: SpotifyWebApi = new SpotifyWebApi()

  me: PrivateUser | null = null
  playlists: SimplifiedPlaylist[] | null = null

  playlistDetails: Map<string, Playlist> = new Map()
  trackFeatures: Map<string, AudioFeatures> = new Map()
  artistDetails: Map<string, Artist> = new Map()

  redirectUri?: string

  get hasAccessToken() {
    return this.spotify.getAccessToken() !== ''
  }

  get hasDetails() {
    return this.me !== null && this.playlists !== null
  }

  get editablePlaylists() {
    return this.playlists!.filter(
      (playlist) => playlist.owner.id === this.me!.id || playlist.collaborative
    )
  }

  @Mutation
  setAccessToken(accessToken: string) {
    this.spotify.setAccessToken(accessToken)
  }

  @MutationAction
  async setDetails() {
    return {
      me: await this.spotify.users.getMe(),
      playlists: (await this.spotify.playlists.getMyPlaylists()).items,
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

    return (await this.spotify.tracks.getAudioFeaturesForTracks(
      trackIds
    )) as AudioFeatures[]
  }

  @Action
  async executePlaylistActions(
    actions: {
      action: PlaylistAction
      tracks: PlaylistItem[]
    }[]
  ) {
    await Promise.all(
      actions.map(async ({ action, tracks }) => {
        switch (action.type) {
          case 'new':
            const newPlaylist = await this.spotify.playlists.createPlaylist(
              this.me!.id,
              action.playlistName
            )
            await this.spotify.playlists.addItemsToPlaylist(
              newPlaylist.id,
              tracks.map((item) => item.track.uri)
            )
            break
        }
      })
    )
  }

  @Mutation
  setArtistDetails(artist: Artist) {
    this.artistDetails.set(artist.id, artist)
  }

  @Action
  async getArtist(artistId: string) {
    let artist = this.artistDetails.get(artistId)

    if (!artist) {
      artist = await this.spotify.artists.getArtist(artistId)
      this.context.commit('setArtistDetails', artist)
    }

    return artist
  }

  @Action
  async getPlaylistArtists(playlistId: string) {
    const playlist = await this.getPlaylistDetails(playlistId)

    return playlist.tracks.items.map((item) => {
      if (item.track.type === 'track') {
        return item.track.artists.map(
          async (artist) => await this.getArtist(artist.id)
        )
      }
    })
  }
}

export type ExistingPlaylistAction = 'add' | 'replace'

export type PlaylistAction =
  | {
      type: 'none'
    }
  | {
      type: 'existing'
      playlistId: string
      action: ExistingPlaylistAction
    }
  | {
      type: 'new'
      playlistName: string
    }
