//var R = require("r-script");
var jsonfile = require('jsonfile');
var babar = require('babar');
var loading = require('cartoon-loading');

var file = 'keywords.json';

var answers = [
  "Answer 1 : the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a by-product.",
  "Answer 2 : the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. Photosynthesis in plants and generates oxygen as a by-product.",
  "Answer 3 : the process by which other organisms use sunlight to synthesize nutrients from . Photosynthesis in plants generally involves the  and generates oxygen as a by-product.",
  "Answer 4 : synthesize nutrients from carbon dioxide and water. Photosynthesis in plants and generates oxygen as a by-product."
];

var globalScore = 0;
var totolScore = 19;

var score = [];

loading.start({
  /*
    In miliseconds
  */
  interval: 100, // Default 30
  /*
    default, black, red, green, yellow, blue, magenta, cyan, light_gray, dark_ray, light_red, light_green, light_yellow, light_blue, light_magenta, light_cyan, default_White
  */
  color: 'default',  // Default default
  bold: true,        // Default false
  underlined: false, // Default false
  /*
  Defaults names:
    newave, line, ball, fish, yoyo, song, dance, arrow, wave-01, wave-02
  */
  loading: 'wave-02' // Default newave :)
  // or:
});

//var globalJson;
jsonfile.readFile(file, function(err, obj) {
  //globalJson = obj;
  process(obj)
});

function process(obj) {
  for(var a = 0; a < answers.length; a++) {
    var answer = answers[a];
    //console.log(answer);

    //console.dir(obj['keywords']);
    for(var i = 0; i < 3; i++) {
      //console.log(obj["keywords"][i]);
      ///*
      var data = obj["keywords"][i];
      //console.log(data);
      for(var j = 0; j < data.length; j++) {
        //console.log(data.length);
        //console.log(obj['keywords'][i][j]);
        //console.log(data[i])
        var subdata = data[j];
        //console.log(subdata);
        //console.log(answer);
        if (answer.search(subdata) != -1) {
          //console.log ('contains');
          globalScore += (i+1)// * 0.1;
        } else {
          //console.log('not contain');
          //globalScore -= (i+1) //* 0.1;
        }
      //*/
      }
    }
    //console.log(globalScore/totolScore);
    score.push([(a+1), globalScore/totolScore]);
    globalScore = 0;
  }
  showme(score);
}

function showme(score) {
  //console.log(score);
  setTimeout( function () {
    loading.stop()
    score.push([(score.length + 1), 0])
    console.log(babar(score));
  }, 2000);
}
