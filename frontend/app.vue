<template>
  <div>
    <b-button v-if="shouldLogin" @click="login">Login</b-button>
    <nuxt-page v-else-if="redirecting"/>
    <b-container fluid v-else>
      <b-row>
        <b-col cols="3">
          <sidebar/>
        </b-col>
        <b-col cols="9">
          <nuxt-page/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const spotify = useState('spotify');
const redirecting = ref(false);
const shouldLogin = ref(false);

watchEffect(() => {
  redirecting.value = route.path === '/redirect';
  shouldLogin.value = spotify.value === undefined && !redirecting.value;
})

// console.log(spotify.value, redirecting.value, shouldLogin.value)

function login() {
  // Generate random 16 character long string
  const state = Math.random().toString(36).substring(2, 18)

  // Redirect to Spotify login
  window.location.href = `https://accounts.spotify.com/authorize?` +
      `client_id=${'ad1e08d3838e4a518096eddf000e1358'}&` +
      `response_type=code&redirect_uri=http://${location.host}/redirect&` +
      `scope=${'user-read-private user-read-email playlist-read-private playlist-read-collaborative'}&` +
      `state=${state}`;
}
</script>
