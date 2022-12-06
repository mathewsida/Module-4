var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [{
    question: "Commonly used data types include do NOT include",
    choiceA: "Strings",
    choiceB: "Booleans",
    choiceC: "Alerts",
    choiceD: "Numbers",
    correctAnswer: "c"},
  {
    question: "Arrays in Javascript can be used to store",
    choiceA: "Numbers and Strings",
    choiceB: "Other Arrays",
    choiceC: "Booleans",
    choiceD: "All of the Above",
    correctAnswer: "d"},
   {
    question: "The conditions of an if/else statement is enclosed with _____",
    choiceA: "Quotes",
    choiceB: "Curly Braces",
    choiceC: "Parenthesis",
    choiceD: "Square Braces",
    correctAnswer: "b"},
    {
    question: "String Values must be enclosed within ____ when being assigned to variables",
    choiceA: "Commas",
    choiceB: "Curly Braces",
    choiceC: "Quotes",
    choiceD: "Parenthesis",
    correctAnswer: "c"},
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is _____",
    choiceA: "Javascript",
    choiceB: "Terminal/Bash",
    choiceC: "For Loops",
    choiceD: "Console Logs",
    correctAnswer: "d"},  
    
    
    ];
    var finalQuestionIndex = quizQuestions.length;
    var currentQuestionIndex = 0;
    var timeLeft = 50;
    var timerInterval;
    var score = 0;
    var correct;
function generateQuizQuestion()
{
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz()
{
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
        
        if(timeLeft === 0) 
        {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "inline-block";
}
function showScore()
{
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") 
    {
        alert("Initials cannot be blank");
        return false;
    }
    else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = 
        {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

function generateHighscores()
{
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++)
    {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore()
{
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore()
{
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz()
{
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 50;
    score = 0;
    currentQuestionIndex = 0;
}


function checkAnswer(answer)
{
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        timeLeft -= 10;
        currentQuestionIndex++;
        generateQuizQuestion();


    }else{
        showScore();
    }
}


startQuizButton.addEventListener("click",startQuiz);