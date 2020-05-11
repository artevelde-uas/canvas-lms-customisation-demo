const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const browserList = require('@instructure/supported-browsers');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssClean = require('postcss-clean');

module.exports = {
    mode: 'production',
    entry: [
        'core-js/stable',
        './src/index.js'
    ],
    performance: {
        hints: 'error',
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
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
