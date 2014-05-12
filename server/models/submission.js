var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubmissionResponse = require('./submissionResponse.js');

var submissionSchema = new Schema({
	// the particular assignment that holds the exercise. 
	// Gets us the reference to the patient. No need to store it here
	assignment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Assignment'
	},
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz'
	},
	responses: [SubmissionResponse], // array of responses to the quiz questions
	created: {
		type: Date,
		default: Date.now
	}
});

var submission = module.exports = mongoose.model('Submission', submissionSchema);
