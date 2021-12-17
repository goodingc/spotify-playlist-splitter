import {defineNuxtConfig} from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: [
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue-3/dist/bootstrap-vue-3.css'
    ],
    // ssr: false,
    router: {
        base: '/'
    },
    nitro: {
        preset: 'browser'
    }
})
