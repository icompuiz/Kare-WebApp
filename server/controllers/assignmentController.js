var modelName = 'Assignment';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var restful = require('node-restful');
var model = mongoose.model(modelName);
var Submission = mongoose.model('Submission');

var resource = restful
	.model(modelName, model.schema)
	.methods(['get', 'post', 'put', 'delete']);

resource.route('submissions', {
	detail: true,
	methods: ['post', 'put'],
	handler: function(req, res) {

		var submission = req.body;

		// expected properties
		// var submission = {
		// 	assignment: $scope.assignment._id,
		// 	quiz: exercise.quiz._id,
		// 	responses: []
		// };

		var finishRequest = function(err, submission) {

			if (err) {
				return res.json(500, err);
			}

			res.json(submission);
			
		};

		if (!submission._id) {
			var submission = new Submission(req.body);
			submission.save(function(err, data) {
				console.log(data);
				if (err) {
					return finishRequest(err);
				}
				finishRequest(null, submission);
			});
		} else {
			var id = submission._id;
			delete submission._id;
			Submission.findOneAndUpdate({_id: id}, submission, function(err, data) {
				if (err) {
					return	finishRequest(err);
				}
				return finishRequest(null, data);
			});
		}

	}
})


module.exports = resource;
