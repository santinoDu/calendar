const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        filename: './index.js',
        path: path.resolve(__dirname),
        library: 'Calendar',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};