import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $call(method: string, args: any): Promise<any>
  }
}

Vue.prototype.$call = async (method: string, args: any): Promise<any> => {
  const commsHost = location.hostname.includes('goodingc.github.io')
    ? 'https://p3ej2v7m2k.execute-api.eu-west-2.amazonaws.com/default/spotify-playlist-splitter-backend'
    : `http://${location.hostname}:3001`
  const request = await fetch(commsHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      method,
      args,
    }),
  })
  return request.json()
}
