var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mustache = require('./Mustache.js');
var Status = require('./Status.js');

var userSchema = new Schema({
	username: {type: String, maxlength: 25, minlength: 3, index: true, unique: true, required: true},
	mustaches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mustache'}],
	status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'}
});

module.exports = mongoose.model('User', userSchema);