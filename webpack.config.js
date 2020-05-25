const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const isProd = process.env.NODE_ENV !== 'development';

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        main: [
            path.resolve(__dirname, './main.less')
        ],
    },
    output: {
        path: path.resolve(__dirname),
        filename: './[name].bundle.js'
    },

    module: {
        rules: [ {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => isProd ? [autoprefixer(), cssnano()] : []
                    }
                },
                'less-loader'
            ]
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].bundle.css',
            chunkFilename: '[name].css'
        })
    ],

    devtool: isProd ? 'none' : 'inline-source-map',
};
