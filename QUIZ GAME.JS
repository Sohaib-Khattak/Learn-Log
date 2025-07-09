let questions = [
    {
        question: "What does CSS stand for?", 
        options: [
            "Cascading Style Sheets", 
            "Colorful Style Sheets", 
            "Creative Style Sheets", 
            "Computer Style Sheets" 
        ],
        answer: "Cascading Style Sheets" 
    },
    {
        question: "Which property is used to change the background color?", 
        options: [
            "color", 
            "background-color", 
            "bgcolor", 
            "background" 
        ],
        answer: "background-color" 
    },
    {    
        question: "How do you center a block element horizontally?", 
        options: [
            "text-align: center;", 
            "margin: auto;", 
            "display: flex;", 
            "padding: 0 auto;" 
        ],
        answer: "margin: auto;"
    },
    {
        question: "Which of the following CSS properties controls the text size?", 
        options: [
            "font-style", 
            "text-size", 
            "font-size", 
            "text-style" 
        ],
        answer: "font-size" 
    },
    {
        question: "How do you make each word in a text start with a capital letter?", 
        options: [
            "text-transform: capitalize;", 
            "text-transform: uppercase;", 
            "text-transform: lowercase;", 
            "text-transform: none;"
        ],
        answer: "text-transform: capitalize;" 
    }
];

let questionIndex = 0;
let marks = 0;
let optionArea = document.querySelectorAll(".btn");
let questionArea = document.querySelector('.question h3');
let nextBtn = document.getElementById('next-btn');
let resultScreen = document.querySelector('.resultscreen');
let restartBtn = document.getElementById('restart');
let quizgame = document.querySelector('.quiz-game');
let correctsound = document.getElementById("correctsound");
let wrongsound = document.getElementById("wrongsound");

function initializeQuiz() {
    questionArea.textContent = questions[questionIndex].question;
    for (let i = 0; i < optionArea.length; i++) {
        optionArea[i].textContent = questions[questionIndex].options[i];
        optionArea[i].style.backgroundColor = "white";
        optionArea[i].style.color = "black";
        optionArea[i].disabled = false;
    }
}

function disabledOptions() {
    for (let i = 0; i < optionArea.length; i++) {
        optionArea[i].disabled = true;
    }
}

function checkedOption() {
    let correctAnswer = questions[questionIndex].answer;
    let selectedAnswer = this.textContent.replace(' ✓', '').replace(' X', '');
    
    if (correctAnswer === selectedAnswer) {
        marks++;
        this.style.backgroundColor = "green";
        this.style.color = "white";
        this.textContent += ' ✓';
        correctsound.play();
    } else {
        this.style.backgroundColor = 'red';
        this.style.color = 'white';
        this.textContent += ' X';
        wrongsound.play();
        
        for (let i = 0; i < optionArea.length; i++) {
            if (optionArea[i].textContent.replace(' ✓', '').replace(' X', '') === questions[questionIndex].answer) {
                optionArea[i].style.backgroundColor = 'green';
                optionArea[i].style.color = 'white';
                optionArea[i].textContent += ' ✓';
            }
        }
    }
    disabledOptions();
}

function moveToNextQuestion() {
    // Reset all buttons
    for (let i = 0; i < optionArea.length; i++) {
        optionArea[i].disabled = false;
        optionArea[i].style.backgroundColor = 'white';
        optionArea[i].style.color = 'black';
        optionArea[i].textContent = optionArea[i].textContent.replace(' ✓', '').replace(' X', '');
    }

    if (questionIndex < questions.length - 1) {
        questionIndex++;
        initializeQuiz();
    } else {
        // Quiz completed
        quizgame.style.display = 'none';
        resultScreen.style.display = 'block';
        resultScreen.querySelector('h1').textContent = `Your marks are ${marks} / ${questions.length}`;
    }
}

// Event listeners
for (let i = 0; i < optionArea.length; i++) {
    optionArea[i].addEventListener('click', checkedOption);
}

nextBtn.addEventListener('click', moveToNextQuestion);

restartBtn.addEventListener('click', function() {
    marks = 0;
    questionIndex = 0;
    resultScreen.style.display = 'none';
    quizgame.style.display = 'block';
    initializeQuiz();
});

document.addEventListener('keydown', function(event) {
    let keypressed = event.key;
    let optionIndex = parseInt(keypressed) - 1;
    if (optionIndex >= 0 && optionIndex < optionArea.length) {
        optionArea[optionIndex].click();
    }
});

// Initialize the quiz
initializeQuiz();