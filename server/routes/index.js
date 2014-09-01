module.exports = function(app) {



  app.get('/', function(req, res) {
    res.json({ msg: 'this is the server responding' });
  });


};
