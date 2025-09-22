// VARIABLE DECLARATIONS ------

// pages
var initPage,
    questionsPage,
    resultsPage,
    // buttons
    startBtn,
    submitBtn,
    continueBtn,
    retakeBtn,
    spanishBtn,
    // question and answers
    question,
    answerList,
    answerSpan,
    answerA,
    answerB,
    answerC,
    answerD,
    // event listeners
    answerDiv,
    answerDivA,
    answerDivB,
    answerDivC,
    answerDivD,
    feedbackDiv,
    selectionDiv,
    toBeHighlighted,
    toBeMarked,
    userScore,
    // quiz
    quiz,
    questionCounter,
    correctAnswer,
    correctAnswersCounter,
    userSelectedAnswer,
    // function names
    newQuiz,
    generateQuestionAndAnswers,
    getCorrectAnswer,
    getUserAnswer,
    selectAnswer,
    deselectAnswer,
    selectCorrectAnswer,
    deselectCorrectAnswer,
    getSelectedAnswerDivs,
    highlightCorrectAnswerGreen,
    highlightIncorrectAnswerRed,
    slikica,
    clearHighlightsAndFeedback,
    prekidac, countdownTimer, bodovi = 0,
    vrijeme = 0;

function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            timeleft--;
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            } else if (timeleft <= 1) {
                $("#sekunde").html("sekunda")
                $("#ostalo").html("ostala")
            } else if (timeleft <= 4) {
                $("#sekunde").html("sekunde")
            }

        }, 1000);
    });

}

