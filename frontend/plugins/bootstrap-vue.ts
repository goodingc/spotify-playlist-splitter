import { defineNuxtPlugin } from '#app'
import BootstrapVue from "bootstrap-vue-3";


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(BootstrapVue)
})