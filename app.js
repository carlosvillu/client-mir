/**
 * Module dependencies.
 */
var express = require('express');
var auth = require('./auth');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'd88741c523de55929e5fdd920316b3c2'}));
  app.use(auth.auth);
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
    title: 'Exámenes MIR'
  });
});

app.get('/signin', function(req, res){
  res.render('signin', {
    title: 'Signin',
    redirect: req.query.redirect || '/'
  });
  console.log(req.query);
});


app.post('/signin', function(req, res){
  if(auth.checkAuth(req.body.user, req.body.password)){
    req.session.user = req.body.user;
    res.redirect(req.body.redirect);
  }else{
    res.redirect('/signin?redirect='+escape(req.body.redirect));
  }
});

app.listen(11468);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
