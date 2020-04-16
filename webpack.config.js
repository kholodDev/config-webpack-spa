require('dotenv').config()
const path = require('path')
const { getRuleJS, getRuleSCSS } = require('./webpack')
const { HotModuleReplacementPlugin, ProgressPlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* */
/* */
/* */

const ENV = process.env.ENV
const PORT = process.env.PORT
const HOST = process.env.HOST || null
const HTTPS = Boolean(Number(process.env.HTTPS))

/* */

const PATHS = {
	SRC: path.resolve(__dirname, 'src'),
	DIST: path.resolve(__dirname, 'dist'),
	STATIC: path.resolve(__dirname, 'static'),
	HTML: path.resolve(__dirname, 'static', 'index.html'),
}

/* */
/* */
/* */
/* */

const mode = ENV

/* */

const target = 'web'

/* */

const resolve = {
	extensions: ['.js', '.jsx'],
}

/* */

const entry = { index: path.resolve(PATHS.SRC, 'index.jsx') }

/* */
const contenthash = ENV === 'production' ? '.[contenthash]' : ''
const output = {
	filename: `js/[name]${contenthash}.js`,
	path: PATHS.DIST,
	publicPath: '',
}

/* */

const rules = [getRuleJS(ENV), getRuleSCSS(ENV)]

/* */

const plugins = {
	common: [
		new ProgressPlugin(),
		new CopyWebpackPlugin([{ from: PATHS.STATIC, to: `` }]),
		new HtmlWebpackPlugin({
			hash: false,
			template: PATHS.HTML,
			filename: `index.html`,
			chunks: ['index'],
		}),
	],
	development: [new HotModuleReplacementPlugin()],
	production: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/[name].[contenthash].css`,
		}),
	],
}

/* */

const devtool = 'cheap-module-eval-source-map'

/* */

const devServer = {
	port: PORT,
	contentBase: PATHS.DIST,
	host: HOST,
	https: HTTPS,
	overlay: {
		warnings: false,
		errors: true,
	},
	compress: false,
	open: true,
	liveReload: true,
	historyApiFallback: true,
	quiet: false,
}

/* */
/* */
/* */
/* */

module.exports = {
	mode,
	target,
	resolve,
	entry,
	output,
	module: {
		rules,
	},
	optimization: {},
	plugins: [...plugins.common, ...plugins[ENV]],
	devtool,
	devServer,
}
