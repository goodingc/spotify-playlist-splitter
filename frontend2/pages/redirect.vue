<template>
  <div>
    <h1>Redirecting</h1>
    <nuxt-link to="/">Back</nuxt-link>
  </div>
</template>

<script lang="ts">
import { SpotifyWebApi } from "spotify-web-api-ts";
import Vue from "vue";
import {spotifyStore} from '~/store'

export default Vue.extend({
  name: "redirect",
  created() {
    console.log(this.$route.query.code);
    this.$call('get-access-token', {
      code: this.$route.query.code,
      redirectUri: spotifyStore.redirectUri
    })
    .then(async (response) => {
      spotifyStore.setAccessToken(response.access_token)
      await spotifyStore.setDetails()
      await this.$router.push("/");
    })
  }
});
</script>

<style scoped>

</style>
