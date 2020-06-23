const withSass = require('@zeit/next-sass')
module.exports = withSass({
  /* Declare env keys here */
  cssModules: true
})

module.exports = {
  env: {
    customKey: 'my-value',
  },
}