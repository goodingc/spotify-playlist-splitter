<template>

</template>

<script lang="ts">
import Vue from "vue";
import { spotifyStore } from "~/utils/store-accessor";

export default Vue.extend({
  async created() {
    // const details = await spotifyStore.getPlaylistDetails(this.$route.query.playlist as string);
    // const trackGenres: [string, string[]][] = await Promise.all(details.tracks.items.map(async track => {
    //   if (track.track.type === "track") {
    //     return [track.track.id, (await spotifyStore.getArtist(track.track.artists[0].id)).genres];
    //   }
    //   return [track.track.id, []];
    // }));
    //
    // const genreIndices = new Map<string, number>();
    // let nextGenreIndex = 0;
    // const genreData = trackGenres.map(([_, genres]) =>
    //   genres.map(genre => {
    //     if (!genreIndices.has(genre)) {
    //       genreIndices.set(genre, nextGenreIndex++);
    //     }
    //     return genreIndices.get(genre);
    //   }));
    // console.log(trackGenres);
    // console.log(genreData);
  }
});
</script>

<style scoped>

</style>
