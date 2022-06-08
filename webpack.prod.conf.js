const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [{
	entry: {
		index: './src/index.js',
		another: './src/another.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js' // 指定非入口js文件的名称
	},
	mode: 'production',
	optimization: {
		minimize: true
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "eslint-loader"
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			},
			{
				test: /\.gogoend$/,
				exclude: /node_modules/,
				loader: path.resolve('./build/gogoend-loader/index.js'),
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/public/index.template.html',
			inject: true
		}),
		new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
}]

