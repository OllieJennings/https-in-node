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




// SSL ===============
// -key: this is our private server key
// - cert: our server cert
// -ca: accept requests signed by these ca's
var options = {
  key: fs.readFileSync('my-server.key.pem'),
  cert: fs.readFileSync('my-server.crt.pem'),
  ca: [ fs.readFileSync('my-private-root-ca.crt.pem') ] //self signed ca
};



// Routes ===============
app.get('/', function(req, res) {
  res.json({ msg: 'this is the server responding' });
});


// Server ====================
server = https.createServer(options, app).listen(3000, function() {
  port = server.address().port;
  console.log('Listening on https://127.0.0.1:' + port);
  console.log('Listening on https://' + server.address().address + ':' + port);
  console.log('Listening on https://local.ldsconnect.org:' + port);
});






