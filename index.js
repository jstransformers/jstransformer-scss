'use strict'

var path = require('path')
var sass = require('node-sass')
var extend = require('extend-shallow')

exports.name = 'scss'
exports.outputFormat = 'css'

exports.render = function (str, options) {
  var input = extend({}, options, {data: str})
  var out = sass.renderSync(input)
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(function (filename) {
      return path.resolve(filename)
    })
  }
}

exports.renderAsync = function (str, options) {
  var input = extend({}, options, {data: str})
  return new Promise(function (resolve, reject) {
    sass.render(input, function (err, out) {
      if (err) {
        return reject(err)
      }

      return resolve({
        body: out.css.toString(),
        dependencies: out.stats.includedFiles.map(function (filename) {
          return path.resolve(filename)
        })
      })
    })
  })
}

exports.renderFile = function (filename, options) {
  var input = extend({}, options, {file: path.resolve(filename)})
  var out = sass.renderSync(input)
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(function (filename) {
      return path.resolve(filename)
    }).filter(function (name) {
      return name !== filename
    })
  }
}

exports.renderFileAsync = function (filename, options) {
  var input = extend({}, options, {file: path.resolve(filename)})
  return new Promise(function (resolve, reject) {
    sass.render(input, function (err, out) {
      if (err) {
        return reject(err)
      }

      return resolve({
        body: out.css.toString(),
        dependencies: out.stats.includedFiles.map(function (filename) {
          return path.resolve(filename)
        }).filter(function (name) {
          return name !== filename
        })
      })
    })
  })
}
