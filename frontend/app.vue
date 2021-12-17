<template>
  <b-nav class="navbar navbar-light bg-light d-flex justify-content-start align-items-center">
    <b-button
        class="ms-3"
        variant="outline-secondary"
        @click="sidebarOpen = !sidebarOpen"
    >X
    </b-button>
    <a class="navbar-brand ms-3">{{ user?.name ?? 'no' }}</a>
    <a class="navbar-brand ms-auto">Spotify Playlist Splitter</a>
  </b-nav>
  <login-page v-if="shouldLogin"/>
  <nuxt-page v-else-if="redirecting"/>
  <b-container fluid v-else>
    <b-row>
      <b-col v-if="sidebarOpen" cols="3">
        <sidebar/>
      </b-col>
      <b-col cols="9">
        <nuxt-page/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import {useState} from "#app";
import SpotifyWebApi from "spotify-web-api-js";

const route = useRoute()

const user = useState<SpotifyApi.CurrentUsersProfileResponse>('user');
const playlists = useState<SpotifyApi.PlaylistObjectSimplified[]>('playlists');
const spotify = useState<SpotifyWebApi.SpotifyWebApiJs>('spotify');

const redirecting = ref(false);
const shouldLogin = ref(false);

const sidebarOpen = ref(false);

watch(() => route.path, setValues);
setValues()

async function setValues() {
  redirecting.value = route.path === '/redirect';
  shouldLogin.value = spotify.value === undefined && !redirecting.value;
}

watch(() => spotify.value, async () => {
  console.log('spotify changed');
  if (spotify.value) {
    if (!user.value) {
      user.value = await spotify.value.getMe()
    }
    if (!playlists.value) {
      playlists.value = (await spotify.value.getUserPlaylists()).items
    }
  }
  console.log('user', user.value);
})
</script>
