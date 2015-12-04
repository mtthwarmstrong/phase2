    $(document).ready(function(){ //when the document is ready, start the process        


var counterCreate = 0;
            $("#maker").append("<div id='makeQuiz' >" ); //making a dynamic div
            $("#makeQuiz").append("<form id='makequiz' class='createQuiz'>");  
            $(".createQuiz").append('<div><label for="title">Title</label><div ><input type="text"  id="title" name="title" placeholder="Title"></div></div>');
            $(".createQuiz").append('<div><label for="description">Description</label><div><textarea rows="2"  id="description" name="description" placeholder="Description"></textarea></div></div>');
            $(".createQuiz").append('<div class="form-group-meta-tags-quiz"><label for="meta_tags">Meta_tags</label><div><input type="text"  id="meta_tags" name="meta_tags" placeholder="Meta_tag"></div><a><button id="addmetatagstoquiz" type="button"><i></i>Add Meta Tag</button></a></div>');
            $(".createQuiz").append('<div><label for="difficulty">Difficulty</label><div><input type="text"  id="difficulty" name="difficulty" placeholder="Difficulty, from 1-20"></div></div>');

            for (var y = 0; y < 10; y++){
            $(".createQuiz").append('<hr color="red" align="left" width="30%">');
            $(".createQuiz").append('<h4>Question ' + (y+1) + '</h4>');
            $(".createQuiz").append('<div><label for="question' + (y+1) + '">Text </label><div><input type="text"  id="text' + (y+1) + '" name="questions[' + y + '][text]" placeholder="Text"></div></div>');
            $(".createQuiz").append('<div alt="' + y + '"><label for="answerchoice' + (y+1) + '">Answer Choices</label><div><input type="text"  id="answerchoice' + (y+1) + '" name="questions[' + y + '][answers][]" placeholder="Answer Choice"></div><a><button id="addchoicestoquestion" type="button"><i></i>Add Answer Choice</button></a></div>');
            $(".createQuiz").append('<div><label for="correctanswer' + (y+1) + '">Correct Answer</label><div><input type="text"  id="correctanswer' + (y+1) + '" name="questions[' + y + '][correct_answer]" placeholder="Correct Answer (# of the array spot; i.e 0,1,2,3...)"></div></div>');
            $(".createQuiz").append('<div alt="' + y + '"><label for="meta_tags' + (y+1) + '">Meta_tags</label><div><input type="text"  id="meta_tags' + (y+1) + '" name="questions[' + y + '][meta_tags][]" placeholder="Meta_tag"></div><a><button id="addmetatagstoquestion" type="button"><i></i>Add Meta Tag</button></a></div>');
            counterCreate = y+1;
        }
            $("#makeQuiz").append('<center><a><button id="addQuestionButton" type="button"><i></i>Add More Questions</button></a></center>')
            $("#makeQuiz").append('<br>')
            $("#makeQuiz").append('<br>')
            $("#makeQuiz").append('<center><a href="/"><button id="makeQuizButton" type="button"><i></i> Make Your Quiz!</button></a></center>')
    
  $("#maker").on("click", "#addmetatagstoquiz", function(){ //when the user wants to add more metatags to the quiz during the creation process
        $(".form-group-meta-tags-quiz").append('<div><input type="text" id="meta_tags" name="meta_tags" placeholder="Meta_tag"></div>');
    });
    $("#maker").on("click", "#addmetatagstoquestion", function(){ //when the user wants to add more metatags to questions during the creation process
        $(this).parent().parent().append('<div ><input type="text" id="meta_tags" name="questions[' + $(this).parent().parent().attr("alt") + '][meta_tags][]" placeholder="Meta_tag"></div>');
    });
    $("#maker").on("click", "#addchoicestoquestion", function(){ //when the user wants to add more answer choices to questions during the creation process
        $(this).parent().parent().append('<div><input type="text" id="meta_tags" name="questions[' + $(this).parent().parent().attr("alt") + '][answers][]" placeholder="Answer Choice"></div>');
    });
    $("#maker").on("click", "#addQuestionButton", function() {
        $(".createQuiz").append('<hr color="red" align="left" width="30%">');
        $(".createQuiz").append('<h4>Question ' + (counterCreate+1) + '</h4>');
        $(".createQuiz").append('<div><label for="question' + (counterCreate+1) + '">Text </label><div><input type="text" id="text' + (counterCreate+1) + '" name="questions[' + counterCreate + '][text]" placeholder="Text"></div></div>');
        $(".createQuiz").append('<div alt="' + counterCreate + '"><label for="answerchoice' + (counterCreate+1) + '">Answer Choices</label><div><input type="text" id="answerchoice' + (counterCreate+1) + '" name="questions[' + counterCreate + '][answers][]" placeholder="Answer Choice"></div><a><button id="addchoicestoquestion" type="button"><i></i>Add Answer Choice</button></a></div>');
        $(".createQuiz").append('<div><label for="correctanswer' + (counterCreate+1) + '">Correct Answer</label><div><input type="text" id="correctanswer' + (counterCreate+1) + '" name="questions[' + counterCreate + '][correct_answer]" placeholder="Correct Answer (# of the array spot; i.e 0,1,2,3...)"></div></div>');
        $(".createQuiz").append('<div alt="' + counterCreate + '"><label for="meta_tags' + (counterCreate+1) + '">Meta_tags</label><div><input type="text" id="meta_tags' + (counterCreate+1) + '" name="questions[' + counterCreate + '][meta_tags][]" placeholder="Meta_tag"></div><a><button id="addmetatagstoquestion" type="button"><i></i>Add Meta Tag</button></a></div>');
        counterCreate++;
    });
    $("#maker").on("click", "#makeQuizButton", function() { //the submit button for the quiz creation process.
        var quizMade = $("form#makequiz").serializeObject();
        console.log(quizMade);
        for (var j = 0; j < quizMade.questions.length; j++){ // i do this to fill in the missing parts of the json!
            quizMade.questions[j].global_correct = 0;
            quizMade.questions[j].global_total = 0;
        }
        var stuffToSend = JSON.stringify(quizMade); 
        console.log(stuffToSend);
        $.ajax({
           url : "/quizOverall",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data : stuffToSend
        })
          .done(function(msg) {
            console.log( "Data Saved: " + msg );
           });
    });

    });


