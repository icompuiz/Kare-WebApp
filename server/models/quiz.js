var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuizQuestion = require('./QuizQuestion');

var quizSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	questions: [QuizQuestion]
});

var quiz = module.exports = mongoose.model('Quiz', quizSchema);
