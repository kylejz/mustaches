var express = require('express');
	var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
	app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));
var mongoose = require('mongoose');
var User = require('./models/User.js')

var session = require('express-session'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

var fakeController = require('./fakeController.js');

//auth crap

app.use(session({
  secret: 'Is any path really less traveled by?',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '848484281887146',
    clientSecret: "2bfc1abed42a7d79a3317af730398c99",
    callbackURL: "http://poopoo.com:9001/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(User.findOrCreate());
    User.findOrCreate({ facebookId: profile.id, username: profile.name.givenName }, function (err, user) {
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  // console.log(11111, user)
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // console.log(22222, obj)
	done(null, obj);
});


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/#/splash', successRedirect: '/#/home' }));

//http methods
app.get('/api/userInfo', fakeController.getUserInfo); 
app.get('/api/user', fakeController.getUser);
app.post('/api/user', fakeController.createUser);
app.post('/api/mustache', fakeController.postMustache);
app.get('/api/mustache/:text?', fakeController.getMustache);
app.get('/api/1mustache', fakeController.getOneRandom);
app.get('/api/2mustache', fakeController.getTwoRandoms);
app.put('/api/win/:id', fakeController.addLike);
app.post('/api/hearts/:id', fakeController.changeHeart);

var port = 9001;
var mongoUri = 'mongodb://localhost:27017/fake-mustaches';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
	console.log('yes.');
});
app.listen(port, function() {
	console.log('Natalie ' + port + 'man');
})