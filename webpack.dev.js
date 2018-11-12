const postcssPresetEnv = require('postcss-preset-env');

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
                    modules: true,
                    localIdentName: '[local]__[hash]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        postcssImport(),
                        postcssPresetEnv()
                    ]
                }
            }]
        }]
    }
};
