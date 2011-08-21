$(function()
{
    $.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=granfrase&count=20&callback=?', function(data)
    {
        var nTw = parseInt(Math.random()*19);
        var aQuote = data[nTw].text.split("\"");
        document.getElementById('blockquote').style.display = "block";
        document.getElementById('quote').innerHTML = aQuote[1];
        document.getElementById('author').innerHTML = aQuote[2];
    });
});

