<template>
  <b-row>
    <b-col>
      <h1>Features</h1>
    </b-col>
  </b-row>
  <b-row>
    <b-col cols="3">
      <label>Number of groups</label>
    </b-col>
    <b-col cols="6">
      <b-form-input v-model.number="groupCount" type="number"></b-form-input>
    </b-col>
    <b-col cols="3">
      <b-button @click="clusterTracks" class="w-100" variant="primary">Split</b-button>
    </b-col>
  </b-row>
  <b-row>
      <b-col v-for="cluster of clusters">
        <b-list-group>
          <b-list-group-item v-for="[track, features] of cluster">
            <b-row>
              <b-col cols="auto">
                <b-img
                    fluid
                    :src="track.track.album.images[0].url"
                    width="50"
                    height="50"
                />
              </b-col>
              <b-col>
                <div class="d-flex w-100">
                  <h5 class="me-auto">{{ track.track.name }}</h5>
                </div>
                <div class="d-flex w-100">
                  <h6 class="me-auto">{{ track.track.artists[0].name }}</h6>
                  <svg
                      v-for="[emoji, label, value] in getFeatureData(features)"
                      v-b-tooltip :title="`${label}: ${Math.round(value * 100)}%`"
                      class="ms-1"
                      height="30" width="30" viewBox="0 0 40 40"
                  >
                    <circle r="50%" cx="50%" cy="50%" fill="var(--bs-secondary)" />
                    <circle r="25%" cx="-50%" cy="50%" fill="transparent"
                            stroke="var(--bs-primary)"
                            stroke-width="50%"
                            :stroke-dasharray="`calc(${value} * 62.8) 62.8`"
                            transform="rotate(-90)"/>
                    <text dominant-baseline="middle" text-anchor="middle" x="50%" y="50%">{{ emoji }}</text>
                  </svg>
                </div>
              </b-col>
            </b-row>


          </b-list-group-item>
        </b-list-group>
      </b-col>
  </b-row>
</template>

<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";
import {useState} from "#app";
import {KMEANS} from 'density-clustering'

const spotify = useState<SpotifyWebApi.SpotifyWebApiJs>('spotify')
const playlist = useState<SpotifyApi.SinglePlaylistResponse>('playlist')

const features = await spotify.value.getAudioFeaturesForTracks(
    playlist.value.tracks.items.map(item => item.track.id)
)

const data = features.audio_features.map(track => [
  track.instrumentalness,
  track.danceability,
  track.energy,
  track.speechiness,
  track.acousticness,
  track.valence,
])

const groupCount = ref(2);

console.log(features)

const clusters = ref()
clusterTracks()

console.log(clusters)

function getFeatureData(features: SpotifyApi.AudioFeaturesObject): [string, string, number][] {
  return [
    ['🎺', 'instrumentalness', features.instrumentalness],
    ['💃', 'danceability', features.danceability],
    ['⚡', 'energy', features.energy],
    ['🎤', 'speechiness', features.speechiness],
    ['🎸', 'acousticness', features.acousticness],
    ['🤗', 'valence', features.valence],
  ]
}

function clusterTracks() {
  clusters.value = new KMEANS().run(data, groupCount.value)
      .map(cluster => cluster.map(
          trackIndex => [playlist.value.tracks.items[trackIndex], features.audio_features[trackIndex]]
      ))
}

</script>