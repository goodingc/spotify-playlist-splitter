import { SpotifyWebApi } from "spotify-web-api-ts";
import Vue from "vue";

declare module "vue/types/vue" {

  interface Vue {
    $getSpotify(): SpotifyWebApi;

    $setAccessToken(accessToken: string): void;
  }
}

const spotify = new SpotifyWebApi();

Vue.prototype.$getSpotify = () => {
  return spotify;
};

Vue.prototype.$setAccessToken = (accessToken: string) => {
  spotify.setAccessToken(accessToken);
};

// Object.defineProperty(Vue.prototype, "$spotify", {
//   get() {
//     return spotify;
//   }
// });
//
// Object.defineProperty(Vue.prototype, "$accessToken", {
//   set(accessToken: string) {
//     spotify.setAccessToken(accessToken);
//   }
// });
