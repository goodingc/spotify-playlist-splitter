<template>
  <b-col>
    <h1>Split by</h1>
    <nuxt-link
      v-for="[name, link] of splitters"
      :key="name"
      :to="`/split/${link}?playlist=${$route.query['playlist']}`"
    >
      <h3>{{ name }}</h3>
    </nuxt-link>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      splitters: [
        'Features',
        'Artist Genre'
      ].map(name => [name, name.toLowerCase().replace(' ', '-')])
    }
  }
});
</script>
