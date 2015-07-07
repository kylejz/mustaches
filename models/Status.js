var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User.js');

var statusSchema = new Schema ({
	text: {type: String, maxlength: 140, minlength: 1, required: true},
	by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	created_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Status', statusSchema);
