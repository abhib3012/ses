//var R = require("r-script");
var jsonfile = require('jsonfile');

var file = 'keywords.json';

var answer = "the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a by-product.";

var globalScore = 0;

jsonfile.readFile(file, function(err, obj) {
  //console.dir(obj['keywords']);
  for(var i = 0; i < 3; i++) {
    //console.log(obj["keywords"][i]);
    ///*
    for(var j = 0; j < obj["keywords"][i].length; j++)
      //console.log(obj['keywords'][i][j]);
      if (answer.search(obj['keywords'][i][j]) != -1) {
        //console.log ('contains');
        globalScore += (i+1) * 0.1;
      } else {
        //console.log('not contain');
        globalScore -= (i+1) * 0.1;
      }
    //*/
  }
  console.log(globalScore);
});
