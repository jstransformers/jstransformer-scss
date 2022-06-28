const path = require('path')
const sass = require('sass')
const extend = require('extend-shallow')

exports.name = 'scss'
exports.outputFormat = 'css'

exports.render = function (str, options) {
  const input = extend({}, options, {data: str})
  // TODO: Replace with sass.compileString()
  const out = sass.renderSync(input)
  return {
    body: out.css.toString(),
    dependencies: out.stats.includedFiles.map(filename => {
      return path.resolve(filename)
    })
  }
}

exports.renderAsync = function (str, options) {
  const input = extend({}, options, {data: str})
  return new Promise((resolve, reject) => {
    // TODO: Replace with sass.compileStringAsync()
    sass.render(input, (err, out) => {
      if (err) {
        return reject(err)
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
  // TODO: Replace with sass.compile()
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
    // TODO: Replace with sass.compileAsync()
    sass.render(input, (err, out) => {
      if (err) {
        return reject(err)
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
