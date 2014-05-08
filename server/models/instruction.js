var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instructionSchema = new Schema({
	name: { type: String, required: true },
	text: { type: String, required: true }
});



// var instruction = mongoose.model('Instruction', instructionSchema);

module.exports = instructionSchema;
