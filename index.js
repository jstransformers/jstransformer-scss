'use strict';

var path = require('path');
var Promise = require('promise');
var sass = require('node-sass');

exports.outputFormat = 'css';

exports.compile = function (str, options) {
  var input = {data: str};
  Object.keys(options || {}).forEach(function (key) {
    if (key !== 'data') {
      input[key] = options[key];
    }
  });
  var stats = (input.stats = input.stats || {});
  var css = sass.renderSync(input);
  return {
    body: css,
    dependencies: stats.includedFiles.map(function (filename) {
      return path.resolve(filename);
    })
  };
};

exports.compileAsync = function (str, options) {
  var input = {data: str};
  Object.keys(options || {}).forEach(function (key) {
    if (key !== 'data') {
      input[key] = options[key];
    }
  });
  var stats = (input.stats = input.stats || {});
  return (new Promise(function (resolve, reject) {
    input.success = resolve;
    input.error = reject;
    sass.render(input);
  })).then(function (css) {
    return {
      body: css,
      dependencies: stats.includedFiles.map(function (filename) {
        return path.resolve(filename);
      })
    };
  });
};

exports.compileFile = function (filename, options) {
  filename = path.resolve(filename);
  var input = {file: filename};
  Object.keys(options || {}).forEach(function (key) {
    if (key !== 'file') {
      input[key] = options[key];
    }
  });
  var stats = (input.stats = input.stats || {});
  var css = sass.renderSync(input);
  return {
    body: css,
    dependencies: stats.includedFiles.map(function (filename) {
      return path.resolve(filename);
    }).filter(function (name) {
      return name !== filename;
    })
  };
};

exports.compileFileAsync = function (filename, options) {
  filename = path.resolve(filename);
  var input = {file: filename};
  Object.keys(options || {}).forEach(function (key) {
    if (key !== 'file') {
      input[key] = options[key];
    }
  });
  var stats = (input.stats = input.stats || {});
  return (new Promise(function (resolve, reject) {
    input.success = resolve;
    input.error = reject;
    sass.render(input);
  })).then(function (css) {
    return {
      body: css,
      dependencies: stats.includedFiles.map(function (filename) {
        return path.resolve(filename);
      }).filter(function (name) {
        return name !== filename;
      })
    };
  });
};
