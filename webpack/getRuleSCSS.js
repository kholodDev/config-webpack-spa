const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getRuleSCSS = env => {
	const use = {
		/* инжектит стили на страницу в <style> */
		development: [
			{
				loader: 'style-loader',
			},
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '[path]-[local]__[hash:base64:5]',
					},
				},
			},
			{
				loader: 'sass-loader',
			},
		],
		production: [
			{
				loader: MiniCssExtractPlugin.loader,
			},
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '[hash:base64:5]',
					},
				},
			},
			{
				loader: 'postcss-loader',
				options: {
					config: { path: 'postcss.config.js' },
				},
			},
			{
				loader: 'sass-loader',
			},
		],
	}

	return {
		test: /\.s[ac]ss$/,
		exclude: /node_modules/,
		use: use[env],
	}
}

module.exports = getRuleSCSS
