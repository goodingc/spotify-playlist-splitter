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
    this.$call('get-access-token', this.$route.query.code)
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
