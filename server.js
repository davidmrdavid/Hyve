// modules =================================================
var express        = require('express.io');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// web sockets =============================================
app.http().io();
app.io.route('ready', function(req) {
    app.io.broadcast('new visitor');
    console.log('user connected');
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var Student=require('./config/dbMode.js').Student;
var Class=require('./config/dbMode.js').Class;
var Teacher=require('./config/dbMode.js').Teacher;

var Bla= new Student({
  studentName:"Joe"
});
Bla.save(function(err,data){
  if(err) return console.log(err);
  console.log(data);
});

// start app ===============================================
app.listen(port);
exports = module.exports = app; 						// expose app