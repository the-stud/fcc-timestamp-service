// server.js
// where your node app starts

// init project
const express = require('express'),
      app = express(),
      moment = require('moment');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log('root');
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:timestamp", function (request, response) {
  const timestamp = request.params.timestamp,
        isNum = /^\d+$/.test(timestamp);
  
  if (isNum) {
    const naturalDate = moment.unix(timestamp).format("MMMM D, YYYY");
    response.end(respond(timestamp, naturalDate));
  } else if (moment(timestamp, "MMMM D, YYYY").isValid()) {
    const unixDate = moment(timestamp, "MMMM D, YYYY").unix();
    response.end(respond(unixDate, timestamp));
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function respond(unix, natural) {
  return JSON.stringify({
    unix: unix,
    natural: natural
  });
}