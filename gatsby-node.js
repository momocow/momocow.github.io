exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  /**
   * @see {@link https://github.com/WinterCore/react-text-transition/issues/21}
   */
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-text-transition/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
