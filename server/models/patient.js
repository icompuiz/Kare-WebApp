var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	birthdate: {
		type: Date,
		required: true
	}
});

var patient = module.exports = mongoose.model('Patient', patientSchema);
