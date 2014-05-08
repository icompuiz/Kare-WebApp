var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Instruction = require('./instruction');

var exerciseSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	instructions: [Instruction],
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz'
	}
});

var exercise = module.exports = mongoose.model('Exercise', exerciseSchema);
