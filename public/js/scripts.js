/*
Author: Matt Armstrong
Name: Random Quiz 
Comments: 
Phase I: Was an extremely fulfilling and fun project to work on. It was difficult at times because lots of the 
subject matter was new and javascript can sometimes load/work with different outcomes than expected. 
All in all was a very fun project and I learned a lot about javascript.
Phase II: This was one of the hardest computer science projects I have done to date but that makes the experience
all the more fulfilling when you discover how to do something. I really enjoyed every step of this project and am
looking forward to phase III!
*/

document.getElementById("quizform").style.visibility = "hidden";
document.getElementById("button").style.visibility = "hidden";
var button = document.getElementById("submit"); 
var next = document.getElementById("nextButton"); 
var back = document.getElementById("backButton"); 
var return1 = document.getElementById("returnButton");   


button.addEventListener("click", loadQuiz); //when submit is clicked on name page
next.addEventListener("click", nextQuestion); //when next button is clicked
back.addEventListener("click", backQuestion); //when back button is clicked
return1.addEventListener("click", returnQuestion); //when return to beggining button is clicked

var count = 0;
var correct = 0;
var incorrect = 0;
var accounts = [];
var answer = [];
var isItCorrect = [];
var quiz;





function loadQuiz(){
    $.get("/quiz", function(data, status){
        quiz = JSON.parse(data);
        generateQuestion();
 });
 }//loads the json file from data



function generateQuestion(){   
    var x = document.getElementById("nameform");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value + "<br>";
    }//remembers imput name
    document.getElementById("Name").innerHTML = "Hello "+text+" good luck on the quiz!!";//uses imput name
    document.getElementById("nextButton").innerHTML = "Next";
    document.getElementById("backButton").style.visibility = "hidden";
    document.getElementById("quizform").style.visibility = "visible";
    document.getElementById("button").style.visibility = "visible";
    document.getElementById("images").style.visibility = "visible";
    document.getElementById("name_display").style.visibility = "visible";
    document.getElementById("nameoverall").style.visibility = "hidden";
    document.getElementById("nameform").style.visibility = "hidden";
    document.getElementById("question").innerHTML = quiz.questions[0].text;
for(var i=1;i<=quiz.questions[count].answers.length;i++){
        document.getElementById("c"+i+"1").innerHTML = quiz.questions[count].answers[i-1];
        document.getElementById("c"+i).style.visibility = "visible";
        document.getElementById("c"+i+"1").style.visibility = "visible";
}//writing the questions of the first question
for(var i=5;i>quiz.questions[count].answers.length;i--){
       document.getElementById("c"+i).style.visibility = "hidden";
   document.getElementById("c"+i+"1").style.visibility = "hidden";
}//hiding buttons when there are less then 5 answers


$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: String(quiz.questions[0].meta_tags),
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.items, function(i,item){
      $("<img />").attr("src", item.media.m).appendTo("#images");
      if ( i == 0 ) return false;
    });
  });//gets photo for first question



  for (var i = 0; i <quiz.questions.length; i++) {
      accounts[i] = " ";
  }
  return accounts;//array that records which button is selected

  for (var i = 0; i <quiz.questions.length; i++) {
      answer[i] = " ";
  }
  return answer;//returning the array that will add up correct and incorrect answers


for (var i = 0; i <quiz.questions.length; i++) {
      isItCorrect[i] = " ";
  }
  return isItCorrect;//writes inccorecly or correctly for results page


}//generating first question


