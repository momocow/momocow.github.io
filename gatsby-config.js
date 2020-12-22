const {
  LANG: defaultLanguage,
  IMG_DIR,
  LOCALES_DIR,
  SITE_URL
} = require('./scripts/env')
const { getAvailableLanguages } = require('./scripts/i18n')

module.exports = {
  siteMetadata: {
    siteUrl: SITE_URL
  },
  plugins: [
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-plugin-next-seo',
    'gatsby-plugin-react-helmet-async',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        path: LOCALES_DIR,
        languages: getAvailableLanguages(),
        siteUrl: SITE_URL,
        defaultLanguage,
        i18nextOptions: {
          interpolation: {
            escapeValue: false
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: IMG_DIR
      }
    }
  ]
}
