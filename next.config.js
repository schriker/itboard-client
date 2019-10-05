const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  useFileSystemPublicRoutes: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }
})