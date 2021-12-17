<template>
  <nuxt-link to="/">
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
import {useState} from "#app";

const user = useState<SpotifyApi.CurrentUsersProfileResponse>('user');
const playlists = useState<SpotifyApi.PlaylistObjectSimplified[]>('playlists');
// const spotify = useState<SpotifyWebApi.SpotifyWebApiJs>('spotify');
//
// if (spotify.value) {
//   if (!user.value) {
//     user.value = await spotify.value.getMe()
//   }
//   if(!playlists.value) {
//     playlists.value = (await spotify.value.getUserPlaylists()).items
//   }
// }

</script>