function nextQuestion(){
if(document.getElementById("c1").checked == true || document.getElementById("c2").checked == true || document.getElementById("c3").checked == true || document.getElementById("c4").checked == true || document.getElementById("c5").checked == true){
    if(count!=quiz.questions.length-1){
        if(count==quiz.questions.length-2){
            document.getElementById("nextButton").innerHTML = "Submit";
        }//at last question next button becomes submit
        else{
        document.getElementById("nextButton").innerHTML = "Next";

        }

        count++;

        if(count==0){
        document.getElementById("backButton").style.visibility = "hidden";
        }//at first spot you cant see back button
        else{
        document.getElementById("backButton").style.visibility = "visible";
        }


for(var i=1;i<=quiz.questions[count].answers.length;i++){
            document.getElementById("c"+i).style.visibility = "visible";
            document.getElementById("c"+i+"1").style.visibility = "visible";
    if(document.getElementById("c"+i).checked == true){
        if(quiz.questions[count-1].answers[i-1] == quiz.questions[count-1].correct_answer){
        answer[count-1] = quiz.questions[count-1].answers[i-1];
        }//if answer selected is the correct answer then add it to the array

        else{
            }

            accounts[count-1] = "c"+i; // set the account array spot to the selected button
    }


   

    document.getElementById("c"+i).checked = false;
}

    document.getElementById("question").innerHTML = quiz.questions[count].text; //write the question

for(var i=1;i<=quiz.questions[count].answers.length;i++){
    document.getElementById("c"+i+"1").innerHTML = quiz.questions[count].answers[i-1];
    }//write the answers for the question

for(var i=5;i>quiz.questions[count].answers.length;i--){
    document.getElementById("c"+i).style.visibility = "hidden";
    document.getElementById("c"+i+"1").style.visibility = "hidden";
}//hiding buttons when there are less then 5 answers


document.getElementById("images").innerHTML = "";
 $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: String(quiz.questions[count].meta_tags),
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.items, function(i,item){
      $("<img />").attr("src", item.media.m).appendTo("#images");
      if ( i == 0 ) return false;
    });
  });


document.getElementById(accounts[count]).checked = true;

}//before one hits the submit button
    else {

    for(var i=1;i<=quiz.questions[count].answers.length;i++){
    if(document.getElementById("c"+i).checked == true){
        if(quiz.questions[count].answers[i-1] == quiz.questions[count].correct_answer){
        answer[count] = quiz.questions[count].answers[i-1];
        }//last question's button selected equals correct answer

        else{
            }

            accounts[count] = "c"+i;
            
    }
}


for (var i = 0; i <quiz.questions.length; i++) {
    if(answer[i] == quiz.questions[i].correct_answer){
    correct++;
    quiz.questions[i].global_correct++;
    quiz.questions[i].global_total++;
    isItCorrect[i]= "correctly";
    }//adds up correct answers      

    else{
        incorrect++
        quiz.questions[i].global_total++;
        isItCorrect[i]= "incorrectly";

    }//adds up incorrect answers
}



       var stuffToSend = JSON.stringify(quiz); //Array 
       console.log(stuffToSend);
    $.ajax({
        url : "/quiz",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data : stuffToSend
    });


document.getElementById("images").innerHTML = "";
document.getElementById("images").style.visibility = "hidden";
document.getElementById("quizform").style.visibility = "hidden";
document.getElementById("c1").style.visibility = "hidden";
document.getElementById("c2").style.visibility = "hidden";
document.getElementById("c3").style.visibility = "hidden";
document.getElementById("c4").style.visibility = "hidden";
document.getElementById("c5").style.visibility = "hidden";
document.getElementById("c11").style.visibility = "hidden";
document.getElementById("c21").style.visibility = "hidden";
document.getElementById("c31").style.visibility = "hidden";
document.getElementById("c41").style.visibility = "hidden";
document.getElementById("c51").style.visibility = "hidden";
document.getElementById("name_display").style.visibility = "hidden";
document.getElementById("button").style.visibility = "hidden";
document.getElementById("backButton").style.visibility = "hidden";
document.getElementById("resultsfrm").style.visibility = "visible";
document.getElementById("piechart").style.visibility = "visible";
document.getElementById("myTable").style.visibility = "visible";

var table = document.getElementById("myTable");
var cell1;
var cell2;
for(var i=quiz.questions.length-1; i>=0; i-=2){
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var y = "";
    var z = "";

    if(isItCorrect[i] == "correctly"){
        z= "! :)"
    }
    else{
        z= ". :("
    }
    if(isItCorrect[i-1] == "correctly"){
        y= "! :)"
    }
    else{
        y= ". :("
    }

    cell1.innerHTML = "Question " + i + ":  "  + (100*(quiz.questions[i-1].global_correct/quiz.questions[i-1].global_total)).toFixed(2) + "% of other players got this correct. You answered this question " + isItCorrect[i-1] + y;
    cell2.innerHTML = "Question " + (i+1) + ":  "  + (100*(quiz.questions[i].global_correct/quiz.questions[i].global_total)).toFixed(2) + "% of other players got this correct. You answered this question " + isItCorrect[i] + z;
}


document.getElementById("ratio").innerHTML = "Incorrect: " + incorrect + "  Correct: " + correct + "  Incorrect/Correct: = " + incorrect/correct;   
 piChart();
}//after the submit button is hit
}//as long as a button is selected
}




