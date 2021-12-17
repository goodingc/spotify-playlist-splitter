<template>
  <div>
    <h1>Redirecting</h1>
    <nuxt-link to="/">Back</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";
import {useState} from "#app";

const router = useRouter()
call('get-access-token', useRoute().query.code)
    .then(async (response) => {
      useState('tokens', () => ({
        access: response['access_token'],
        refresh: response['refresh_token']
      }))
      const spotify = useState('spotify', () => {
        const spotify = new SpotifyWebApi()
        spotify.setAccessToken(response['access_token'])
        return spotify
      })
      const user = await spotify.value.getMe()
      useState<SpotifyApi.CurrentUsersProfileResponse>('user', () => user);

      const playlists = await spotify.value.getUserPlaylists()
      useState<SpotifyApi.ListOfUsersPlaylistsResponse>('playlists', () => playlists)
      await router.push('/');
    })
</script>