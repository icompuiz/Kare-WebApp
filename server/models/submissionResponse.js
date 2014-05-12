var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionResponseSchema = new Schema({
	value: {
		type: String
		// required: true
	},
	question: {
		type: mongoose.Schema.Types.ObjectId // reference to the particular question in the quiz
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var submissionResponse = module.exports = submissionResponseSchema
