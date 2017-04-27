# requirejs-es6
A RequireJS plugin to load ECMAScript 2015 modules via babel. It depends on [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) 6.x
and comes with the [ES2015 preset](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015)
as well as babel plugin for transforming [ES2015 modules to AMD](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-es2015-modules-amd).

For transforming advanced ECMAScript syntax, it uses your projects `.babelrc`, so you can
choose, which presets and plugins you want to use.

## Table of contents
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Todo](#todo)
* [License](#license)

## Features

- Transpile ES2015 modules to AMD RequireJS modules and load them via `es6!` prefix
- Use your projects `.babelrc` or other babel section from `project.json` for transpiling

## Installation
Install the package either by using npm or yarn.

```
npm i -D requirejs-es6
yarn add -D requirejs-es6
```

## Usage
To make use of the plugin, you want to modify your RequireJS config file, to contain the path
to the requirejs-es6 package as well as an optional file extension that is used by your ES2015 files.

It should look something like this:
```javascript
requirejs.config({
    // ...
    paths: {
        es6: 'node_modules/requirejs-es6/es6'
    },
    babel: {
        fileExtension: '.js' // extension of your ES2015 files - defaults to .js
    }
    // ...
});
```

You can now import ES2015 modules in your RequireJS files like this:

```javascript
define([
    'es6!myModule',
    'es6!components/anotherModule'
], function(myModule, anotherModule) {
    myModule.method();
    anotherModule.test();
});
```

If you want to use babel-transformations besides the built-in ES2015 preset, you can create a `.babelrc`
in your projects root directory (if not already present) or use the `babel` section of your `package.json` file.

## Todo
[ ] Add examples
[ ] Add module exports for `export default` syntax 

## License
MIT