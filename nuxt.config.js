import colors from 'vuetify/es5/util/colors'

const { NODE_ENV, API_URL_DEV, API_URL_PROD } = process.env
export default {
  target: 'static',
  head: {
    title: 'Foodies',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  css: ['~/assets/scss/main.scss'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],
  axios: {
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: NODE_ENV === 'production' ? API_URL_PROD : API_URL_DEV
    }
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          // global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/auth/me', method: 'get' },
          logout: false
        }
      }
    }
  },
  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Inter'
      }
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {}
}
