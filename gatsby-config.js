const fs = require('fs')

function getAvailableLangs() {
  return fs.readdirSync('./src/locales')
}

function readAllLocalizedMetadata(langs) {
  return langs.reduce((data, l) => {
    const metaFile = `./src/locales/${l}/metadata.json`
    let metaBody = {}
    try {
      metaBody = require(metaFile)
    } catch (e) {
      console.warn('%s not found', metaFile)
    }
    return { ...data, [l]: metaBody }
  }, {})
}

function createManifestOptions(mainLang, locMetaObj, baseObj) {
  const mainMeta = locMetaObj[mainLang]
  return {
    ...baseObj,
    name: mainMeta.name,
    short_name: mainMeta.shortName,
    description: mainMeta.description,
    lang: mainLang,
    start_url: '/',
    localize: Object.entries(locMetaObj).map(([otherLang, otherMeta]) => ({
      ...otherMeta,
      start_url: `/${otherLang}/`,
      lang: otherLang
    }))
  }
}

const lang = 'zh-TW'
const availableLangs = getAvailableLangs()

if (availableLangs.length === 0) {
  throw new Error('no locale is available')
}

const allLocalizedMetadata = readAllLocalizedMetadata(availableLangs)
const localizedMetadata = allLocalizedMetadata[lang]

if (typeof localizedMetadata !== 'object') {
  throw new Error(`invalid localized metadata in "${lang}"`)
}

module.exports = {
  siteMetadata: {
    ...localizedMetadata,
    title: localizedMetadata.name,
    siteUrl: 'https://cow.moe/'
  },
  plugins: [
    // 'gatsby-theme-material-ui',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-plugin-next-seo',
    'gatsby-plugin-react-helmet-async',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [
    //       'Source Code Pro'
    //     ],
    //     display: 'swap'
    //   }
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'data',
    //     path: './src/data/'
    //   }
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'images',
    //     path: './src/assets/images/'
    //   }
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: createManifestOptions(lang, allLocalizedMetadata, {
        icon: 'src/assets/images/logo.svg',
        display: 'minimal-ui'
      })
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: `locales`,
    //     path: 'src/locales'
    //   }
    // },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        path: 'src/locales',
        languages: availableLangs,
        defaultLanguage: lang,
        i18nextOptions: {
          ns: ['common', 'metadata'],
          defaultNS: 'common',
          interpolation: {
            escapeValue: false
          }
        }
      }
    },
    'gatsby-plugin-offline'
  ]
}
