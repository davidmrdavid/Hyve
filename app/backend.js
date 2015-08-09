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

	WORD_COUNT_MODEL
		.findOne({ word: wordToQuery }, function(err, dataFound){
			//if data was found, update count
			if(dataFound){
				var newCount = dataFound["count"] + 1;
				dataFound["count"] = newCount;
				dataFound.save(function(err,data){});
			//If data was not found, insert
			}
			else{
				socketJSON["count"] = 1;

				var newEntry = new WORD_COUNT_MODEL( socketJSON );
				newEntry.save(function(err, data){});
			}

		});
}

var getTrendingWordsFunc = function getTrendingWords(req){
	var returnMe;
	returnMe = WORD_COUNT_MODEL
		.find()
		.exec(function(err, data){
			req.io.respond(data);
		});
};

function updateProfDashborad( data ){
	//socket.io stuff
}


//defining public funcitons
exports.saveWord         = saveWordFunc;
exports.getTrendingWords = getTrendingWordsFunc;
