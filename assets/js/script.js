var pageContentEl = document.querySelector("#page-content");
var startQuizEl = document.querySelector("#start-quiz");
var questionEl = document.querySelector("#quiz-title");
var timerEl = document.querySelector("#timer");
var answerChoicesEl = document.querySelector("#answers-choices");
console.log(answerChoicesEl);
var answerEl = document.querySelector("#container");
var timeLeft = 75;
var index = 0;
var questionsArray = [
    {
        q: "question1",
        a: "2",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ],      
    },
    {
        q: "question2",
        a: "1",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4"
        ], 
    },
    {
        q: "question3",
        a: "3",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ], 
    },
    {
        q: "question4",
        a: "2",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ], 
    },
    {
        q: "question5",
        a: "0",
        choices: [
            "choice 1",
            "choice 2",
            "choice 3",
            "choice 4" 
        ], 
    },
]
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
var deleteFirstPage = function(){
    var text = document.querySelector(".text");
    text.remove(); 
    var btn = document.querySelector(".btn");
    btn.remove();  
}
var deleteSection = function(){
    for (var i=0; i< questionsArray[index].choices.length; i++){
        var listElem = document.querySelector(".list-elemt");
        listElem.remove();
    }
}
var showQuestion = function(){
    console.log(index);
    if (timeLeft > 0){
        questionEl.innerHTML =questionsArray[index].q;
        for(var i=0; i< questionsArray[index].choices.length; i++){
            var answersChoicesList = document.createElement("li");
            answersChoicesList.className = "list-elemt";
            var answersChoicesInfo = document.createElement("div");
            answersChoicesInfo.innerHTML = "<button class='btn' id= " + i + " type='button'>" + questionsArray[index].choices[i] + "</button>";
            answersChoicesList.appendChild(answersChoicesInfo);
            console.log(answersChoicesList);
            answerChoicesEl.appendChild(answersChoicesList);
        } 
    }else{
        alert("game -over");
    }
    index++;
}
var displayAnswer = function(answer){
    answerEl.setAttribute("style", "border-top: 2px solid var(--secondary); font-size: 1.4rem;");
    answerEl.innerHTML = "<h3>" + answer + "</h3>"; 
}
var startQuiz = function(){
    index = 0;
    timer();
    deleteFirstPage();
    showQuestion();
}
var readAnswers = function(event){
    var choice = event.target.id;
    if(index === 5){
        alert("Your Score is: " + timeLeft);  
    } else if (choice === questionsArray[index].a){
            deleteSection();
            showQuestion();
            displayAnswer("Correct!");
        } else {
            timeLeft -=10;
            deleteSection();
            showQuestion();
            displayAnswer("Wrong!");
        };   
}
startQuizEl.addEventListener("click", startQuiz);
answerChoicesEl.addEventListener("click", readAnswers);