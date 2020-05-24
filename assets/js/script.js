var pageContentEl = document.querySelector("#page-content");
var startQuizEl = document.querySelector("#start-quiz");
var questionEl = document.querySelector("#quiz-title");
var answersEl = document.querySelector("#quiz-content");

var startQuiz = function(){
    questionEl.innerHTML = "Question";
    answersEl.innerHTML = "Answers";
    startQuizEl.remove();
    console.dir(startQuizEl);
}
startQuizEl.addEventListener("click", startQuiz);