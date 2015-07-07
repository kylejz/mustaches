var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mustache = require('./Mustache.js');
var Status = require('./Status.js');

var userSchema = new Schema({
	facebookId: {type: String, index: true, unique: true},
	username: String,
	mustaches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mustache'}],
	status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'}
});

module.exports = mongoose.model('User', userSchema);