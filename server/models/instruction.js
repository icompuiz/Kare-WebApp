var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instructionSchema = new Schema({
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



// var instruction = mongoose.model('Instruction', instructionSchema);

module.exports = instructionSchema;
