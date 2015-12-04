document.getElementById("editer").style.visibility = "hidden";

var select = document.getElementById("Buttonselect"); 
select.addEventListener("click", editQuiz); //when select is clicked on edit page

var quiz;
var idThing;




  function editQuiz(){

for(var i=0; i<document.getElementById("dd").length; i++) {
if(document.getElementById("dd")[i].selected == true){
  idThing = i;
  break;
}
}

    $.get("/quizOverall/"+idThing, function(data, status){
        quiz = data;
        generateEdit();
 });
    console.log(quiz);

  }


function generateEdit(){
document.getElementById("editer").style.visibility = "visible";

    var counteredit = 0;
   
            $("#editer").empty(); //clears the editer HTML div so i can make new stuff in it
            $("#editer").append("<div id='editquiz'>"); //making a dynamic div
            $("#editquiz").append("<form id='editquiz' class='editQuiz'>");  
            $(".editQuiz").append('<div<label for="title">Title</label><div><input type="text" id="title" name="title" value="' + quiz.title + '"placeholder="Title"></div></div>');
            $(".editQuiz").append('<div<label for="description">Description</label><div><textarea rows="2" id="description" name="description" placeholder="Description">' + quiz.description + '</textarea></div></div>');

            $(".editQuiz").append('<div class="form-group-meta-tags-quiz"><label for="meta_tags">Meta_tags</label><div><input type="text" id="meta_tags" name="meta_tags[]" value="' + quiz.meta_tags[0] + '"placeholder="Meta_tag"></div><a><button id="addmetatagstoquiz" type="button"><i></i></button></a></div>');
            for (var metatagsforquiz = 1; metatagsforquiz < quiz.meta_tags.length; metatagsforquiz++){
            $(".form-group-meta-tags-quiz").append('<div class="col-sm-offset-2 col-sm-8"><input type="text" class="form-control" id="meta_tags" name="meta_tags[]" value="' + quiz.meta_tags[metatagsforquiz] + '" placeholder="Answer Choice"></div>');
            }
            $(".editQuiz").append('<div><label for="difficulty">Difficulty</label><div><input type="text" id="difficulty" name="difficulty" value="' + quiz.difficulty + '" placeholder="Difficulty, from 1-20"></div></div>');

            for (var y = 0; y < quiz.questions.length; y++){
            $(".editQuiz").append('<hr>');
            $(".editQuiz").append('<h4>Question ' + (y+1) + '</h4>');
            $(".editQuiz").append('<div><label for="question' + (y+1) + '">Text </label><div><input type="text"id="text' + (y+1) + '" name="questions[' + y + '][text]" value="' + quiz.questions[y].text + '" placeholder="Text"></div></div>');

            $(".editQuiz").append('<div id="question' + y + '" alt="' + y + '"><label for="answerchoice' + (y+1) + '"">Answer Choices</label><div><input type="text" id="answerchoice' + (y+1) + '" name="questions[' + y + '][answers][]" value="' + quiz.questions[y].answers[0] + '" placeholder="Answer Choice"></div><a><button id="addchoicestoquestionedit" type="button"><i></i></button></a></div>');
            for (var questionsforquiz = 1; questionsforquiz < quiz.questions[y].answers.length; questionsforquiz++){
            $("#question" + y).append('<div><input type="text" id="meta_tags" name="questions[' + $("#question" + y).attr("alt") + '][answers][]" value="' + quiz.questions[y].answers[questionsforquiz] + '" placeholder="Answer Choice"></div>');
            }

            $(".editQuiz").append('<div><label for="correctanswer' + (y+1) + '">Correct Answer</label><div><input type="text" id="correctanswer' + (y+1) + '" name="questions[' + y + '][correct_answer]" value="' + quiz.questions[y].correct_answer + '" placeholder="Correct Answer (# of the array spot; i.e 0,1,2,3...)"></div></div>');

            $(".editQuiz").append('<div id="metatagforquestion' + y + '" alt="' + y + '"><label for="meta_tags' + (y+1) + '">Meta_tags</label><div><input type="text" id="meta_tags' + (y+1) + '" name="questions[' + y + '][meta_tags][]" value="' + quiz.questions[y].meta_tags[0] + '" placeholder="Meta_tag"></div><a><button id="addmetatagstoquestionedit" type="button" ><i></i></button></a></div>');
            for (var metatagsforquestions = 1; metatagsforquestions < quiz.questions[y].meta_tags.length; metatagsforquestions++){
            $("#metatagforquestion" + y).append('<div><input type="text" id="meta_tags" name="questions[' + $("#question" + y).attr("alt") + '][meta_tags][]" value="' + quiz.questions[y].meta_tags[metatagsforquestions] + '" placeholder="Meta_tag"></div>');
            }

            counteredit = y+1;
        }
            $("#editquiz").append('<center><a><button id="addquestionsedit" type="button""><i></i> Add more Questions</button></a></center>')
            $("#editquiz").append('<br>')
            $("#editquiz").append('<center><a href="/"><button id="editquizbutton" type="button"><i></i> Edit your quiz!</button></a></center>')
    

    $("#editer").on("click", "#addmetatagstoquiz", function(){ //when the user wants to add more metatags to the quiz during the creation process
        $(".form-group-meta-tags-quiz").append('<div><input type="text" id="meta_tags[]" name="meta_tags" placeholder="Meta_tag"></div>');
    });
    $("#editer").on("click", "#addmetatagstoquestionedit", function(){ //when the user wants to add more metatags to questions during the creation process
        $(this).parent().parent().append('<div><input type="text" id="meta_tags" name="questions[' + $(this).parent().parent().attr("alt") + '][meta_tags][]" placeholder="Meta_tag"></div>');
    });
    $("#editer").on("click", "#addchoicestoquestionedit", function(){ //when the user wants to add more answer choices to questions during the creation process
        $(this).parent().parent().append('<div><input type="text" id="meta_tags" name="questions[' + $(this).parent().parent().attr("alt") + '][answers][]" placeholder="Answer Choice"></div>');
    });
    $("#editer").on("click", "#addquestionsedit", function() {
        $(".editQuiz").append('<hr>');
        $(".editQuiz").append('<h4>Question ' + (counteredit+1) + '</h4>');
        $(".editQuiz").append('<div><label for="question' + (counteredit+1) + '">Text </label><div><input type="text"id="text' + (counteredit+1) + '" name="questions[' + counteredit + '][text]" placeholder="Text"></div></div>');
        $(".editQuiz").append('<div alt="' + counteredit + '"><label for="answerchoice' + (counteredit+1) + '">Answer Choices</label><div><input type="text" id="answerchoice' + (counteredit+1) + '" name="questions[' + counteredit + '][answers][]" placeholder="Answer Choice"></div><a><button id="addchoicestoquestion" type="button"><i></i></button></a></div>');
        $(".editQuiz").append('<div ><label for="correctanswer' + (counteredit+1) + '">Correct Answer</label><div><input type="text" id="correctanswer' + (counteredit+1) + '" name="questions[' + counteredit + '][correct_answer]" placeholder="Correct Answer (# of the array spot; i.e 0,1,2,3...)"></div></div>');
        $(".editQuiz").append('<div  alt="' + counteredit + '"><label for="meta_tags' + (counteredit+1) + '">Meta_tags</label><div><input type="text" id="meta_tags' + (counteredit+1) + '" name="questions[' + counteredit + '][meta_tags][]" placeholder="Meta_tag"></div><a><button id="addmetatagstoquestion" type="button"><i></i></button></a></div>');
        counteredit++;
    });
    $("#editer").on("click", "#editquizbutton", function() { //the submit button for the quiz creation process.
        var quizEdit = $("form#editquiz").serializeObject();
        console.log(quizEdit);
        if (quizEdit.questions.length <= quiz.questions.length){
        for (var d = 0; d < quizEdit.questions.length; d++){ // i do this to fill in the missing parts of the json!
            quizEdit.questions[d].global_correct = quiz.questions[d].global_correct;
            quizEdit.questions[d].global_total = quiz.questions[d].global_total;
            }
        }
        else {
        for (var g = 0; g < quiz.questions.length; g++){
            quizEdit.questions[g].global_correct = quiz.questions[g].global_correct;
            quizEdit.questions[g].global_total = quiz.questions[g].global_total;
            }
          console.log(quizEdit.questions.length);  
        for (var p = quiz.questions.length; p < quizEdit.questions.length; p++){
            quizEdit.questions[p].global_correct = 0;
            quizEdit.questions[p].global_total = 0;
        }
        }
        quizEdit.id = quiz.id;

       var stuffToSend = JSON.stringify(quizEdit); //Array 

        $.ajax({
          method: "PUT",
          url: "/quizOverall",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: stuffToSend
        })
          .done(function(msg) {
            console.log( "Data Saved: " + msg );
           });
});

}

