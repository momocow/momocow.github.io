const fs = require('fs')
const path = require('path')
const { LOCALES_DIR, LANG } = require('./env')
const i18next = require('i18next')
const FsBackend = require('i18next-fs-backend')

i18next.use(FsBackend).init({
  lng: LANG,
  fallbackLng: LANG,
  initImmediate: false,
  backend: {
    loadPath: path.join(LOCALES_DIR, '{{lng}}', '{{ns}}.json')
  }
})

function getAvailableLanguages() {
  return fs.readdirSync(LOCALES_DIR)
}

module.exports = {
  i18next,
  getAvailableLanguages
}
