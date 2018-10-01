const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pathPublic = path.resolve(__dirname, 'public');
const devHost = 'localhost';

module.exports = {
    entry: [
        './src/js/app.js',
        './src/scss/main.scss'
    ],

    output: {
        filename: 'bundle.js',
        path: pathPublic
    },

    devServer: {
        contentBase: pathPublic,
        host: devHost,
        port: 9000,
        compress: true,
        stats: 'minimal'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },

    plugins: [
        new ExtractTextPlugin('main.css')
    ]
}