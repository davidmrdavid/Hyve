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


var saveWordFunc = function saveWord( socketJSON ){

	var wordToQuery = socketJSON["word"];
	console.log(wordToQuery);

	WORD_COUNT_MODEL
		.find({ word: wordToQuery })
		.exec( function(err, dataFound){
			console.log("request on the database son!");

			//if data was found, update count
			if(dataFound){
				console.log("old word");

				var newCount = dataFound["count"] + 1 ;

				WORD_COUNT_MODEL
					.update({ word: wordToQuery }, 
							{$set: { count: newCount }});
			}
			//If data was not found, insert
			else{
				console.log("new word");

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
