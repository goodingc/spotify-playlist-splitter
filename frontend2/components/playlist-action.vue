<template>
  <b-card>
    <b-row class="mb-2">
      <playlist-action-indicator v-model="value" />
      <b-col cols="auto">
        <b-button @click="modalOpen = !modalOpen">Change</b-button>
      </b-col>
    </b-row>
    <b-modal v-model="modalOpen" title="Change playlist action">
      <b-row>
        <b-col>
          <b-card>
            <b-row>
              <playlist-action-indicator v-model="value" />
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-button @click="$emit('input', {type: 'none'})" variant="danger" class="w-100">Nothing</b-button>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-select
            v-model="selectedExistingPlaylist"
            :options="existingPlaylistOptions"
            class="w-100"
          >
          </b-select>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-button-group class="w-100">
            <b-button
              @click="setAsExistingPlaylist('add')"
              variant="primary"
              :disabled="selectedExistingPlaylist === null"
            >Add
            </b-button>
            <b-button
              @click="setAsExistingPlaylist('replace')"
              variant="warning"
              :disabled="selectedExistingPlaylist === null"
            >Replace
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-input v-model="newPlaylistName" type="text" placeholder="New playlist name"></b-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button
            @click="setAsNewPlaylist"
            variant="success"
            class="w-100"
            :disabled="newPlaylistName === ''"
          >New playlist
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import { spotifyStore } from "~/store";
import { SimplifiedPlaylist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { ExistingPlaylistAction, PlaylistAction } from "~/store/spotify";

export default Vue.extend({
  name: "playlist-action",
  props: {
    value: {
      type: Object as () => PlaylistAction,
      required: true
    }
  },
  data() {
    return {
      spotifyStore,
      modalOpen: false,
      existingPlaylistOptions: [{
        text: "Existing playlist",
        value: null,
        disabled: true,
        selected: true,
        hidden: true
      }, ...spotifyStore.editablePlaylists!.map(playlist => ({
        text: playlist.name,
        value: playlist
      }))],
      selectedExistingPlaylist: null as SimplifiedPlaylist | null,
      newPlaylistName: ""
    };
  },
  methods: {
    setAsExistingPlaylist(action: ExistingPlaylistAction) {
      this.$emit("input", {
        type: "existing",
        playlistId: this.selectedExistingPlaylist!.id,
        action
      });
    },
    setAsNewPlaylist() {
      this.$emit("input", {
        type: "new",
        playlistName: this.newPlaylistName
      });
    }
  }
});
</script>

<style scoped>

</style>
