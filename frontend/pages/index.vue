<template>
  <div>
    <h1 v-if="tokens">{{ tokens.access }}</h1>
  </div>
</template>

<script setup lang="ts">
const tokens = useState('tokens')
</script>