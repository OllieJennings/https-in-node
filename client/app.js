var https = require('https');
var fs = require('fs');
var express  = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var ejs = require('ejs')



// configuration =================
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));



// SSL =================
var options = {
  key: fs.readFileSync('my-client.key.pem'),
  cert: fs.readFileSync('my-client.crt.pem')
};


// Routes ==============
var reqOptions = {
  hostname: 'local.ldsconnect.org',
  port: 3000,
  path: '/',
  method: 'GET',
  ca: fs.readFileSync('my-private-root-ca.crt.pem')
};
options.agent = new https.Agent(reqOptions);

app.get('/', function(req, res) {
  var request = https.get(reqOptions, function(response) {
    console.log('Got a response');
    response.on('data', function(d) {
      res.render('view', d);
    });
  });
});



// Server =============
server = https.createServer(options, app).listen(3004, function() {
  port = server.address().port;
  console.log('Listening on https://127.0.0.1:' + port);
  console.log('Listening on https://' + server.address().address + ':' + port);
  console.log('Listening on https://local.ldsconnect.org:' + port);
});






