const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = process.env.NODE_ENV === 'production'
    ? []
    : [
        new HtmlWebpackPlugin({
            title: 'Text GIF',
            template: 'assets/index.html'
        })
    ];

const devServer = process.env.NODE_ENV === 'production'
    ? {
        static: {
            directory: './build',
        },
        compress: true,
        port: 9000,
    }
    : {};

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // references .babelrc
                    loader: 'babel-loader',
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer,
    plugins,
}