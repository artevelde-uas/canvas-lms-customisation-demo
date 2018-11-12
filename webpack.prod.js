const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const browserList = require('@instructure/supported-browsers');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    mode: 'production',
    performance: {
        hints: 'error',
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [[
                        '@babel/preset-env', {
                            targets: browserList,
                            useBuiltIns: 'entry',
                            loose: true
                        }
                    ]]
                }
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        postcssImport(),
                        postcssPresetEnv({
                            browsers: browserList
                        })
                    ]
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};
