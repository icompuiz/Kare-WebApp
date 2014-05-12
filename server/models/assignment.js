var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient'
	},
	exercises: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Exercise'
	}],
	created: {
		type: Date,
		default: Date.now
	}
});

var assignment = module.exports = mongoose.model('Assignment', assignmentSchema);
