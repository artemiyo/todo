const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './build'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
			template: './src/index.html',
		}),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
					loader: 'babel-loader',
                }
			}, {
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
                	"css-loader", // translates CSS into CommonJS
                	"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			}
        ]
    }
};
