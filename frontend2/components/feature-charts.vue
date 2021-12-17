<template>
  <div>
    <svg
      v-for="[emoji, label, value] in getFeatureData(features)"
      v-b-tooltip :title="`${label}: ${Math.round(value * 100)}%`"
      class="ms-1"
      height="30" width="30" viewBox="0 0 40 40"
    >
      <circle r="50%" cx="50%" cy="50%" fill="var(--secondary)" />
      <circle r="25%" cx="-50%" cy="50%" fill="transparent"
              stroke="var(--primary)"
              stroke-width="50%"
              :stroke-dasharray="`calc(${value} * 62.8) 62.8`"
              transform="rotate(-90)" />
      <text dominant-baseline="middle" text-anchor="middle" x="50%" y="50%">{{ emoji }}</text>
    </svg>
  </div>
</template>

<script lang="ts">
import { AudioFeatures } from "spotify-web-api-ts/types/types/SpotifyObjects";
import Vue from "vue";

export default Vue.extend({
  name: "feature-charts",
  props: {
    features: Object as () => AudioFeatures
  },
  methods: {
    getFeatureData(features: AudioFeatures) {
      return [
        ["🎺", "instrumentalness", features.instrumentalness],
        ["💃", "danceability", features.danceability],
        ["⚡", "energy", features.energy],
        ["🎤", "speechiness", features.speechiness],
        ["🎸", "acousticness", features.acousticness],
        ["🤗", "valence", features.valence]
      ];
    }
  }
});
</script>

<style scoped>

</style>
