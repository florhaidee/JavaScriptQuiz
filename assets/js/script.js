var pageContentEl = document.querySelector("#page-content");
var startQuizEl = document.querySelector("#start-quiz");
var questionEl = document.querySelector("#quiz-title");
var scoreEl = document.querySelector("#scores");
var timerEl = document.querySelector("#timer");
var answerChoicesEl = document.querySelector("#answers-choices");
var sectionEl = document.querySelector("#quiz-content");
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
var scoreArray = [];
var createForm = function(){
    var containerEl = document.createElement("form");
    containerEl.className = "form";
    var labelEl = document.createElement("div");
    labelEl.innerHTML = "<label for='initials'>Enter Initials:</label>";
    labelEl.className = "form-label";
    var inputContainerEl = document.createElement("div");
    inputContainerEl.innerHTML = "<input type='text' id='initials' name='initials' class='form'/>";
    inputContainerEl.className = "form-input";
    var btnEl = document.createElement("div");
    btnEl.innerHTML =  "<button class='btn form-label' id='submit' type='submit'>Submit</button>";
    containerEl.appendChild(labelEl);
    containerEl.appendChild(inputContainerEl);
    containerEl.appendChild(btnEl);
    sectionEl.appendChild(containerEl);
}
var gameOver = function(){
    answerChoicesEl.remove();
    questionEl.textContent = "All done!"
    var subTitle = document.createElement("h3");
    subTitle.textContent = "Your final Score is " + timeLeft;
    sectionEl.appendChild(subTitle);
    createForm();
}
var timer = function(){
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft === 0 || index === 5) {
          clearInterval(timeInterval);
        }  
        timeLeft--;   
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
        gameOver();
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
    if (timeLeft === 0){
        gameOver();
        timerEl.textContent = "Time: 0";
    }
    if(index === 5){
        timerEl.textContent = "Time: "+ timeLeft; 
        gameOver(); 
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
var createScoreArray = function(st,num){
    var scoreList = document.createElement('ul');
    scoreList.className = "answers-list";
    var scoreElem = document.createElement('li');
    scoreElem.className = "list-elemt";
    scoreElem.innerHTML = "<h3> Initials =" + st + "; Score" + num + "</h3>";
    scoreList.appendChild(scoreElem);
    sectionEl.appendChild(scoreList);
}
var showScores = function(st,num){
    questionEl.textContent = "Scores"
    var removeForm= document.querySelector('.form');
    removeForm.remove();
    var removeAnswer = document.querySelector('.container'); 
    removeAnswer.remove();
    var removeSubTitle = document.querySelector('h3');
    removeSubTitle.remove();
    createScoreArray(st,num);
    var scores = localStorage.getItem("scores");
    if (!scores){
        scores = [];
        return false;
    }
    scores = JSON.parse(scores);
}
var viewScores = function(event){
    event.preventDefault();
    console.dir(event.target);
    var initialsInput = document.querySelector("input[name='initials']").value;
    console.log(initialsInput);
    if(!initialsInput){
        alert("You need to write your initials!");
        return false;
    } 
    if(scoreArray === 'undefined'){
        showScores(initialsInput,timeLeft);
    } else {
        var auxObj = {
           initials: initialsInput,
           score: timeLeft,  
        };
        console.log(auxObj);
        scoreArray.push(auxObj);
        localStorage.setItem("score", JSON.stringify(scoreArray));
        showScores(initialsInput,timeLeft);
    }
}
startQuizEl.addEventListener("click", startQuiz);
answerChoicesEl.addEventListener("click", readAnswers);
sectionEl.addEventListener("submit", viewScores);
scoreEl.addEventListener("click",viewScores);