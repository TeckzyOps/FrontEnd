const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');


// module.exports = withImages(
//   withcss({
//     publicRuntimeConfig: {
//       localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
//         ? process.env.LOCALE_SUBPATHS
//         : 'none',
//     },
//     webpack: (config, options) => {
//       cssModules: true,
//       config.module.rules.push({
//           enforce: 'pre',
//           test:/\.js?$/,
//           exclude: [/node_modules/],
//           loader: 'eslint-loader',
//           options: {
//             quiet: true,
//           },
//       });
//       config.node = {
//         fs: 'empty'
//       }
//       return config;
//     },
//   })
// );

module.exports = withPlugins([withCss, withSass, withImages], {
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
      ? process.env.LOCALE_SUBPATHS
      : 'none',
  },
  cssLoaderOptions: {
    importLoaders: 1
  },
  webpack: (config, options) => {
    cssModules: true,
    config.module.rules.push({
        enforce: 'pre',
        test:/\.js?$/,
        exclude: [/node_modules/],
        loader: 'eslint-loader',
        options: {
          quiet: true,
        },
    });
    config.node = {
      fs: 'empty'
    }
    return config;
  }
});