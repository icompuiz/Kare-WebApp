var modelName = 'Exercise';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var restful = require('node-restful');
var model = mongoose.model(modelName);
var Quiz = mongoose.model('Quiz');

var resource = restful
	.model(modelName, model.schema)
	.methods(['get', 'post', 'put', 'delete']);


resource.before('get', function (req, res, cont) {
	req.quer.populate({
		path: 'quiz',
	});
	cont();

});

resource.before('put', function (req, res, cont) {


	function saveQuiz(callback) {

		if (req.body.quiz._id) {
			Quiz.findByIdAndUpdate(req.body.quiz._id, {
				name: req.body.quiz.name,
				questions: req.body.quiz.questions
			}, function (err) {
				req.body.quiz = req.body.quiz._id;
				callback(err);
			});
		} else {
			req.body.quiz = new Quiz(req.body.quiz);
			req.body.quiz.save(function (err) {
				req.body.quiz = req.body.quiz._id;
				callback(err);
			});
		}

	}

	if (req.body.quiz) {
		saveQuiz(cont);
	} else {
		cont();
	}


});

resource.before('delete', function(req, res, next) {

	var parts = req.path.split('/');
	var id = parts.pop();
	console.log(id);
	model.findOne({_id: id}).exec(function(err, exercise) {
		if (exercise) {
			if (exercise.quiz) {
				Quiz.findOne({_id: exercise.quiz}).exec(function(err, doc) {
					console.log(doc);

					if (doc) {
						doc.remove();
					}
					
				});
			} else {
				next();
			}
		} else {
			next();
		}
		

	});
	next();

});

resource.before('post', function (req, res, cont) {




	function saveQuiz(callback) {

		req.body.quiz = new Quiz(req.body.quiz);
		req.body.quiz.save(function () {
			callback();
		});


	}


	if (req.body.quiz) {
		saveQuiz(cont);
	} else {
		cont();
	}


});

module.exports = resource;
