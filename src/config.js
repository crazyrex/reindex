const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  apiBaseUrl: process.env.API_URL || 'https://api.github.com',
  apiRoot: process.env.API_ROOT || 'https://402.co.il/api/v1/',
  app: {
    googleAnalytics: {
      appId: process.env.GOOGLE_ANALYTIC_ID || 'UA-86328864-1'
    },
    title: '402',
    description: 'Hamadrich Hacharedi',
    head: {
      titleTemplate: '402',
      meta: [
        { name: 'description', content: 'Hamadrich Hacharedi' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '402' },
        { property: 'og:image', content: 'https://facebook.github.io/react/img/logo_og.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: '402' },
        { property: 'og:description', content: 'Hamadrich Hacharedi' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@xkawi' },
        { property: 'og:creator', content: '@xkawi' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
