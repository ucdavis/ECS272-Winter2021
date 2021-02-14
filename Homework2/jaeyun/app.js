/*
Copyright 2021 Jaewan Yun <jaeyun@ucdavis.edu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Import module dependencies.
 */

let path = require('path');
let express = require('express');
let morgan_logger = require('morgan');
let cookie_parser = require('cookie-parser');
let create_http_error = require('http-errors');
let compression = require('compression');
let express_minify = require('express-minify');
let html_minify = require('html-minifier').minify;

/**
 * Setup express app.
 */

let app = express();

/**
 * Compression
 */

 // Compress
app.use(compression());

// Minify public static folder
app.use(express_minify({
	cache: __dirname + '/cache',
	uglifyJsModule: require('uglify-es'),
}));

// Minify HTML
app.use(function (req, res, next) {
	res.original_render = res.render;
	res.render = function (view, options) {
		res.original_render(view, options, function (err, html) {
			if (err)
				throw err;
			html = html_minify(html, {
				caseSensitive: true,
				collapseBooleanAttributes: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
			});
			res.send(html);
		});
	};
	next();
});

/**
 * Settings
 */

app.set('env', 'development');
app.set('view engine', 'pug');
app.set('public', path.join(__dirname, 'public'));
app.set('routes', path.join(__dirname, 'routes'));
app.set('utilities', path.join(__dirname, 'utilities'));
app.set('views', path.join(__dirname, 'views'));

/**
 * Import wrappers.
 */

let file = require(path.join(app.get('utilities'), 'file'));

/**
 * Setup middleware.
 */

if (app.get('env') === 'development')
	app.use(morgan_logger('dev'));
else if (app.get('env') === 'production')
	app.use(morgan_logger('common'));
// Recognize the incoming request object as JSON object
app.use(express.json({limit: '50mb'}));
// Recognize the incoming request object as arrays or strings
app.use(express.urlencoded({extended: true, limit: '50mb'}));
// Parse cookie header and populate req.cookies
app.use(cookie_parser());
// Serve public resource directory
app.use(express.static(app.get('public')));

/**
 * Serve website routes according to middleware file paths.
 */

file.get_files(app.get('routes'), relative=true, ext='.js')
	.then(function (routes) {
		// Map routes to middleware
		routes.sort(route_sort_fn);
		for (let r of routes) {
			let route = r === path.join(path.sep, 'index') ? path.sep : r;
			app.use(route, require(path.join(app.get('routes'), r)));
			console.log('Mapped route', route);
		}
		// Handle fallthrough and error
		app.use(create_not_found_error);
		app.use(handle_error);
	});

// Sort routes as a personal preference.
function route_sort_fn(a, b) {
	if (a === path.join(path.sep, 'index'))
		return -1;
	else if (b === path.join(path.sep, 'index'))
		return 1;
	if (a.split(path.sep).length > b.split(path.sep).length)
		return 1;
	else if (a.split(path.sep).length < b.split(path.sep).length)
		return -1;
	else
		return a.localeCompare(b);
}

// Catch unhandled requests and create error.
function create_not_found_error(req, res, next) {
	next(create_http_error(404));
}

// Handle errors during development and production.
function handle_error(err, req, res, next) {
	// Set locals, only providing error in development
	if (app.get('env') === 'development') {
		console.error(req.headers.host);
		console.error(err);
		res.locals.message = err.message;
		res.locals.error = err;
	}
	else if (app.get('env') === 'production') {
		res.locals.message = '';
		res.locals.error = {};
	}
	// Render the error page
	res.status(err.status || 500);
	res.render('error');
}

module.exports = app;
