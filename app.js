
/**
 * Module dependencies.
 */

var fbId= "205757722814263";              // provided by facebook          
var fbSecret= "9410dd448093b71f10bd0973c9336de9";          // provided by facebook
var fbCallbackAddress= "http://mir.nodester.com/signin"; // this could point to your /signin page
var cookieSecret = "f633b6b572501bfde4077d0e2ce0c2ea";     // enter a random hash for security

var express = require('express');
var auth= require('connect-auth');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: cookieSecret}));
  app.use(auth( [
    auth.Facebook({appId : fbId, appSecret: fbSecret, scope: "email", callback: fbCallbackAddress})
  ]) );
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express',
    fbCallBack: escape("http://mir.nodester.com/signin")
  });
});

// Method to handle a sign-in with a specified method type, and a url to go back to ...
app.get('/signin', function(req,res) {
  req.authenticate([req.param('method')], function(error, authenticated) { 
    if(authenticated ) {
      res.end("<html><h1>Hello Facebook user:" + JSON.stringify( req.getAuthDetails() ) + ".</h1></html>")
    }
    else {
      res.end("<html><h1>Facebook authentication failed :( </h1></html>")
    }
   });
});

// Route for some arbirtrary page, that contains a sign-in link
app.get('/somepage', function(req, res){
  var sign_in_link= "/signin?method=facebook&redirectUrl=" + escape(req.url);
  if( req.isAuthenticated() ) {
    res.end('<html><body><h1>Signed in with Facebook</h1></body></html>')
  }
  else {
    res.end('<html><body><a href="'+ sign_in_link + '">Sign in with Facebook</a></body></html>')
  }
});


app.listen(11468);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
