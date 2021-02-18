const withPWA = require('next-pwa');
const nextTranslate = require('next-translate');

const translate = nextTranslate();

module.exports = {
  ...translate,
  images: {
    domains: ['i.imgur.com', 'imgur.com', 'photos.marinetraffic.com'],
  },
  ...withPWA({
    pwa: {
      dest: 'public',
      mode: 'production',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      return translate.webpack(config);
    },
  }),
};
