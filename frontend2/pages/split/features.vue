<template>
  <b-col>
    <b-row>
      <b-col>
        <h1>Features</h1>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="3">
        <label>Number of groups</label>
      </b-col>
      <b-col cols="6">
        <b-form-input v-model.number="groupCount" type="number"></b-form-input>
      </b-col>
      <b-col cols="3">
        <b-button @click="clusterTracks" class="w-100">Cluster</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-button @click="split" class="w-100" variant="primary" :disabled="clusters === undefined">
          Split
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group columns>
          <b-card v-for="cluster of clusters">
            <playlist-action v-model="cluster.action" />
            <b-list-group>
              <b-list-group-item v-for="track of cluster.tracks">
                <b-row>
                  <b-col cols="auto">
                    <b-img
                      fluid
                      :src="track.item.track.album.images[0].url"
                      width="50"
                      height="50"
                    />
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col>
                        <h5 class="me-auto">{{ track.item.track.name }}</h5>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <h6 class="me-auto">{{ track.item.track.artists[0].name }}</h6>
                      </b-col>
                      <b-col cols="auto" class="d-none d-sm-block">
                        <feature-charts :features="track.features"></feature-charts>
                      </b-col>
                    </b-row>

                  </b-col>
                </b-row>
                <b-row class="d-sm-none d-block">
                  <b-col>
                    <b-row>
                      <b-col cols="auto" class="ml-auto">
                        <feature-charts :features="track.features"></feature-charts>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-col>
</template>

<script lang="ts">
import { AudioFeatures, Playlist, PlaylistItem } from "spotify-web-api-ts/types/types/SpotifyObjects";
import Vue from "vue";
import { spotifyStore } from "~/store";
import { KMEANS } from "density-clustering";
import { PlaylistAction } from "~/store/spotify";

type Cluster = {
  action: PlaylistAction
  tracks: {
    item: PlaylistItem
    features: AudioFeatures
  }[]
};

export default Vue.extend({
  data() {
    return {
      spotifyStore,
      groupCount: 2,
      playlist: undefined as undefined | Playlist,
      features: undefined as undefined | AudioFeatures[],
      clusterData: undefined as undefined | number[][],
      clusters: undefined as undefined | Cluster[]
    };
  },
  async fetch() {
    this.playlist = await this.spotifyStore.getPlaylistDetails(this.$route.query.playlist as string);
    this.features = await this.spotifyStore.getPlaylistTrackFeatures(this.$route.query.playlist as string);
    this.clusterData = this.features.map(f =>
      [f.acousticness, f.danceability, f.energy, f.instrumentalness, f.liveness, f.speechiness, f.valence]
    );
  },
  methods: {
    clusterTracks() {
      if (!this.clusterData || !this.playlist || !this.features) return;
      this.clusters = new KMEANS().run(this.clusterData, this.groupCount)
        .map<Cluster>(cluster => {
          return {
            action: {
              type: 'none',
            },
            tracks: cluster.map(
              trackIndex => {
                return {
                  item: this.playlist!.tracks.items[trackIndex],
                  features: this.features![trackIndex]
                };
              }
            )
          };
        });
    },
    async split() {
      await this.spotifyStore.executePlaylistActions(this.clusters!.map(cluster => ({
        action: cluster.action,
        tracks: cluster.tracks.map(track => track.item)
      })));
    }
  }
});
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";

.card-columns {
  @include media-breakpoint-only(xl) {
    column-count: 3;
  }
  @include media-breakpoint-only(lg) {
    column-count: 2;
  }
  @include media-breakpoint-only(md) {
    column-count: 1;
  }
  @include media-breakpoint-only(sm) {
    column-count: 1;
  }
}
</style>
