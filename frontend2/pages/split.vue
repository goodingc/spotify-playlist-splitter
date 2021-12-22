<template>
  <b-col v-if="playlist">
    <b-row>
      <b-col cols="auto">
        <b-img
          fluid
          :src="playlist.images[0].url"
          width="200"
          height="200"
        />
      </b-col>
      <b-col>
        <h1>{{ playlist.name }}</h1>
<!--        <h2>{{ playlist.description }}</h2>-->
      </b-col>
    </b-row>
    <b-row>
      <nuxt-child />
    </b-row>
  </b-col>
</template>

<script lang="ts">
import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import Vue from "vue";
import { spotifyStore } from "~/store";

export default Vue.extend({
  name: "split",
  data() {
    return {
      spotifyStore,
      playlist: null as Playlist | null
    };
  },
  async fetch() {
    await this.setPlaylist();
  },
  watch: {
    "$route.query.playlist"() {
      this.setPlaylist();
    }
  },
  methods: {
    async setPlaylist() {
      this.playlist = await this.spotifyStore.getPlaylistDetails(this.$route.query.playlist as string);
    }
  }
});
</script>


<style scoped>

</style>
