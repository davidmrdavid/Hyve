module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });
  app.get('/liz',function(req,res){
    res.sendfile('./public/liz.html');
  });
  app.get('/liz2',function(req,res){
    res.sendfile('./public/liz2.html');
  });
};