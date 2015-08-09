// START VARIABLE DECLARATION ...

// MODULE DEPENDENCIES
var mongoose = require('mongoose'   );
var models   = require('../config/dbMode.js');


// CONSTANT VARIABLES: DONT CHANGE IN RUNTIME
var DB_QUERY_INTERVAL   = 5000; 
var MAX_TOP_WORDS       = 20;

var MASTER_COUNT_MODEL  = models.MasterCount;
var WORD_COUNT_MODEL    = models.Words;

// OTHER GLOBAL VARIABLES
var foundData    = new Object();
var allWordsHash = new Object();

WORD_COUNT_MODEL
	.find()
	.remove()
	.exec();

var saveWordFunc = function saveWord( socketJSON ){

	var wordToQuery = socketJSON["word"];
	console.log(wordToQuery);

	WORD_COUNT_MODEL.find().exec(function(err,data){
		console.log(data);
	});

	WORD_COUNT_MODEL
		.find({ word: wordToQuery })
		.exec( function(err, dataFound){
			//if data was found, update count
			if(dataFound.length){
				var id = dataFound[0]["_id"];
				console.log(id);
				var newCount = dataFound[0]["count"] + 1;

				WORD_COUNT_MODEL
					.update({ _id : id }, { $set: { count: newCount }});
			//If data was not found, insert
		}
			else{
				socketJSON["count"] = 1;

				var newEntry = new WORD_COUNT_MODEL( socketJSON );
				newEntry.save(function(err, data){
					console.log("just saved this mom");
					console.log(data);
				});
			}

		} )	
}

var getTrendingWordsFunc = function getTrendingWords(){

	WORD_COUNT_MODEL
		.find()
		.sort({ count: 1 }) //sort ascendingly
		.limit( MAX_TOP_WORDS )
		.exec( function(err, data){
			updateProfDashborad( data )
		} )
}

function updateProfDashborad( data ){
	//socket.io stuff
}


//defining public funcitons
exports.saveWord         = saveWordFunc;
exports.getTrendingWords = saveWordFunc;
