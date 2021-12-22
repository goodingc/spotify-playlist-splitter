<template>
  <div style="display: contents">
    <b-col cols="auto">
      <font-awesome-icon v-if="value.type==='none'" icon="times" size="3x" :style="{ color: 'red' }" />
      <font-awesome-icon v-else-if="value.type==='new'" icon="plus" size="3x" :style="{ color: 'green' }" />
      <b-img
        v-else-if="value.type ==='existing' && playlist"
        fluid
        :src="playlist.images[0].url"
        width="50"
        height="50"
      />
    </b-col>
    <b-col>
      <b-row>
        <b-col>
          <h5 class="me-auto">
            <span v-if="value.type==='none'">Do nothing</span>
            <span v-else-if="value.type==='new'">Make new playlist called {{ value.playlistName }}</span>
            <span v-else-if="value.type ==='existing' && playlist">
              <span v-if="value.action === 'add'">
                Add to {{ playlist.name }}
              </span>
              <span v-else-if="value.action === 'replace'">
                Replace the contents of {{ playlist.name }}
              </span>
            </span>
          </h5>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { spotifyStore } from "~/utils/store-accessor";
import { PlaylistAction } from "~/store/spotify";

export default Vue.extend({
  props: {
    value: {
      type: Object as () => PlaylistAction,
      required: true
    }
  },
  asyncComputed: {
    async playlist() {
      if (this.value.type === "existing") {
        return await spotifyStore.getPlaylistDetails(this.value.playlistId);
      }
    }
  }
});
</script>

<style scoped>

</style>
