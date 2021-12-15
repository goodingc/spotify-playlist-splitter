<template>
  <div>
    <h1>Redirecting</h1>
    <nuxt-link to="/">Back</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const router = useRouter()
call('get-access-token', useRoute().query.code)
    .then(async (response) => {
      useState('tokens', () => ({
        access: response['access_token'],
        refresh: response['refresh_token']
      }))
      useState('spotify', () => {
        const spotify = new SpotifyWebApi()
        spotify.setAccessToken(response['access_token'])
        return spotify
      })
      await router.push('/');
    })
</script>