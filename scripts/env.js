const pkgUp = require('pkg-up')
const path = require('path')

const PACKAGE_JSON_FILE = pkgUp.sync()
if (!PACKAGE_JSON_FILE) {
  throw new Error('package.json not found')
}

const ROOT_DIR = path.dirname(PACKAGE_JSON_FILE)
const LOCALES_DIR = path.join(ROOT_DIR, 'src', 'assets', 'locales')
const IMG_DIR = path.join(ROOT_DIR, 'src', 'assets', 'images')

const LANG = 'zh-TW'
const SITE_URL = 'https://cow.moe/'

module.exports = {
  ROOT_DIR,
  IMG_DIR,
  LOCALES_DIR,
  LANG,
  SITE_URL
}
