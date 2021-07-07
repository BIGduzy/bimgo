const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/client.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['*', '.json', '.js', '.jsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
};
