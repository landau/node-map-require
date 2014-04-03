[![Build Status](https://travis-ci.org/landau/node-map-require.svg)](https://travis-ci.org/landau/node-map-require)

map-require
================

Require a directory of modules and apply a function on module.exports

```js
function mapRequire(dir, fn, ctx) { }
```

## Install

`npm i -S map-require`

## Usage

```js
var path = require('path');
var is = require('is-predicate');
var assert = require('assert');

var mapRequire = require('map-require');
var FIXTURES = path.join(__dirname, 'fixtures');

var arr = mapRequire(FIXTURES, property('name'));
assert(is.array(arr));
assert(arr.indexOf('Charmander') > -1);
assert(arr.indexOf('Pikachu') > -1);

// override regex
var arr = mapRequire(FIXTURES, property('name'), null, /[^pikachu].js$/);
assert.equal(arr.length, 1);
assert(arr.indexOf('Charmander') > -1);
assert.equal(arr.indexOf('Pikachu'), -1);
```

## Changelog

#### 0.0.5
- Added ability to override internal `RegExp` as 4th param

#### 0.0.2 - 0.0.4
- Bug fixes

#### 0.0.1
- Initial releaset
