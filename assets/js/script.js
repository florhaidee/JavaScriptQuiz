var pageContentEl = document.querySelector("#page-content");
var startQuizEl = document.querySelector("#start-quiz");
var questionEl = document.querySelector("#quiz-title");
var timerEl = document.querySelector("#timer");
var answerChoicesEl = document.querySelector("#answers-choices");
console.log(answerChoicesEl);
var answersEl = document.querySelector("#answer");
var timeLeft = 75;
var questionsArray = [
    {
        q: "question",
        a: "2",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ],      
    },
    {
        q: "question",
        a: "1",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4"
        ], 
    },
    {
        q: "question",
        a: "3",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ], 
    },
    {
        q: "question",
        a: "2",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ], 
    },
    {
        q: "question",
        a: "0",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ], 
    },
]
//function to see if the choice selected by user was the correct answer.
/*var correctAnswer = function(){
    if (questionsArray[0].a === )
}*/
var timer = function(){
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;  
        if (timeLeft === 0) {
          timerEl.textContent = "Time: 0";
          // Game-over function;
          clearInterval(timeInterval);
        }   
    }, 1000);
}
var showQuestion = function(){
    questionEl.innerHTML = questionsArray[0].q;
}
var showAnswerChoices = function(){
    for(var i=0; i< questionsArray[0].choices.length; i++){
        var answersChoicesList = document.createElement("li");
        answersChoicesList.className = "answers-list";
        var answersChoicesInfo = document.createElement("div");
        answersChoicesInfo.innerHTML = "<button class='btn' id= " + i + " type='button'>" + questionsArray[0].choices[i] + "</button>";
        answersChoicesList.appendChild(answersChoicesInfo);
        console.log(answersChoicesList);
        answerChoicesEl.appendChild(answersChoicesList);
    } 
}
var choiceSelected = function(event){
    var choice = event.target.id;
    if (choice === questionsArray[0].a){
        return true;
    }
    else {
        timeLeft -=10;
        return false;
    }  
}
var deleteSection = function(){
    var text = document.querySelector(".text");
    text.remove();   
    startQuizEl.remove();
}
var startQuiz = function(){
    timer();
    deleteSection();
    showQuestion();
    showAnswerChoices();
}
startQuizEl.addEventListener("click", startQuiz);
answerChoicesEl.addEventListener("click", choiceSelected);