'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var transform = require('../');

var input = fs.readFileSync(__dirname + '/input.scss', 'utf8');
var expected = fs.readFileSync(__dirname + '/expected.css', 'utf8');
var expectedImport = fs.readFileSync(__dirname + '/expected-import.css', 'utf8');

var res = transform.render(input);
fs.writeFileSync(__dirname + '/output.css', res.body);
assert(res.body === expected, 'output.css should equal expected.css');
assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');

var res = transform.renderFile(__dirname + '/input.scss');
fs.writeFileSync(__dirname + '/output.css', res.body);
assert(res.body === expected, 'output.css should equal expected.css');
assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');

var res = transform.renderFile(__dirname + '/import.scss');
fs.writeFileSync(__dirname + '/output.css', res.body);
assert(res.body === expectedImport, 'output.css should equal expected-import.css');
assert.deepEqual(res.dependencies, [path.resolve(__dirname + '/input.scss')]);


transform.renderAsync(input).then(function (res) {
  fs.writeFileSync(__dirname + '/output.css', res.body);
  assert(res.body === expected, 'output.css should equal expected.css');
  assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');
  return transform.renderFileAsync(__dirname + '/input.scss');
}).then(function (res) {
  fs.writeFileSync(__dirname + '/output.css', res.body);
  assert(res.body === expected, 'output.css should equal expected.css');
  assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');
  return transform.renderFile(__dirname + '/import.scss');
}).then(function (res) {
  fs.writeFileSync(__dirname + '/output.css', res.body);
  assert(res.body === expectedImport, 'output.css should equal expected-import.css');
  assert.deepEqual(res.dependencies, [path.resolve(__dirname + '/input.scss')]);
}).done(function () {
  console.log('test passed');
});
