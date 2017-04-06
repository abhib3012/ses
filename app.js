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


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.post('/grade/', cors(corsOptions), function (req, res) {
	
  	
  	
  	//
  	
  	//Save answer for further queries
  	var logger = new answer({ answer: req.body.answer, grade: processedGrade });
  	
	logger.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('1');
	  }
	});
	
})

app.listen(80);