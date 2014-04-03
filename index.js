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
 * @param {RegExp} [rgx]
 *
 * @return {Array}
 */
module.exports = function mapRequire(dir, fn, ctx, rgx) {
  rgx = rgx || /\.js$/;

  return fs.readdirSync(dir)
    .filter(rgx.test, rgx)
    .map(function(f) {
      return fn.call(this, (require(path.join(dir, f))));
    }, ctx);
};
