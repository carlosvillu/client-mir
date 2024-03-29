exports.auth = function auth(req, res, next){
  if(req.session.user){
    next();
  } else {
    if(req.url.match(/signin|javascripts|stylesheets|images/)){
      next();
    } else {
      console.log('Require auth for: ' + req.url);
      res.redirect('/signin?redirect='+escape(req.url));
    }
  }
}

exports.checkAuth = function(user, pass){
  return user === pass;
}