function piChart(){
var canvas = document.getElementById("piechart");
var chart = canvas.getContext("2d");
var end = 0;
var correctIncorrect = [(correct/quiz.questions.length), ((incorrect)/quiz.questions.length)]; 
var total = 0; 
var pieColor = ['darkviolet', 'magenta']; 
var labels = ["Correct", "Incorrect"];

for (var e = 0; e < correctIncorrect.length; e++) {
  total += correctIncorrect[e];
}

for (var i = 0; i < correctIncorrect.length; i++) {
  chart.fillStyle = pieColor[i];
  chart.beginPath();
  chart.moveTo(canvas.width / 2, canvas.height / 2);
  chart.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, end, end + (Math.PI * 2 * (correctIncorrect[i] / total)), false);
  chart.lineTo(canvas.width / 2, canvas.height / 2);
  chart.fill(); 
    var endAngle = end + (Math.PI*(correctIncorrect[i]/quiz.questions.length));  
    end += Math.PI * 2 * (correctIncorrect[i] / total);
}//help from http://stackoverflow.com/questions/6995797/html5-canvas-pie-chart 
}




function backQuestion(){
if(count==0){
for(var i=5;i>quiz.questions[count].answers.length;i--){
            document.getElementById("c"+i).style.visibility = "hidden";
    document.getElementById("c"+i+"1").style.visibility = "hidden";
}//if there are less than 5 answers spots get hidden

    }
    else{
count--;

if(count==0){
        document.getElementById("backButton").style.visibility = "hidden";
        }//back button hidden on first page
        else{
        document.getElementById("backButton").style.visibility = "visible";
        }

        document.getElementById("nextButton").innerHTML = "Next";

for(var i=1;i<=quiz.questions[count].answers.length;i++){

document.getElementById("c"+i).style.visibility = "visible";
            document.getElementById("c"+i+"1").style.visibility = "visible";
    document.getElementById("c"+i+"1").innerHTML = quiz.questions[count].answers[i-1];
}//writes answer choices for each question

    document.getElementById("question").innerHTML = quiz.questions[count].text; //writes question


    for(var i=5;i>quiz.questions[count].answers.length;i--){
    document.getElementById("c"+i).style.visibility = "hidden";
    document.getElementById("c"+i+"1").style.visibility = "hidden";
}//hides answers when there are less than 5 answer choices
    document.getElementById(accounts[count]).checked = true;//makes sure button stays selected

}

document.getElementById("images").innerHTML = "";
 $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: String(quiz.questions[count].meta_tags),
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.items, function(i,item){
      $("<img />").attr("src", item.media.m).appendTo("#images");
      if ( i == 0 ) return false;
    });
  });

}


function returnQuestion(){
    incorrect = 0;
    correct = 0;
    count = 0;
    var accounts = [];
    var answer = [];
    var isItCorrect = [];
    var quiz;

    document.getElementById("myTable").innerHTML= "";
    document.getElementById("resultsfrm").style.visibility = "hidden";
    document.getElementById("quizform").style.visibility = "hidden";
    document.getElementById("button").style.visibility = "hidden";
    document.getElementById("piechart").style.visibility = "hidden";
    document.getElementById("myTable").style.visibility = "hidden";
    document.getElementById("table").style.visibility = "hidden";
    document.getElementById("nameoverall").style.visibility = "visible";
    document.getElementById("nameform").style.visibility = "visible";
}//sets everything to default and returns back to first page


document.getElementById("resultsfrm").style.visibility = "hidden";



