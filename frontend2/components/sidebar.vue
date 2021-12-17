<template>
  <b-sidebar id="sidebar">
    <b-list-group v-if="spotifyStore.hasDetails">
      <nuxt-link
        v-for="playlist of spotifyStore.playlists.items"
        :key="playlist.id"
        :to="`/split?playlist=${playlist.id}`"
      >
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          {{playlist.name}}
          <b-badge variant="primary" pill>{{playlist.tracks.total}}</b-badge>
        </b-list-group-item>
      </nuxt-link>
    </b-list-group>
  </b-sidebar>
</template>

<script lang="ts">
import Vue from "vue";
import { spotifyStore } from "~/store";

export default Vue.extend({
  name: "sidebar",
  data() {
    return {
      spotifyStore
    };
  },
});
</script>

<style scoped>

</style>
