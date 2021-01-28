'use strict'

const path = require('path')
const sass = require('sass')
const extend = require('extend-shallow')

exports.name = 'scss'
exports.outputFormat = 'css'

exports.render = function (inputString, options) {
  const input = extend({}, options, {data: inputString})
  const out = sass.renderSync(input)
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(filename => {
      return path.resolve(filename)
    })
  }
}

exports.renderAsync = function (inputString, options) {
  const input = extend({}, options, {data: inputString})
  return new Promise((resolve, reject) => {
    sass.render(input, (error, out) => {
      if (error) {
        return reject(error)
      }

      return resolve({
        body: out.css.toString(),
        dependencies: out.stats.includedFiles.map(filename => {
          return path.resolve(filename)
        })
      })
    })
  })
}

exports.renderFile = function (filename, options) {
  const input = extend({}, options, {
    file: path.resolve(filename)
  })
  const out = sass.renderSync(input)
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(filename => {
      return path.resolve(filename)
    }).filter(name => {
      return name !== filename
    })
  }
}

exports.renderFileAsync = function (filename, options) {
  const input = extend({}, options, {file: path.resolve(filename)})
  return new Promise((resolve, reject) => {
    sass.render(input, (error, out) => {
      if (error) {
        return reject(error)
      }

      return resolve({
        body: out.css.toString(),
        dependencies: out.stats.includedFiles.map(filename => {
          return path.resolve(filename)
        }).filter(name => {
          return name !== filename
        })
      })
    })
  })
}
