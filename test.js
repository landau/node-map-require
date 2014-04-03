'use strict';

var path = require('path');
var FIXTURES = path.join(__dirname, 'fixtures');

var is = require('is-predicate');
var assert = require('assert');
var mapRequire = require('./');

function property(key) {
  return function(o) {
    return o[key];
  };
}

describe('#mapRequire', function() {
  before(function() {
    this.arr = mapRequire(FIXTURES, property('name'));
  });

  it('should return an array of exports', function() {
    var arr = this.arr;
    assert(is.array(arr));
    assert.equal(arr.length, 2); // filtered out non-js
  });

  it('should transform each export', function() {
    var arr = this.arr;
    assert(arr.indexOf('Charmander') > -1);
    assert(arr.indexOf('Pikachu') > -1);
  });

  it('should apply context', function() {
    var o = {
      a: 'a',
      fn: function() {
        return this.a;
      }
    };
    var arr = mapRequire(FIXTURES, o.fn, o);
    assert(arr.indexOf('a') > -1);
  });

  it('should use a custom rgx', function() {
    var arr = mapRequire(FIXTURES, property('name'), null, /[^pikachu].js$/);
    assert.equal(arr.length, 1);
    assert(arr.indexOf('Charmander') > -1);
    assert.equal(arr.indexOf('Pikachu'), -1);
  });
});
