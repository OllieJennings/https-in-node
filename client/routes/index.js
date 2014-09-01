module.exports = function(app, https, fs) {

  var options = {
    hostname: 'local.ldsconnect.org',
    port: 3000,
    path: '/',
    method: 'GET',
    ca: fs.readFileSync('my-private-root-ca.crt.pem')
  };
  options.agent = new https.Agent(options);

  app.get('/', function(req, res) {
    var request = https.get(options, function(response) {
      console.log('Got a response');
      response.on('data', function(d) {
        process.stdout.write(d);
      });
    });
    res.render('app');
  });
};
