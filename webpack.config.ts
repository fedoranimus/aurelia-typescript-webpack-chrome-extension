import * as path from 'path';
import * as webpack from 'webpack';
import { AureliaPlugin } from 'aurelia-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config: webpack.Configuration = {
    entry: {
        app: 'aurelia-bootstrapper'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
        modules: [
            'src',
            'node_modules'
        ]
    },
    module: {
        rules: [{
            test: /\.ts$/i,
            use: 'ts-loader',
            include: /src/
        },
        {
            test: /\.css$/i,
            issuer: /\.html?$/i,
            use: 'css-loader'
        },
        {
            test: /\.html$/i,
            use: 'html-loader'  
        },
        { 
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, 
            loader: 'url-loader?limit=100000' 
        }
    ]
    },
    plugins: [
        new AureliaPlugin({
            aureliaApp: 'main'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/manifest.json'
            },
            {
                from: 'index.html'
            }
        ])
    ]
}

export default config;