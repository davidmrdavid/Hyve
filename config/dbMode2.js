var mongoose  = require("mongoose");
var Schema    = mongoose.Schema;

var url="mongodb://hyvemindnotes:hyvemindnotes@ds031203.mongolab.com:31203/hyvemindnotes"
// mongoDB config
mongoose.connect(url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var classSchema = mongoose.Schema({
        className    :{type: String, default:"Class Name: "},
        createdAt: { type: Number, default: Date.now() },
        classId:String,
        time: Number
});



exports.Class = mongoose.model('Class',classSchema);








