module.exports = {
	entry: './src/main.js',
	watch: true,
	output: {
		filename: 'main.js',
		path: '/home/nikokozak/webdev/covidpoem/web/public',
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'eslint-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-object-rest-spread']
					}
				}
			}
		]
	}
}
