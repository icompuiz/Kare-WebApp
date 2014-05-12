var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubmissionResponse = require('./SubmissionResponse.js');

var submissionSchema = new Schema({
	patientId: { type: Number, required: true },
	assignmentId: { type: Number, required: true },
	responses: [ SubmissionResponse ]
});

var submission = module.exports = mongoose.model('Submission', submissionSchema);
