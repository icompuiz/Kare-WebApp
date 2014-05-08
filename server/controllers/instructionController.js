var modelName = 'Instruction';

var mongoose = require('mongoose');
var restful = require('node-restful');
var model = mongoose.model(modelName);

var resource = restful.model(modelName, model.schema).methods(['get', 'post', 'put', 'delete']);
module.exports = resource;