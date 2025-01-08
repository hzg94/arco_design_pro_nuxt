// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css:['~/assets/style/global.less'],

  modules: [
    'arco-design-nuxt-module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate',
    'nuxt-echarts'
  ],

  arco: {
    // TODO: use other theme package
    // theme: '',
    icons: false
  },

  vite:{
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
                'assets/style/breakpoint.less'
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  }
})