$(document).ready(function () {

    // DOM SELECTION ------

    // App pages
    // Page 1 - Initial
    initPage = $('.init-page');
    // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
    // Page 3 - Results
    resultsPage = $('.results-page');
    slikica = $('.slikica');

    // Buttons
    startBtn = $('.init-page__btn, .results-page__retake-btn');
    submitBtn = $('.mrzim');
    continueBtn = $('.questions-page__continue-btn');
    retakeBtn = $('.results-page__retake-btn');
    spanishBtn = $('.results-page__spanish-btn');

    // Answer block divs
    answerDiv = $('.questions-page__answer-div');
    answerDivA = $('.questions-page__answer-div-a');
    answerDivB = $('.questions-page__answer-div-b');
    answerDivC = $('.questions-page__answer-div-c');
    answerDivD = $('.questions-page__answer-div-d');

    // Selection div (for the pointer, on the left)
    selectionDiv = $('.questions-page__selection-div');

    // Feedback div (for the checkmark or X, on the right)
    feedbackDiv = $('.questions-page__feedback-div');

    // Questions and answers
    question = $('.questions-page__question');
    answerList = $('.questions-page__answer-list');
    answerSpan = $('.questions-page__answer-span');
    answerA = $('.questions-page__answer-A');
    answerB = $('.questions-page__answer-B');
    answerC = $('.questions-page__answer-C');
    answerD = $('.questions-page__answer-D');


    // User final score
    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');
    cvijece = ["I", "B", "V", "K", "T", "P", "O", "N", "G", "A", "Z", "S", "ⱑ (jat)"]
    // QUIZ CONTENT ------

    function stvori(tekst, tekst2, tekst3) {
        do {
            predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }




    // FUNCTION DECLARATIONS ------
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList
            for (var i = c.length - 1; i >= 0; i--) {
                var classe = "" + c[i]
                if (classe.match(re)) c.remove(classe)
            }
        })
    }


    function shuffle(array) { //izmješaj pitanja
        var i = 0,
            j = 0,
            temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    // Start the quiz
    newQuiz = function () {
        prekidac = 1;
        bodovi = 0;
        // Set the question counter to 0
        questionCounter = 0;
        // Set the total correct answers counter to 0
        correctAnswersCounter = 0;
        // Hide other pages of the app
        questionsPage.hide();
        resultsPage.hide();

        quiz = [
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "A",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "A",
                "slika": "slike/a9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "B",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "B",
                "slika": "slike/b9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c1-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c1-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c10-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c10-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c11-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c11-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c12-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c12-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c13-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c13-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c14-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c15-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c16-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c17-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c18-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c19-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c2-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c2-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c3-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c3-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c4-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c4-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c5-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c5-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c6-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c6-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c7-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c7-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c8-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c8-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c9-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c9-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "C",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "C",
                "slika": "slike/c9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "D",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "D",
                "slika": "slike/d9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e1-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e10-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e11-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e12-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e13-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e14-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e15-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e16-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e17-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e18-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e19-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e2-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e21.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e3-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e4-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e5-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e6-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e7-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e8-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e9-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "E",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "E",
                "slika": "slike/e9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "F",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "F",
                "slika": "slike/f9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "G",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "G",
                "slika": "slike/g9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "H",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "H",
                "slika": "slike/h9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i1-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i2-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i21.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i3-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i4-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i5-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "I",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "I",
                "slika": "slike/i9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "J",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "J",
                "slika": "slike/j8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "K",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "K",
                "slika": "slike/k9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "L",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "L",
                "slika": "slike/l9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "M",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "M",
                "slika": "slike/m9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "N",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "N",
                "slika": "slike/n9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "O",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "O",
                "slika": "slike/o9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p21.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "P",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "P",
                "slika": "slike/p9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "R",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "R",
                "slika": "slike/r9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s1-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s10-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s11-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s12-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s13-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s14-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s15-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s16-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s17-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s2-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s3-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s4-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s5-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s6-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s7-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s8-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s9-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "S",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "S",
                "slika": "slike/s9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "T",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "T",
                "slika": "slike/t9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u1-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u10-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u11-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u12-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u13-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u14-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u15-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u16-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u17-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u2-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u3-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u4-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u5-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u6-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u7-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u8-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u9-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "U",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "U",
                "slika": "slike/u9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v19.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v20.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "V",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "V",
                "slika": "slike/v9.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z1-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z1-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z1.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z10-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z10.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z11-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z11.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z12-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z12.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z13-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z13.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z14-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z14.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z15-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z15.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z16-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z16.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z17-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z17.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z18.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z2-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z2-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z3-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z3-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z4-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z4-3.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z4.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z5-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z5.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z6-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z6.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z7-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z7.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z8-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z8.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z9-2.png",
                "boja_pozadine": "#e0e0e0"
            },
            {
                "answers": [
                    "Z",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "Z",
                "slika": "slike/z9.png",
                "boja_pozadine": "#e0e0e0"
            }

        ]

        shuffle(quiz)


    };

    // Load the next question and set of answers
    generateQuestionAndAnswers = function () {
        $(".questions-page__answer-list").show()

        lista_odgovora = ["I", "B", "V", "K", "T", "P", "O", "N", "G", "A", "Z", "S", "ⱑ (jat)"]
        removeItem = quiz[questionCounter].correctAnswer;

        lista_odgovora = jQuery.grep(lista_odgovora, function (value) {
            return value != removeItem;
        });
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + ".</span>");
        shuffle(quiz[questionCounter].answers);

        rand1 = lista_odgovora[Math.floor(Math.random() * lista_odgovora.length)]
        lista_odgovora = jQuery.grep(lista_odgovora, function (value) {
            return value != rand1;
        });
        rand2 = lista_odgovora[Math.floor(Math.random() * lista_odgovora.length)]
        lista_odgovora = jQuery.grep(lista_odgovora, function (value) {
            return value != rand2;
        });
        rand3 = lista_odgovora[Math.floor(Math.random() * lista_odgovora.length)]
        lista_odgovora = jQuery.grep(lista_odgovora, function (value) {
            return value != rand3;
        });
        rand4 = lista_odgovora[Math.floor(Math.random() * lista_odgovora.length)]
        lista_odgovora = jQuery.grep(lista_odgovora, function (value) {
            return value != rand4;
        });

        answerA.text(quiz[questionCounter].answers[0]);
        if (answerA.html() == "" || null) {
            answerA.html(rand1);
        } else {
            answerDivA.show()
        };
        answerB.text(quiz[questionCounter].answers[1]);
        if (answerB.html() == "" || null) {
            answerB.html(rand2);
        } else {
            answerDivB.show()
        };
        answerC.text(quiz[questionCounter].answers[2]);
        if (answerC.html() == "" || null) {
            answerC.html(rand3);
        } else {
            answerDivC.show()
        };
        answerD.text(quiz[questionCounter].answers[3]);
        if (answerD.html() == "" || null) {
            answerD.html(rand4);
        } else {
            answerDivD.show()
        };
        slikica.attr("src", quiz[questionCounter].slika)
        slikica.attr("data-zoom-image", quiz[questionCounter].slika)
        $("#opis").html("")
        $(".vrijeme").html('<progress value="10" max="10" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">10 </span> <span id="sekunde">sekunda</span> za odgovor</p>')
        $("body").css({
            "background-color": quiz[questionCounter].boja_pozadine
        })
        if (prekidac == 1) {
            ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = quiz[questionCounter].correctAnswer;
    };

    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };

    // Add the pointer to the clicked answer
    selectAnswer = function (target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")

    };

    // Remove the pointer from any answer that has it
    deselectAnswer = function () {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };

    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function (target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };

    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function (target) {
        if (correctAnswer === answerA.text()) {
            answerDivA.addClass('questions-page--correct');
            answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerB.text()) {
            answerDivB.addClass('questions-page--correct');
            answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerC.text()) {
            answerDivC.addClass('questions-page--correct');
            answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerD.text()) {
            answerDivD.addClass('questions-page--correct');
            answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
        }
    };


    // Make the incorrect answer red and add X
    highlightIncorrectAnswerRed = function () {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };

    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function () {
        answerDiv.removeClass('questions-page--correct');
        answerDiv.removeClass('questions-page--incorrect');
        feedbackDiv.removeClass('ion-checkmark-round');
        feedbackDiv.removeClass('ion-close-round');
    };

    // APP FUNCTIONALITY ------

    /* --- PAGE 1/3 --- */

    // Start the quiz:

    resultsPage.hide();

    submitBtn.hide();
    continueBtn.hide();


    // Clicking on start button:
    startBtn.on('click', function () {

        newQuiz();

        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);

        // Load question and answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();

    });

    /* --- PAGE 2/3 --- */

    // Clicking on an answer:
    answerDiv.on('click', function () {

        // Make the submit button visible

        // Remove pointer from any answer that already has it
        deselectAnswer();

        // Put pointer on clicked answer
        selectAnswer(this);

        // Store current selection as user answer
        getUserAnswer(this);

        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);
        odgovor();

    });


    function odgovor() {

        vrijeme = parseInt($("#pageBeginCountdownText").text())
        bodovi += vrijeme

        prekidac = 0;
        var ide = 0
        // Disable ability to select an answer
        answerDiv.off('click');
        if (questionCounter != quiz.length - 1) {
            ide = 1
        } else {
            ide = 0
        }

        // Make correct answer green and add a checkmark
        highlightCorrectAnswerGreen();
        clearInterval(countdownTimer);


        if (document.getElementById("pageBeginCountdown").value == "0") {
            $("#krivo")[0].play();

            bodovi -= 10;

            swal({
                title: "Isteklo je vrijeme.",
                html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><br><br><div class='section group'><div class='col span_1_of_2'>" + "<img src='" + quiz[questionCounter].slika + "'class='slikica2'/></div><div class='col span_1_of_2' style='margin-top:10%'><span style='font-family:glagoljica;font-size:125px;text-transform: lowercase;'>" + quiz[questionCounter].correctAnswer[0] + "</span></div></div>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false
            });
            $(".swal2-confirm").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
            $(".swal2-close").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })

        } else {
            // Evaluate if the user got the answer right or wrong
            if (userSelectedAnswer === correctAnswer) {

                // Increment the total correct answers counter
                correctAnswersCounter++;
                bodovi += 10;
                $("#tocno")[0].play();
                broj = vrijeme + 10
                swal({
                    title: "<span style='color:green'>Točno</span>",
                    html: "+" + broj + "<br><br><br><div class='section group'><div class='col span_1_of_2'>" + "<img src='" + quiz[questionCounter].slika + "'class='slikica2'/></div><div class='col span_1_of_2' style='margin-top:10%'><span style='font-family:glagoljica;font-size:125px;text-transform: lowercase;'>" + quiz[questionCounter].correctAnswer[0] + "</span></div></div>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false

                });

                $(".swal2-confirm").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })


            } else {
                highlightIncorrectAnswerRed();
                bodovi -= 10;
                $("#krivo")[0].play();

                swal({
                    title: " <span style='color:#bb422a' >Netočno</span>",
                    html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><br><br><div class='section group'><div class='col span_1_of_2'>" + "<img src='" + quiz[questionCounter].slika + "'class='slikica2'/></div><div class='col span_1_of_2' style='margin-top:10%'><span style='font-family:glagoljica;font-size:125px;text-transform: lowercase;'>" + quiz[questionCounter].correctAnswer[0] + "</span></div></div>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false
                });

                $(".swal2-confirm").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            }
        }

        // Substitute the submit button for the continue button:
        submitBtn.hide(300);
        nastavi()
    }
    // Clicking on the submit button:





    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        if (questionCounter < quiz.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            $(".sakri").show()
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + " %");
            prikazBodova.text(bodovi);

            $("#input-q2").attr("value", bodovi)

        }

        // Load the next question and set of answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Remove all selections, highlighting, and feedback
        deselectAnswer();
        clearHighlightsAndFeedback();


        // Hide the continue button
        continueBtn.hide(300);

        // Enable ability to select an answer
        answerDiv.on('click', function () {
            // Make the submit button visible
            // Remove pointer from any answer that already has it
            deselectAnswer();
            // Put pointer on clicked answer
            selectAnswer(this);
            // Store current answer div for highlighting purposes
            getSelectedAnswerDivs(this);
            // Store current selection as user answer
            getUserAnswer(this);
            odgovor()
        });

    }

    // Clicking on the continue button:
    continueBtn.on('click', function () {



    });

    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.on('click', function () {
        // Go to the first page
        // Start the quiz over
        newQuiz();
        resultsPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });

    // Clicking on the spanish button:
    // Link takes user to Duolingo

});

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }


    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0 /*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}