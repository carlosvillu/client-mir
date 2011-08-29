var vows = require('vows');
var zombie = require("zombie");
var assert = require("assert");

var host = "localhost",
    port = "11468";

var testHelper = {
  url: function(){
    return 'http://'+host+':'+port+'/';
  }
}

vows.describe('Signin page').addBatch({
  'When try to go to home page without user in session':
  {
    topic: function(){
      zombie.visit(testHelper.url(), this.callback)
    },
    'Should go to Signin page': function (err, browser, status){
        if(err) throw err;
        assert.isNull(err);
        assert.equal(browser.text('title'), 'Signin');
    }
  }
}).export(module);

/**
// Load the page from localhost
zombie.visit("http://localhost:11468/", function (err, browser, status) {

  // Fill email, password and submit form
  browser.
    fill("user", "dead").
    fill("password", "dead").
    pressButton("Login", function(err, browser, status) {

      // Form submitted, new page loaded.
      assert.equal(browser.text("title"), "Signin");

    })

});
*/
