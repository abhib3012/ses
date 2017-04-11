var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ses');

var keyword = mongoose.model('keywords', 
	{
		question: String,
		priority: Number,
		key: String
	}
);

var key = new keyword({ 
	question: "schizophrenia",
	priority: 2,
	key: "genetic"
});

key.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});