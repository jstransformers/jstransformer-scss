'use strict';

var path = require('path');
var Promise = require('promise');
var sass = require('node-sass');
var extend = require('extend');

exports.name = 'scss';
exports.outputFormat = 'css';

exports.render = function (str, options) {
  var input = extend({}, options, {data: str});
  var out = sass.renderSync(input);
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(function (filename) {
      return path.resolve(filename);
    })
  };
};

exports.renderAsync = function (str, options) {
  var input = extend({}, options, {data: str});
  return new Promise(function (fulfill, reject) {
    sass.render(input, function (err, out) {
      if (err) {
        return reject(err);
      }

      return fulfill({
        body: out.css.toString(),
        dependencies: out.stats.includedFiles.map(function (filename) {
          return path.resolve(filename);
        })
      });
    });
  });
};

exports.renderFile = function (filename, options) {
  var input = extend({}, options, {file: path.resolve(filename)});
  var out = sass.renderSync(input);
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(function (filename) {
      return path.resolve(filename);
    }).filter(function (name) {
      return name !== filename;
    })
  };
};

exports.renderFileAsync = function (filename, options) {
  var input = extend({}, options, {file: path.resolve(filename)});
  return new Promise(function (fulfill, reject) {
    sass.render(input, function (err, out) {
      if (err) {
        return reject(err);
      }

      return fulfill({
        body: out.css.toString(),
        dependencies: out.stats.includedFiles.map(function (filename) {
          return path.resolve(filename);
        }).filter(function (name) {
          return name !== filename;
        })
      });
    });
  });
};
