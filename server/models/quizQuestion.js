var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizQuestionSchema = new Schema({
	name: { type: String, required: true },
	text: { type: String, required: true }
});

var quizQuestion = module.exports = quizQuestionSchema
