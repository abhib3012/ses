var express = require('express');
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var request = require('request');

mongoose.connect('mongodb://localhost/ses');

//let Wit = null;
//let interactive = null;

Wit = require('node-wit').Wit;
interactive = require('node-wit').interactive;

var answer = mongoose.model('answers', 
	{
		answer: String,
		grade: Number,
		question: String
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
	  	var logger = new answer({ answer: req.body.answer, grade: globalScore, question: 'photosynthesis' });
	  	
		logger.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    //console.log('1');
		  }
		});
	
	});
	
});

app.post('/ask/', cors(corsOptions), function (req, res) {
	
	var question =  req.body.question;
	var options = {
	  url: 'https://api.wit.ai/message?v=20170408&q=' + question,
	  headers: {
	    'Authorization': 'Bearer E3GDZKK7S5EI3NC6JWIVOO2IXGP53UHI'
	  }
	};
	 
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var info = JSON.parse(body);
	    //console.log(info['entities'].subject[0].value);
	    //console.log(info['entities'].intent[0].value);
	    if(info['entities']) {
		    
		    answer.findOne()
			    //.where({field1: 1})
			    .sort('-grade')
			    .exec(function(err, doc)
			    {
				    //console.log(doc.answer)
				    res.send({'subject': info['entities'].subject[0].value, 'definition': doc.answer});
			        //var max = doc.LAST_MOD;
			        // ...
			    }
			);

	    	
	    }
	    else {
		    res.send({ 'subject': 'No data on this subject :/', 'definition' : ' '});
	    }
	    //console.log(info.stargazers_count + " Stars");
	    //console.log(info.forks_count + " Forks");
	  }
	}
	 
	request(options, callback);
});

app.post('/', cors(corsOptions), function (req, res) {
	//
});

app.get('/', cors(corsOptions), function (req, res) {
	res.sendfile('static/index.html');
});

app.listen(80);