var fs = require("fs");
var express = require('express');
var app = express();
var path    = require("path");
var bodyParser = require('body-parser');  
var ejs = require('ejs');
var quizOverallId;

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {

	 var quiz = fs.readFileSync("data/quizOverall.json", 'utf8');
	 quiz = JSON.parse(quiz);
	 names = {titles: []};
	 for(var i = 0; i<quiz.length; i++){
	 	names.titles.push(quiz[i].title);
}
console.log(names);
res.render('index.ejs',names);

 app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/quizOverall/:id', function (req, res) {
	quizOverallId = req.params.id;
 var content = JSON.parse(fs.readFileSync("data/quizOverall.json", 'utf8'));

  res.send(content[quizOverallId]);
});


app.get('/edit', function (req, res) {
	var quiz = fs.readFileSync("data/quizOverall.json", 'utf8');
	 quiz = JSON.parse(quiz);
	 names = {titles: []};
	 for(var i = 0; i<quiz.length; i++){
	 	names.titles.push(quiz[i].title);
}
console.log(names);
res.render('edit.ejs',names);
 app.use(express.static(path.join(__dirname, 'public')));

});

app.get('/make', function (req, res) {
res.render('make.ejs');
 app.use(express.static(path.join(__dirname, 'public')));

});



app.put('/quizOverall', function(req, res) {

  var FULLQUIZpost = require('./data/quizOverall.json');

  console.log(req.body);

  FULLQUIZpost[req.body.id-1] = req.body;

  var FULLQUIZpoststring = JSON.stringify(FULLQUIZpost, null, 4);

  fs.writeFile('./data/quizOverall.json', FULLQUIZpoststring, function (err) {

  if (err) throw err;
  console.log('It\'s saved!');
  });

  res.send(FULLQUIZpost);
});

app.post('/quizOverall', function (req, res) {
  var FULLQUIZpost = require('./data/quizOverall.json');
  var QUIZTOBEADDEDpost = req.body;

  QUIZTOBEADDEDpost.id = FULLQUIZpost.length+1;

  FULLQUIZpost[QUIZTOBEADDEDpost.id-1] = QUIZTOBEADDEDpost;

  var FULLQUIZpoststring = JSON.stringify(FULLQUIZpost, null, 4);

  fs.writeFile('./data/quizOverall.json', FULLQUIZpoststring, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
  });
});

app.delete('/quizOverall/:id', function (req, res) {
	quizOverallId = req.params.id;
    var content = JSON.parse(fs.readFileSync("data/quizOverall.json", 'utf8'));
    content.splice(quizOverallId, 1);
    console.log(content);

    for(var i = quizOverallId; i<content.length;i++){
    	content[i].id=content[i].id-1;
    }
    
    var bod= JSON.stringify(content);
    fs.writeFileSync('data/QuizOverall.json', bod, 'utf8');
    res.send('deleted a quiz Quiz!');
});

app.listen(process.env.PORT || 3000);


