require('dotenv').config()
const path = require('path')

const ENV = process.env.ENV

const PATHS = {
	SRC: 'src',
	DIST: 'dist',
}

// config

const mode = ENV

const target = 'web'

const resolve = {
	extensions: ['js', 'jsx'],
}

const entry = `${PATHS.SRC}/index.jsx`

const output = {
	filename: '[name].[contenthash].js',
	path: PATHS.DIST,
	publicPath: '/',
}

const rules = [
	{
		test: /\.(js|jsx)/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				sourceMap: ENV === 'development',
				plugins: ENV === 'development' ? ['transform-react-remove-prop-types'] : [],
			},
		},
	},
]

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
	plugins: [],
}
