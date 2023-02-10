const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = [
    autoprefixer,
    cssnano({ preset: 'default' })
]