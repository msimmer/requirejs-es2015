define(function () {
    'use strict';

    var buildMap = {};

    function transpile(name, parentRequire, onLoadNative, config) {
        var babel = require.nodeRequire('babel-core');
        var path = parentRequire.toUrl(withExtension(name, config));

        try {
            var result = babel.transformFileSync(path, {
                sourceFileName: config.baseUrl + name,
                sourceMaps: config.babel && config.babel.sourceMaps,
                filename: config.baseUrl + name,
                presets: ['es2015'],
                plugins: ['transform-es2015-modules-amd']
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
