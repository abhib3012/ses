var express = require('express');
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');

mongoose.connect('mongodb://localhost/ses');


var answer = mongoose.model('answers', 
	{
		answer: String,
		grade: Number
	}
);

var app = express();
var cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

	    
var totalScore = 0;
var globalScore = 0;
		
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.post('/grade/', cors(corsOptions), function (req, res) {
	
	totalScore = 0;
	globalScore = 0;
	var file = 'keywords.json';
	
  	// Process
  	jsonfile.readFile(file, function(err, obj) {
	  	
	    //console.dir(obj['keywords']);
	    for(var i = 0; i < 3; i++) {
	      //console.log(obj["keywords"][i]);
	      ///*
	      var data = obj["keywords"][i];
	      //console.log(data);
	      for(var j = 0; j < data.length; j++) {

	        var subdata = data[j];
	        totalScore += (i+1);
	        if (req.body.answer.search(subdata) != -1) {
	          globalScore += (i+1);
	        } else {
	          //console.log('not contain');
	        }
	      }
	     }
	    //console.log(globalScore/totolScore);
	    globalScore = globalScore/totalScore;
	    res.send({score: globalScore});
	    
		//Save answer for further queries
	  	var logger = new answer({ answer: req.body.answer, grade: globalScore });
	  	
		logger.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    //console.log('1');
		  }
		});
	
	});
	
});

app.get('/', cors(corsOptions), function (req, res) {
	res.send('Hello world');
});

app.listen(80);