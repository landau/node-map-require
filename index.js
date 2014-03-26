'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Given a directory, filter out non-js, require all modules SYNC
 * and map a function across each export from said module.
 *
 * @param {string} dir
 * @param {function} fn
 * @param {Object} [ctx]
 *
 * @return {Array}
 */
module.exports = function mapRequire(dir, fn, ctx) {
  var filterRgx = /\.js$/;
  return fs.readdirSync(dir)
    .filter(function(f) {
      return filterRgx.test(f);
    })
    .map(function(f) {
      return fn(require(path.join(dir, f)));
    }, ctx);
};
