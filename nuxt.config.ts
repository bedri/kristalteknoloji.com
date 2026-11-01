// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',
  devServer: {
    port: 8090
  },
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui'
  ],
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#00bed6' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo_o.svg' }
      ]
    }
  }
})
