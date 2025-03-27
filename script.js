const questions = [
    { question: "What color is the sky on a clear day?", answers: ["Red", "Blue", "Green", "Yellow"], correct: "Blue" },
    { question: "How many legs does a spider have?", answers: ["6", "8", "4", "10"], correct: "8" },
    { question: "Which animal is known as the King of the Jungle?", answers: ["Elephant", "Tiger", "Lion", "Bear"], correct: "Lion" },
    { question: "What do bees make?", answers: ["Sugar", "Honey", "Milk", "Jam"], correct: "Honey" },
    { question: "Which planet is closest to the Sun?", answers: ["Venus", "Mars", "Mercury", "Earth"], correct: "Mercury" }
];


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const finalMessage = document.getElementById("final-message");
const timerDisplay = document.getElementById("timer");

function startTimer() {
    timeLeft = 10;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    resetState();
    startTimer();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    timerDisplay.innerText = `Time Left: 10s`;
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
    finalMessage.innerText = "";
    restartButton.style.display = "none";
}

function selectAnswer(button, selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalMessage();
    }
    scoreDisplay.innerText = `Score: ${score}`;
}

function showFinalMessage() {
    questionText.innerText = `Quiz Over!`;
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";

    if (score === questions.length) {
        finalMessage.innerText = `Amazing! You got ${score}/${questions.length}!`;
    } else if (score >= Math.floor(questions.length / 2)) {
        finalMessage.innerText = `Good job! You scored ${score}/${questions.length}!`;
    } else {
        finalMessage.innerText = `Try again! You only scored ${score}/${questions.length}.`;
        restartButton.style.display = "block";
    }
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplay.innerText = `Score: 0`;
    loadQuestion();
});

loadQuestion();
