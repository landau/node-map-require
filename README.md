[![Build Status](https://travis-ci.org/landau/node-map-require.svg)](https://travis-ci.org/landau/node-map-require)

map-require
================

Require a directory of modules and apply a function on module.exports

## Install

`npm i -S map-require`

## Usage

```js
var path = require('path');
var is = require('is-predicate');
var assert = require('assert');

var mapRequire = require('./');
var FIXTURES = path.join(__dirname, 'fixtures'); // fixtures is a dir of node modules

var arr = mapRequire(FIXTURES, property('name'));
assert(is.array(arr));
assert(arr.indexOf('Charmander') > -1);
assert(arr.indexOf('Pikachu') > -1);
```
