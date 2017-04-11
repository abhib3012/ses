<<<<<<< HEAD
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
=======
var reontology = require('re-ontology');
//console.log(reontology)
var people = new reontology.Type({
	name: "Person",
	features: {
		Type: "Human"
	}
})
var men = people.addSubType({
	name: 'Male',
	features: {
		Gender: 'Male'
	}
})
var women = people.addSubType({
	name: 'Female',
	features: {
		Gender: 'Female'
	}
})
men.addInstance({
	name: 'Robert',
	description: {
		father: 'James',
		mother: 'Gladice',
		sons: ['Eric'],
		daughters: ['Susan', 'Carol', 'Annabelle']
	}
})
men.addInstance({
	name: 'Eric',
	description: {
		father: 'Robert',
		mother: 'Sylvia',
		sons: ['James', 'Wendell'],
		daughters: ['Emily']
	}
})
women.addInstance({
	name: 'Susan',
	description: {
		father: 'Robert',
		mother: 'Sylvia',
		sons: null,
		daughters: null
	}
})
women.addInstance({
	name: 'Samanthat',
	description: {
		father: 'Adam',
		mother: 'Beth',
		sons: null,
		daughters: null
	}
})
people.createTable('people').then(function() {
	people.save();
});
console.log(people.viewInstance('Male'))
console.log(people.viewInstance('Female'))
>>>>>>> 166c98ff7c52b8dfd0408967903a7f4f46db736e
