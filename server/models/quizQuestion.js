var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizQuestionSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var quizQuestion = module.exports = quizQuestionSchema
