var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var MongoStore = require('connect-mongo')(express);
var engines = require('consolidate');


var app = express();


var mongoOptions = {
	db: {
		safe: true
	}
};

var uri = 'mongodb://localhost/karewebapp';

mongoose.connect(uri, mongoOptions, function (err, res) {
	if (err) {
		console.log("There was an error connecting to:", uri, err);
	} else {
		console.log("Successfully connected to:", uri);

	}
});

// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
	return next();
});

app.use(require('connect-livereload')());
app.use(express.static(path.join(__dirname, '.tmp')));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.errorHandler({
	dumpExceptions: true,
	showStack: true
}));
app.set('views',path.join( __dirname, 'app','views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.logger('dev'));
app.use(express.bodyParser({
	limit: '10mb'
}));
app.use(express.methodOverride());
app.use(express.query());
app.use(express.cookieParser('forKaringEyesOnly'));
app.use(express.session({
	key: 'karingSessionKey',
	store: new MongoStore({
		url: 'mongodb://localhost/karewebapp-session'
	}),
	secret: 'karingSessionSecret',

}));

app.use(app.router);



var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});


var pathToRouteConfig = path.join(__dirname, '/server/routeConfig.js');

console.log(pathToRouteConfig);

require(pathToRouteConfig)(app);

var port = 9000;
app.listen(port, function () {
	console.log('Express server listening on port', port);
})
