var webpackMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var express = require("express");
var path = require("path");

var app = express();

app.configure(function() {
	app.use(webpackMiddleware(webpack({
		context: __dirname,
		entry: "./lib/index",
		watch: true,
		watchDelay: 5000,
		debug: true,
		devtool: "eval",
		module: {
			loaders: [
				{ test: /\.json$/, loader: "json" },
				{ test: /\.coffee$/, loader: "coffee" },
				{ test: /\.jade$/, loader: "jade" },
				{ test: /\.css$/, loader: "style!css" },
				{ test: /\.less$/, loader: "style!css!less" },
			]
		},
		resolve: {
			alias: {
				vm: "vm-browserify"
			}
		},
		output: {
			publicPath: "http://localhost:8080/js/",
			filename: "web.js"
		}
	}), {
		lazy: true,
		publicPath: "/js/",
		filename: "web.js",
		stats: {
			colors: true
		}
	}));
	app.use(express.static(path.join(__dirname)));

});

app.listen(8080);
