var _ = require('lodash');

// controller definitions
// var ctrl = require('../modules/controllers/ctrl.js');
// var instructionsController = require('./controllers/instructionController.js');
// var quizQuestionsController = require('./controllers/quizQuestionController.js');
var exercisesController = require('./controllers/exerciseController.js');
var quizesController = require('./controllers/quizController.js');

var patientsController = require('./controllers/patientController.js');
var assignmentsController = require('./controllers/assignmentController.js');

var routes = [

	// {
	// 	path: 'api/ctrl',
	// 	resource: ctrl
	// },
	{
		path: '/api/exercises',
		resource: exercisesController
	},{
		path: '/api/quizes',
		resource: quizesController
	},


	{
		path: '/api/patients',
		resource: patientsController
	},


	{
		path: '/api/assignments',
		resource: assignmentsController
	}
	// {
	// 	path: '/api/instructions',
	// 	resource: instructionsController
	// },
	// {
	// 	path: '/api/quiz-questions',
	// 	resource: quizQuestionsController
	// },		

];

var appRoutes = [{
	path: 'partials/*',
	httpMethod: 'GET',
	middleware: function (req, res) {
		var requestedView = path.join('./', req.url);
		res.render(requestedView, function (err, html) {
			if (err) {
				res.render('404');
			} else {
				res.send(html);
			}
		});
	}
}, {
	path: '/',
	httpMethod: 'GET',
	middleware: function (req, res) {
		res.render('index.html');
	}
}];


module.exports = function (app) {

	_.each(routes, function (route) {
		console.log('Registering route', route.path);
		route.resource.register(app, route.path);
	});

	_.each(appRoutes, function (route) {

		var args = _.flatten([route.path, route.middleware]);

		switch (route.httpMethod) {
		case 'GET':
			app.get.apply(app, args);
			break;
		case 'POST':
			app.post.apply(app, args);
			break;
		case 'PUT':
			app.put.apply(app, args);
			break;
		case 'DELETE':
			app.delete.apply(app, args);
			break;
		default:
			throw new Error('Invalid method specified for route '+ route.path);
			break;
		}

	});

};
