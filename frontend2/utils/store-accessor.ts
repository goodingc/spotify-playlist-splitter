import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import SpotifyStore from '~/store/spotify'

let spotifyStore: SpotifyStore

function initialiseStores(store: Store<any>): void {
  spotifyStore = getModule(SpotifyStore, store)
}

export { initialiseStores, spotifyStore }
