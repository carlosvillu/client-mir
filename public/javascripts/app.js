(function($, window){
  var oScriptToLoad = {
    signin: ['javascripts/utils/quote.js']
  }
  window.yepnope({load: oScriptToLoad[document.body.getAttribute("id")]});
})(jQuery, window);
