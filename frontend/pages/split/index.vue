<template>
  <h1>Split by</h1>
  <nuxt-link
      v-for="[name, link] of splitters"
      :to="`/split/${link}?playlist=${$route.query['playlist']}`"
  >
    <h3>{{ name }}</h3>
  </nuxt-link>
</template>

<script setup lang="ts">
const splitters = [
  "Date added",
  'Features'
].map(name => [name, name.toLowerCase().replace(' ', '-')])
</script>

<style scoped>

</style>