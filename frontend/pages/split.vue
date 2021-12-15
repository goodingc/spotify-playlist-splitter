<template>
  <b-col v-if="playlist">
    <b-row>
      <b-col cols="auto">
        <b-img
            thumbnail
            fluid
            :src="playlist.images[0].url"
            width="200"
            height="200"
        />
      </b-col>
      <b-col>
        <h1>{{playlist.name}}</h1>
<!--        <h2>{{playlist.description}}</h2>-->
      </b-col>
    </b-row>
    <b-row>
      <nuxt-child/>
    </b-row>
  </b-col>
</template>

<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const spotify = useState<SpotifyWebApi.SpotifyWebApiJs>('spotify')
const route = useRoute();
const playlist = useState<SpotifyApi.SinglePlaylistResponse>('playlist')

setPlaylist(route.query['playlist'] as string)

watch(
    () => route.query['playlist'],
    setPlaylist
)

async function setPlaylist(playlistId: string) {
  if(!playlistId) {
    return
  }
  playlist.value = await spotify.value.getPlaylist(playlistId);
  console.log(playlist.value)
}

</script>