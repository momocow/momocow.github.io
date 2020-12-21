module.exports.onClientEntry = () => {
  document.body.classList.add('is-preload')
  if (navigator.userAgent.match(/(MSIE|rv:11\.0)/)) {
    document.body.classList.add('is-ie')
  }
  window.addEventListener('load', () => {
    document.body.className = document.body.className.replace(
      /\bis-preload\b/,
      ''
    )
  })
}
