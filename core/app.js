var express = require('express');
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var request = require('request');
var reontology = require('re-ontology');

mongoose.connect('mongodb://localhost/ses');

//let Wit = null;
//let interactive = null;


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
	
	answer = req.body.answer;
	
	var options = {
	  url: 'https://api.wit.ai/message?v=20170408&q=' + answer,
	  headers: {
	    'Authorization': 'Bearer E3GDZKK7S5EI3NC6JWIVOO2IXGP53UHI'
	  }
	};
	
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var info = JSON.parse(body);
	    if(info['entities'].father && info['entities'].intent[0].value == "answer") {
	    	answer = info['entities'].father[0].value;
	    	
	    	reontology.db.getSystem('people', function(result){
			    people = result;
			    if(people.subTypeMap.Male.subTypeMap.Robert.description.father == answer) {
				    res.send({"score": "Correct"});
			    }
			    else {
				    res.send({"score": "Incorrect"});
			    } 
			});
	    }
	    else {
		    res.send({ 'errorInfo': 'No data on this subject :/', 'score' : '-1'});
	    }
	  }
	}
	 
	request(options, callback);
	
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
	    if(info['entities'].subject) {
		    
		    answer.findOne()
			    //.where({field1: 1})
			    .sort('-grade')
			    .exec(function(err, doc)
			    {
				    //console.log(doc.answer)
				    res.send({'subject': info['entities'].subject[0].value, 'definition': doc.answer.charAt(0).toUpperCase() + doc.answer.slice(1)});
			        //var max = doc.LAST_MOD;
			        // ...
			    }
			);

	    	
	    }
	    else {
		    res.send({ 'subject': 'No data on this subject :/', 'definition' : '0'});
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