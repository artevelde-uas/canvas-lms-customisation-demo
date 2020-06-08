const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssUrl = require('postcss-url');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].dev.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
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
                        postcssPresetEnv(),
                        postcssUrl({
                            url: 'inline',
                            encodeType: 'base64'
                        })
                    ]
                }
            }]
        }]
    }
};
