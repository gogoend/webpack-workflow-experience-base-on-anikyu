const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: {
		index: './src/index.js',
		another: './src/another.ts'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js' // 指定非入口js文件的名称
	},
	mode: 'development',
	optimization:{
		minimize: false
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: "eslint-loader"
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'ts-loader'
				]
			},
			{
				test: /\.(vue)$/,
				exclude: /node_modules/,
				use: [
					'vue-loader'
				]
			},
			{
				test: /\.gogoend$/,
				exclude: /node_modules/,
				use: [
					// path.resolve('./build/gogoend-loader/index.js'),
					{
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
				]
			}
		],
	},
	devServer: {
		compress: true,
		port: 9000,
		client: {
			logging: 'warn',
			overlay: true,
			progress: true,
		}
	},
	plugins: [
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/public/index.template.html',
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
}