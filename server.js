var fs = require("fs");
var express = require('express');
var app = express();
var path    = require("path");
var bodyParser = require('body-parser');  

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/quiz', function (req, res) {
 //res.sendFile(path.join(__dirname + '/data/quiz.json'));
  var content = fs.readFileSync("data/quiz.json", 'utf8');
  res.send(content);
});

app.post('/quiz', function (req, res) {
  	console.log(req.body);
var quizcontent = JSON.stringify(req.body);
  	console.log(quizcontent);

 fs.writeFileSync('data/quiz.json', quizcontent);
});

app.listen(process.env.PORT || 3000);

//app.listen(4000); 

