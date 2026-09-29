/* eslint-disable @typescript-eslint/no-require-imports */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};
