var mongoose = require('mongoose');
var User = require('../models/User.js');
var Mustache = require('../models/Mustache.js');
var Shoutout = require('../models/Shoutout.js');
var fs = require('fs');
var random = require('mongoose-simple-random')
var exports = {};

exports.getUserInfo = function(req, res){
	res.json(req.user)
}

exports.getUser = function(req, res) {
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

exports.getUserInbox = function(req, res) {
	User.findOne(req.params.id)
	.populate("inbox")
	.exec(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data)
		}
	})
}

exports.postMustache = function(req, res) {
	console.log(req.body, req.user);
	new Mustache({img: req.body.img, name: req.body.name, tags: req.body.tags, userName: req.user.username, userId: req.user._id})
	.save(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			User.findByIdAndUpdate(
				req.user._id,
				{$push: {mustaches: data._id}},
				function(err2, data2) {
					if (err2) {
						res.status(500).json(err2);
					} else {
						res.json(data2);
					}
				}
			)
		}
	})
}

exports.getMustache = function(req, res) {
	Mustache.find({$or: [{'name': req.params.text},
		{'tags': req.params.text}, {'userName': req.params.text}] },
		function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data)
		}
	})
}

exports.getMustacheById = function(req, res) {
	Mustache.findById(req.params.text,
		function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data)
		}
	})
}

exports.getAllMustaches = function(req, res) {
	Mustache.find({}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
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
			res.json(results);
		}
	})
}

exports.addLike = function(req, res) {
	Mustache.findByIdAndUpdate(req.params.id,
		{$push: {wins: new Date()}},
		function(err, data) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(data);
			}
		})
}

exports.changeHeart = function(req, res) {
	var addAHeart = true;
	Mustache.findById(req.params.id, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			for (var i = 0; i < data.hearts.length; i++) {
				if (data.hearts[i].toString() === req.user._id) {
					addAHeart = false;
					data.hearts.splice(i, 1);
					data.save(function(err) {
						if (err) {
							res.status(500).json(err);
						} else {
							res.send('it downhearted');
						}
					})
					i--;
				}
			}
			if (addAHeart === true) {
				data.hearts.push(mongoose.Types.ObjectId(req.user._id));
				data.save(function(err) {
					if (err) {
						res.status(500).json(err);
					} else {
						res.send('it uphearted');
					}
				})
			}
		}
	})

}

exports.newStatus = function(req, res) {
	User.findByIdAndUpdate(
		req.params.id,
		{$set: {status: req.body.text}},
		function(err, data) {
			if (err) {
				return res.status(500).json(err);
			} else {
				return res.json(data);
			}
		})
}

exports.newShoutout = function(req, res) {
	new Shoutout({
		text: req.body.text,
		by: req.body.sender,
		toId: req.params.id,
		byName: req.body.byName
	}).save(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			User.findByIdAndUpdate(
				data.toId,
				{$push: {inbox: data._id}},
				function(err2, data2) {
					if (err2) {
						res.status(500).json(err2);
					} else {
						res.json(data2)
					}
				})
		}
	})
}

exports.hasBeenRead = function(req, res) {
	Shoutout.findByIdAndUpdate(
		req.params.id,
		{$set: {read: true}},
		function(err, data) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(data);
			}
		})
}

module.exports = exports;