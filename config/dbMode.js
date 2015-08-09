var mongoose  = require("mongoose");
var Schema    = mongoose.Schema;

var url="mongodb://hyvemindnotes:hyvemindnotes@ds031203.mongolab.com:31203/hyvemindnotes"
// in terminal: 
//mongo ds031203.mongolab.com:31203/hyvemindnotes -u hyvemindnotes -p hyvemindnotes

mongoose.connect(url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var wordSchema = mongoose.Schema({
        word: String,
        time: Date,
        count: Number
});


var teacherSchema = mongoose.Schema({
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
        teacherName    :{type: String, default:"Teacher Name: "},
        createdAt: { type: Number, default: Date.now() },
        classId:String,
        word:String,
        time: Number
});

var classSchema = mongoose.Schema({
        className    :{type: String, default:"Class Name: "},
        createdAt: { type: Number, default: Date.now() },
        classId:String,
        time: Number
});

var masterWordSchema = mongoose.Schema({
        hashMap : String
})

exports.MasterCount = mongoose.model('MasterCount', masterWordSchema);
exports.Class = mongoose.model('Class',classSchema);
exports.Teacher = mongoose.model('Teacher',teacherSchema);
exports.Words = mongoose.model('Words',wordSchema);








