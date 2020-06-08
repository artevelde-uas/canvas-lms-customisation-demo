const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const browserList = require('@instructure/browserslist-config-canvas-lms');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssUrl = require('postcss-url');
const postcssClean = require('postcss-clean');

module.exports = {
    mode: 'production',
    entry: [
        'core-js/stable',
        './src/index.js'
    ],
    performance: {
        hints: 'error',
        maxEntrypointSize: 2.5 * (2 ** 20),
        maxAssetSize: 2.5 * (2 ** 20)
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
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
                            corejs: 3,
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
                    modules: {
                        auto: true,
                        localIdentName: '[local]__[hash]'
                    },
                    localsConvention: 'camelCaseOnly'
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        postcssImport(),
                        postcssPresetEnv({
                            browsers: browserList
                        }),
                        postcssUrl({
                            url: 'inline',
                            encodeType: 'base64'
                        }),
                        postcssClean({
                            level: {
                                1: {
                                    removeEmpty: false
                                },
                                2: {
                                    removeEmpty: false
                                }
                            }
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
