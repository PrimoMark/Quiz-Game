// DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "what is the capital of France?",
        answers: [
            {text: "London", correct: false}, 
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
        ],
    },
    {
        question: "which planet is known as the Red Planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Earth", correct: false},
        ]
    },
    {
        question: "what is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
            {text: "Arctic Ocean", correct: false},
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = quizQuestions.length;

totalQuestionsSpan.textContent = totalQuestions; 
maxScoreSpan.textContent = totalQuestions;

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[currentQuestionIndex]; 
    questionText.textContent = q.question; 
    currentQuestionSpan.textContent = currentQuestionIndex + 1; 
    answerContainer.innerHTML = ''; // removes all answer buttons
    
    // FIXED: q.options → q.answers
    q.answers.forEach((answer, index) => { // create a button for each answer
        const btn = document.createElement("button"); // creates a new button in memory (not on screen yet)
        btn.textContent = answer.text; // puts the option text on the button
        btn.className = "answer-btn"; // applies css style to button
        btn.dataset.correct = answer.correct; // stores whether this button is the correct answer
        btn.onclick = () => handleAnswer(btn, index); // when clicked, the answer function runs
        answerContainer.appendChild(btn); // makes the button appear on screen
    });
    
    progressBar.style.width = (currentQuestionIndex / quizQuestions.length * 100) + "%"; // updates the progress bar
}

function handleAnswer(btn, index) {  // this function runs when the user clicks an answer
    const allBtns = document.querySelectorAll(".answer-btn"); // gets all answer button on the page
    allBtns.forEach((b) => {
        b.disabled = true; // makes the button unclickable to prevent user from clicking again 
        if (b.dataset.correct === 'true') { // checks if the button is the correct answer
            b.classList.add("correct"); // changes the button to green(to show the user which answer is correct)
        }
    });

    if (btn.dataset.correct === 'true') { // checks if the user's answer was correct
        btn.classList.add("correct"); // turns the user's button green to show its the right answer
        score++; // increase the score by 1
        scoreSpan.textContent = score; 
    } else {
        btn.classList.add("incorrect"); // turns the user's button red to show its wrong
    }

    setTimeout(() => { // waits a certain amount of time before running the code to see if they were correct
        currentQuestionIndex++; // advance to the next question 
        if (currentQuestionIndex < quizQuestions.length) { // FIXED: current → currentQuestionIndex, questions → quizQuestions // checks if there are more questions
            showQuestion(); // display the next question
        } else {
            showResult(); // shows the final results
        }
    }, 1500); // waits 1.5 seconds before moving on
}

function showResult() {
    quizScreen.classList.remove("active"); // hides the quiz screen
    resultScreen.classList.add("active"); // shows the result screen
    finalScoreSpan.textContent = score; // displays the user's score
    
    const pct = (score / quizQuestions.length) * 100; 
    if (pct === 100) {
        resultMessage.textContent = "Perfect! You're a genius!"; 
    } else if (pct >= 60) {
        resultMessage.textContent = "Good Job! Keep Practicing!";
    } else {
        resultMessage.textContent = "Try Again!";
    }
}

startButton.onclick = startQuiz; // when user clicks START QUIZ the startQuiz function runs
restartButton.onclick = () => {
    resultScreen.classList.remove("active"); // hides the result screen
    startScreen.classList.add("active"); // shows the start screen
};
console.log("Quiz Ready!");