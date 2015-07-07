var mongoose = require('mongoose');
var User = require('./models/User.js');
var Mustache = require('./models/Mustache.js');
var fs = require('fs');
var random = require('mongoose-simple-random')
var exports = {};

exports.getUserInfo = function(req, res){
	console.log(req.user); 
	return req.user
}

exports.createUser = function(req, res) {
	new User(req.body).save(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data)
		}
	})
};

exports.getUser = function(req,res) {
	User.find(req.query)
	.populate("mustaches")
	.exec(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data)
		}
	})
}

exports.postMustache = function(req, res) {
	new Mustache(req.body)
	.save(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
}

exports.getMustache = function(req, res) {
	Mustache.find({$or: [{'name': req.params.text},
		{'tags': req.params.text}, {'user': req.params.text}] },
		function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data)
		}
	})
}

exports.getTwoRandoms = function(req, res) {
	Mustache.findRandom({}, {},
		{limit: 2},
		function(err, data) {					
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
	})
}

exports.getOneRandom = function(req, res) {
	Mustache.findOneRandom(function(err, results) {
		if (err) {
			res.json(err);
		} else {
			console.log(results);
			res.json(results);
		}
	})
}

exports.addLike = function(req, res) {
	Mustache.findByIdAndUpdate(req.params.id,
		{$inc: {wins: 1}},
		function(err, data) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(data);
			}
		})
}

exports.changeHeart = function(req, res) {
	console.log(req.user);
	Mustache.findById(req.params.id, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			console.log(data);
			res.json(data);
		}
	})
}

module.exports = exports;