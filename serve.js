var express = require('express');
  var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var secrets = require('./facebook-auth/secrets.js');
var config = require('./config.js');

var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var AWS = require('aws-sdk'),
    fs = require('fs'),
    multer = require('multer');

var fakeController = require('./controllers/fakeController.js');

//auth crap

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(bodyParser.json(), express.static(__dirname + '/public'));
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
app.use(cors())

passport.use(new FacebookStrategy({
    clientID: secrets.facebookAuth.clientID,
    clientSecret: secrets.facebookAuth.clientSecret,
    callbackURL: secrets.facebookAuth.callbackURL,
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id}, function (err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.facebookId = profile.id;
        newUser.username = profile.name.givenName;

        newUser.save(function(err) {
          if (err)
            throw err;

          return done(null, newUser);
        })
      }
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/splash' }),
  function(req, res) {
    res.redirect('/#/home');
  });

// uploading images, etc

AWS.config.loadFromPath('./aws/credentials.json');

var photoBucket = new AWS.S3({params: {Bucket: 'mustaches'}});

function uploadToS3(file, mimetype, callback) {
  photoBucket
    .upload({
      ACL: 'public-read',
      Body: fs.createReadStream(file.path),
      Key: file.name,
      ContentType: mimetype
    })
    .send(callback);
}



//http methods

app.get('/api/userInfo', fakeController.getUserInfo); 
app.get('/api/user', fakeController.getUser);
app.post('/api/mustache', fakeController.postMustache);
app.get('/api/mustache/:text?', fakeController.getMustache);
app.get('/api/mustache-by-id/:text', fakeController.getMustacheById);
app.get('/api/1mustache', fakeController.getOneRandom);
app.get('/api/2mustache', fakeController.getTwoRandoms);
app.get('/api/all', fakeController.getAllMustaches);
app.put('/api/win/:id', fakeController.addLike);
app.post('/api/hearts/:id', fakeController.changeHeart);
app.post('/api/status/:id', fakeController.newStatus);
app.post('/api/shoutout/:id', fakeController.newShoutout);
app.get('/api/inbox/:id', fakeController.getUserInbox);
app.put('/api/inbox/:id', fakeController.hasBeenRead);
app.post('/api/submit_form', multer({limits: {fileSize: 10*1024*1024}}), function(req, res) {
  console.log(req.files, req.user);
  if (!req.files || !req.files.mustachePicture) {
    return res.status(403).send('where is the effing picture').end();
  }
  var file = req.files.mustachePicture;
  var mimetype = req.files.mustachePicture.mimetype;
  if (!/^image\/(jpe?g|png|gif)$/i.test(mimetype)) {
    return res.status(403).send('wrong effing type').end();
  }
  uploadToS3(file, mimetype, function(err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(data.Location.slice(45));
      res.redirect('/#/uploads/' + data.Location.slice(45));
    }
  })
})

var port = config.portNum;
var mongoUri = 'mongodb://localhost:27017/fake-mustaches';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
	console.log('yes.');
});
app.listen(port, function() {
	// console.log('Natalie ' + port + 'man');
})
