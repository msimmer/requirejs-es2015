define(function () {
    'use strict';

    var buildMap = {};

    function transpile(name, parentRequire, onLoadNative, config) {
        var babel = require.nodeRequire('babel-core');
        var find = require.nodeRequire('find-babel-config');
        var path = require.nodeRequire('path');

        var fpath = parentRequire.toUrl(withExtension(name, config));
        var babelrc = find.sync(path.dirname(fpath)).config || { presets: [], plugins: [] };

        if (babelrc.presets.indexOf('es2015') < 0) {
            babelrc.presets.push('es2015');
        }
        if (babelrc.plugins.indexOf('transform-es2015-modules-amd') < 0) {
            babelrc.plugins.push('transform-es2015-modules-amd');
        }

        try {
            var result = babel.transformFileSync(fpath, {
                sourceFileName: config.baseUrl + name,
                sourceMaps: config.babel && config.babel.sourceMaps,
                filename: config.baseUrl + name,
                presets: babelrc.presets,
                plugins: babelrc.plugins,
            });

            buildMap[name] = result.code;
            onLoadNative.fromText(result.code);
        } catch (err) {
            onLoadNative.error(err);
        }
    }

    function withExtension(name, config) {
        var extension = config.babel && config.babel.fileExtension || '.js';
        return name.indexOf(extension) === -1 ? name + extension : name;
    }

    return {
        load: transpile,
        write: function (pluginName, name, write) {
            if (typeof buildMap[name] === 'string') {
                write.asModule(pluginName + "!" + name, buildMap[name]);
            } else {
                throw new Error('Unknown module ' + name);
            }
        }
    };
});
