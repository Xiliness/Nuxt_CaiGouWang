// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  // 添加GitHub Pages部署配置
  app: {
    baseURL: import.meta.env.NODE_ENV === 'production'
      ? '/Nuxt_CaiGouWang/'// 使用你的仓库名称
      : '/'
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { redirect: '/zhongbiaogonggao' },
    '/api/**': {
      cors: true
    }
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
