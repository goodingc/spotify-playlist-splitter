<template>
  <div class="w-100 h-100 d-flex">
    <b-button
      @click="login"
      class="align-self-center mx-auto"
    >Login
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as process from "process";

export default Vue.extend({
  name: "login-page",
  methods: {
    login() {
      const state = Math.random().toString(36).substring(2, 18);
      window.location.href = `https://accounts.spotify.com/authorize?` +
        `client_id=${"ad1e08d3838e4a518096eddf000e1358"}&` +
        `response_type=code&redirect_uri=${process.env.PUBLIC_PATH || 'http://' + location.host}/redirect&` +
        `scope=${"user-read-private user-read-email playlist-read-private playlist-read-collaborative"}&` +
        `state=${state}`;
    }
  }
});
</script>

<style scoped>

</style>
