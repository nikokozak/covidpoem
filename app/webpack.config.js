module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'main.js',
		path: '/home/nikokozak/webdev/covidpoem/web/public',
	},
	module: {
		rules: [
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
