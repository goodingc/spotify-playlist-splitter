<template>
  <div>
    <b-navbar variant="light" class="mb-3">
      <b-button
        variant="outline-secondary"
        v-b-toggle.sidebar
      >
        <font-awesome-icon icon="bars" />
      </b-button>
      <b-navbar-brand v-if="spotifyStore.me" class="ml-3 d-none d-sm-inline">
        {{ spotifyStore.me.display_name }}
      </b-navbar-brand>
      <b-navbar-brand class="ml-auto">Spotify Playlist Splitter</b-navbar-brand>
    </b-navbar>
    <login-page v-if="shouldLogin" />
    <b-container fluid v-else>
      <sidebar />
      <b-row>
        <nuxt />
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { spotifyStore } from "~/store";

export default Vue.extend({
  name: "default",
  data() {
    return {
      redirecting: false,
      shouldLogin: false,
      sidebarOpen: false,
      spotifyStore
    };
  },
  created() {
    this.spotifyStore.redirectUri = (this.$config.publicPath || 'http://' + location.host) + '/redirect/'
    this.setValues();
  },
  watch: {
    "$route.path"() {
      this.setValues();
    }
  },
  methods: {
    setValues() {
      this.redirecting = this.$route.path.replaceAll('/', '') === "redirect";
      this.shouldLogin = !this.spotifyStore.hasAccessToken && !this.redirecting;
      console.log(this.$route.path, this.spotifyStore.hasAccessToken)
    }
  }
});
</script>

<style scoped>

</style>
