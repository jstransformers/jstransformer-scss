# jstransformer-scss

[SCSS](https://www.npmjs.com/package/node-sass) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-scss/master.svg)](https://travis-ci.org/jstransformers/jstransformer-scss)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-scss/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-scss)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-scss/master.svg)](http://david-dm.org/jstransformers/jstransformer-scss)
[![NPM version](https://img.shields.io/npm/v/jstransformer-scss.svg)](https://www.npmjs.org/package/jstransformer-scss)

## Installation

    npm install jstransformer-scss

## API

```js
var scss = require('jstransformer')(require('jstransformer-scss'));

scss.renderFile('example.scss').body
// => Compiled CSS.
```

## License

MIT
