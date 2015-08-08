var mongoose  = require("mongoose");
var Schema    = mongoose.Schema;

var url="mongodb://hyvemindnotes:hyvemindnotes@ds031203.mongolab.com:31203/hyvemindnotes"
// mongoDB config
mongoose.connect(url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var studentSchema = mongoose.Schema({
        local            : {
            email        : String,
            password     : String,
        },
        facebook         : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        },
        google           : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        },
        studentName    :{type: String, default:"Student Name: "},
        createdAt: { type: Number, default: Date.now() },
        classId:String,
        word:String,
        time: Number
});



exports.Student = mongoose.model('Student',studentSchema);








