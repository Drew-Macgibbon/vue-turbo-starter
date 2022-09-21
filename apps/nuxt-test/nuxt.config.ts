import { defineNuxtConfig } from 'nuxt'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://icones.js.org/
import Components from 'unplugin-vue-components/vite'
import { env } from '@/types/publicEnv.interface'
import { fetch } from 'ohmyfetch'

const graphqlQuery = {
  "operationName": "getArticles",
  "query": `query getArticles { mlfx_articles(order_by: {created_at: desc}) { id }}`,
}

const options = {
  "method": "POST",
  "headers": {
    type: 'application/json',
  },
  "body": JSON.stringify(graphqlQuery)
}


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    link: [
      { rel: 'icon', type: 'x-icon', href: '/favicon.ico' }
    ]
  },
  // buildDir: '.nuxt',
  // outputDir: 'output',
  // srcDir: `${path.resolve(__dirname)}`,
  // nitro: {
  //   output: {
  //     dir: 'dist',
  //     publicDir: 'dist/public',
  //   }
  // },
  ssr: true,
  target: 'static',
  components: true,
  hooks: {
    async 'nitro:config' (nitroConfig) {
      if (nitroConfig.dev) { return }
      // ..Async logic..
      await fetch('https://mlfx.hasura.app/v1/graphql', options).then(
        async (response) => {
          const posts = await response.json()
          await posts.data['mlfx_articles'].map((post: any) => {
            nitroConfig.prerender.routes.push(`/blog/post/${post.id}`)
          })
        })
        .catch((err) => console.error('error prerendering posts', err))
    }
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      preload: [
        // syntax highlighting
        'ts',
        'js'
      ]
    }
  },
  runtimeConfig: {
    // https://v3.nuxtjs.org/migration/runtime-config#example
    // Private config that is only available on the server
    // apiSecret: '123',
    // Config within public will be also exposed to the client
    public: {
      hasuraFrontSchema: 'mlfx',
      apiBase: process.env.NUXT_API_BASE,
      linkFacebook: 'https://www.facebook.com/MLForex',
      linkTelegram: 'https://t.me/+TD-6EbfhOoPm5IBX',
      linkInstagram: 'https://www.facebook.com/MLForex',
      linkYoutube: 'https://www.youtube.com/channel/UCF-oCehBnXlWozuZeNwI5Yw',
      linkGithub: 'https://github.com/ml-tech-ltd',
      linkHermes: 'https://www.hermes.mlforex.com/',
    } as env
  },
  modules: [
    '@nuxt/content',
    ['@pinia/nuxt', { disableVuex: true }],
  ],
  buildModules: [
    ['unplugin-icons/nuxt', { /* options */ }],
  ],
  css: [
    '@/assets/main.scss',
  ],
  build: {
    transpile: [
      '@apollo/client',
      'ts-invariant/process',
    ],
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          'tailwindcss/nesting': {},
          tailwindcss: { config: './tailwind.config.js' },
          autoprefixer: {},
        },
      },
    },
  },
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [
          IconsResolver({
            alias: {
              park: 'icon-park',
            },
          }),
        ],
      }),
      Icons({
        // https://icones.js.org/
        // scale: 1.2, // Scale of icons against 1em
        // defaultStyle: 'font-size: 18px"', // Style apply to icons
        // defaultClass: 'icon', // Class names apply to icons
        compiler: 'vue3',
      })
    ]
  },
  router: {
    scrollBehavior(to, from) {
      // if Anchor clicked scroll to hash
      // if (to.hash) return { el: to.hash, top: 120 }
      // otherwise scroll to top
      if (to) return { top: 0 }
    },
  }
})