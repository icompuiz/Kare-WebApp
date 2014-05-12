var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionResponseSchema = new Schema({
	value: { type: String, required: true },
	questionId: { type: String, required: true }
});

var submissionResponse = module.exports = submissionResponseSchema
