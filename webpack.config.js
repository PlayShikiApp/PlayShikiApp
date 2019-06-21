const path = require('path');

module.exports = {
	entry: {
		main: [
			'@babel/polyfill',
			'./src/index.js',
		]
	},
	mode: 'development',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'src/static/js')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		}]
	},
};
