var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Heart = require('./Heart.js');
var random = require('mongoose-simple-random');
var User = require('./User.js');

var mustacheSchema = new Schema({
	name: {type: String, minlength: 1, maxlength: 30, index: true, unique: true},
	userName: {type: String, maxlength: 25, minlength: 3, required: true},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	tags: [{type: String}],
	img: {type: String, required: true},
	wins: [Date],
	hearts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

mustacheSchema.plugin(random);

module.exports = mongoose.model('Mustache', mustacheSchema);