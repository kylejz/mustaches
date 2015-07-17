var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mustache = require('./Mustache.js');
var Shoutout = require('./Shoutout.js');

var userSchema = new Schema({
	facebookId: {type: String, index: true, unique: true},
	username: String,
	mustaches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mustache'}],
	status: {type: String, minlength: 1, maxlength: 140},
	inbox: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shoutout'}]
});

module.exports = mongoose.model('User', userSchema);