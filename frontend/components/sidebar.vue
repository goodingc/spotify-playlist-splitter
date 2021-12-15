<template>
  <nuxt-link
      to="/"
  >
    <h1 v-if="user">{{ user.display_name }}</h1>
  </nuxt-link>
  <b-list-group>
    <nuxt-link
        v-for="playlist of playlists"
        :to="`/split?playlist=${playlist.id}`"
    >
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        {{playlist.name}}
        <b-badge variant="primary" pill>{{playlist.tracks.total}}</b-badge>
      </b-list-group-item>
    </nuxt-link>
  </b-list-group>
</template>

<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

let user = ref();
const playlists = ref<null |  SpotifyApi.PlaylistObjectSimplified[]>(null)
const spotify = useState<SpotifyWebApi.SpotifyWebApiJs>('spotify');

if (spotify.value) {
  user.value = await spotify.value.getMe()
  playlists.value = (await spotify.value.getUserPlaylists()).items
  console.log(user)
  console.log(playlists)
}

</script>