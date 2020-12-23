export const USERNAME = 'momocow'
export const TWITTER_HANDLE = '_momocow_'

export const hash = new URLSearchParams(
  typeof location === 'undefined' ? '' : location.hash.substr(1)
)
