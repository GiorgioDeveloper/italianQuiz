let quiz;

$(document).ready(function() {
  //init game logic
  quiz = new ItalianQuiz(100);

  $("#game-section").hide();

  $("#btn0").click(function() {
    $("#home").fadeOut(150);
    $("#game-section").fadeIn(1000, function() {
      $(this).removeClass("display");
    });

    quiz.startCounter();
  });

  // Set inital answers;
  updateAnswers();
  // call function buttonEvents first time at page upload
  buttonsEvents();

  $("#btn4").click(function() {
    quiz.questionNumber = quiz.questionNumber + 1;
    gifQuestion();
    updateAnswers();
    $(this).hide();
    buttonsEvents();
    $("#feedback > img").attr("src", "");
    questionNumber();
    quiz.startCounter();
    quiz.counter = quiz.counter;
    $("video").removeClass("borderRed borderGreen");
    $(".btn").removeClass("background-btn-green background-btn-red");
  });
});

// define the variable i according to text in the btn4, and fire 3 functions 1.define the gif, 2.update answers in btn1-2-3, 3.assign the event listener to btn 1-2-3

// create random number to call image feedback if correct answer or         wrong answer and add or take off 10 secs from the countdwon

function imgFeedback(isCorrect) {
  let lastNumber; // start with undefined lastNumber
  let randomNumber = GetRandNumber();

  function GetRandNumber() {
    var x = Math.floor(Math.random() * 7 + 1); // get new random number

    if (x === lastNumber) {
      // compare with last number
      return GetRandNumber(); // if they are the same, call the function again to repeat the process
    }
    return x; // if they're not the same, return it
  }

  if (isCorrect) {
    let imgWin = feedbackWin[randomNumber].img;
    $("#feedback > img").attr("src", imgWin);
    quiz.counter = quiz.counter + 10;
    $("#time").text(quiz.counter);
  } else {
    imgLoose = feedbackLoose[randomNumber].img;
    $("#feedback > img").attr("src", imgLoose);

    $("#time").text(quiz.counter);
    if (quiz.counter >= 10) {
      quiz.counter = quiz.counter - 10;
      $("#time").text(quiz.counter);
    } else {
      quiz.counter = 0;
      $("#time").text(quiz.counter);
      $("#game-section").fadeOut(1200);

      // $("#final-section").removeClass("display")
      $("#final-section").fadeIn(1200, function() {
        $(this).removeClass("display");
      });
    }
  }
}

// function to define at which question we are
function questionNumber() {
  let nextNr = quiz.questionNumber;
  $("#questionNumber").text(nextNr + 1);
}

$(".btn-final-page").click(function() {
  clearInterval(quiz.intervalId);
  quiz.counter = 100;
  $("#time").text(quiz.counter);
  quiz.questionNumber = 0;
  $("#questionNumber").text(1);
  $("#home").toggle();
  $("#final-section").toggle();

  buttonsEvents();

  gifQuestion();
  updateAnswers();
  $("#btn4").hide();
  $("#feedback > img").attr("src", "");

  $("video").removeClass("borderRed borderGreen");
  $(".btn").removeClass("background-btn-green background-btn-red");
});

// function to change the final message

function gameOver() {
  let finalComment = $(".final-comment").text();
  let finalComment2 = $(".final-comment2").text();
  if (quiz.counter > 0 && quiz.counter <= 25) {
    finalComment = "BAD JOB!";
    finalComment2 = "FOR SURE YOU LIKE SPAGHETTI & KETCHUP";
  } else if (quiz.counter > 25 && quiz.counter <= 50) {
    finalComment = "NOT TOO BAD";
    finalComment2 = "YOU ARE ALLOWED TO GROW SOME ITALIAN MUSTACHE NOW";
  } else if (quiz.counter > 50 && quiz.counter <= 75) {
    finalComment = "GREAT JOB";
    finalComment2 = "YOU ARE ITALIAN INSIDE";
  } else if (quiz.counter > 75) {
    finalComment = "BRAVISSIMO!";
    finalComment2 = "YOU CAN BE THE NEXT KING OF ROME";
  } else if (quiz.counter == 0) {
    finalComment = "GAME OVER!! FINITO!";
    finalComment2 = "YOU BETTER LEARN SWEDISH GESTURES";
  }

  $(".final-comment").text(finalComment);
  $(".final-score").text(quiz.counter);
  $(".final-comment2").text(finalComment2);

  // clearInterval(quiz.intervalId);
}

// declare function to attribute answers to btn
function updateAnswers() {
  answer1 = $("#btn1").text(questions[quiz.questionNumber].answers[0]);
  answer2 = $("#btn2").text(questions[quiz.questionNumber].answers[1]);
  answer3 = $("#btn3").text(questions[quiz.questionNumber].answers[2]);
}

function gifQuestion() {
  gif = questions[quiz.questionNumber].img;
  $("#myGifTag > source").attr("src", gif);
  $("#myGifTag")
    .get(0)
    .load();
}

// creat functio to neutralize the btns event listener after click, to be recalled in every button

function btnOff(btn, answer) {
  $(".btn").off();
  $(btn).text(answer);
}

// attribute event listener to the 3 answers btn, and wrap them in a function buttonsEvents to be recalled by btn4 when refresh

function buttonsEvents() {
  let isCorrect = false;

  $(".btn").click(function() {
    debugger;
    clearInterval(quiz.intervalId);

    $("#btn4").show();

    if ($(this).html() == questions[quiz.questionNumber].correctAnswer) {
      btnOff(this, "SI GIUSTO!");
      $("video").addClass("borderGreen");
      $(this).addClass("background-btn-green");
      isCorrect = true;
    } else {
      btnOff(this, "NO SBAGLIATO!");
      $("video").addClass("borderRed");
      $(this).addClass("background-btn-red");
    }
    imgFeedback(isCorrect);

    if (quiz.questionNumber + 1 == 25) {
      $("#game-section").fadeOut(1200);
      // $("#final-section").removeClass("display")
      $("#final-section").fadeIn(1200, function() {
        $(this).removeClass("display");
      });
      gameOver();
    }
  });
}

// to do:

// check the random number for feedback img (not working properly)
// what if all answers correct but low score? create new function to store correct answers and update resut message based on answer+score
// randomize the answer-button
// add sounds on click
// add sounds to final page
