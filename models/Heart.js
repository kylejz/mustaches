var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User.js');

var heartSchema = new Schema({
	to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Heart', heartSchema);