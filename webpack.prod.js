const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const browserList = require('@instructure/supported-browsers');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssClean = require('postcss-clean');

module.exports = {
    mode: 'production',
    performance: {
        hints: 'error',
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
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
                        }),
                        postcssClean({
                            level: 2
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
