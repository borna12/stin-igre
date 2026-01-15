let baza = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDcSWfRway0gIUWOSnGWj6oHcEnyvlZK31n1yJS9SGfjDgSwBj1Z5hFl3U8f5W8bIvPM8iP0A1BWjs/pub?output=csv";

// === CSV baza (lokalna datoteka) ===
// Ako je CSV u istoj mapi kao i index.html, ostavi ovako.
// Ako koristiš drugi putanju/ime, promijeni varijablu baza.

let podatci = [];        // redci iz CSV-a (objekti)
let pitanja = [];        // niz stringova za odabranu razinu

// Učitavanje CSV-a (PapaParse)
Papa.parse(baza, {
    dynamicTyping: false,
    download: true,
    header: true,
    skipEmptyLines: true,
    transformHeader: function (h) { return String(h).trim().replace(/\s/g, ''); },
    complete: function (data) {
        podatci = (data && data.data) ? data.data : [];
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    },
    error: function (err) {
        console.error("Greška pri učitavanju CSV-a:", err);
        Swal.fire({
            title: "Greška",
            html: "<p style='text-align:center; font-size:1.2em;'>Ne mogu učitati CSV datoteku.</p>",
            confirmButtonText: "U redu",
            backdrop: false
        });
    }
});

// === Globalne varijable (score/timer) ===
var initPage,
    questionsPage,
    resultsPage,
    startBtn,
    retakeBtn,
    question,
    definicija,
    userScore,
    prikazBodova,
    countdownTimer,
    bodovi = 0,
    vrijeme = 0,
    questionCounter = 0,
    correctAnswersCounter = 0,
    correctAnswer = "",
    set_pitanja; // postavlja se klikom na razinu u HTML-u

function shuffle(array) {
    var i = 0, j = 0, temp = null;
    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function normalizeInput(s) {
    return String(s || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve) => {
        countdownTimer = setInterval(() => {
            timeleft--;
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;

            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            } else if (timeleft <= 1) {
                $("#sekunde").html("sekunda");
                $("#ostalo").html("ostala");
            } else if (timeleft <= 4) {
                $("#sekunde").html("sekunde");
            }
        }, 1000);
    });
}

function buildPitanjaZaRazinu() {
    let col = "razina1";
    if (set_pitanja == 2) col = "razina2";
    if (set_pitanja == 3) col = "razina3";

    pitanja = podatci
        .map(r => (r ? r[col] : ""))
        .filter(v => v !== null && v !== undefined && String(v).trim() !== "")
        .map(v => String(v).trim());

    shuffle(pitanja);
}

function newQuiz() {
    bodovi = 0;
    vrijeme = 0;
    questionCounter = 0;
    correctAnswersCounter = 0;

    // priprema pitanja iz CSV-a za odabranu razinu
    buildPitanjaZaRazinu();

    // UI
    resultsPage.hide();
    questionsPage.show(300);
    initPage.hide();

    // učitaj prvo pitanje
    generateQuestion();
}

function generateQuestion() {
    // sigurnost ako nema pitanja
    if (!pitanja || pitanja.length === 0) {
        Swal.fire({
            title: "Nema pitanja",
            html: "<p style='text-align:center; font-size:1.2em;'>Za odabranu razinu nema unosa u CSV-u.</p>",
            confirmButtonText: "U redu",
            backdrop: false
        }).then(() => location.reload());
        return;
    }

    // očisti timer
    clearInterval(countdownTimer);

    // postavi prompt i točan odgovor
    correctAnswer = pitanja[questionCounter];

    question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + pitanja.length + ".</span><br>");
    definicija.html("<span class='gla'>" + correctAnswer + "</span>");

    // timer
    $(".vrijeme").html('<progress value="60" max="60" id="pageBeginCountdown"></progress><p style="margin-top:6px;"><span id="pageBeginCountdownText">60</span> <span id="sekunde">sekundi</span> <span id="ostalo">ostalo</span></p>');

    // reset input
    $("#userInput").val("").focus();

    // start countdown; ako istekne, tretiraj kao timeout
    ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(() => evaluateAnswer(true));
}

function showResultAndContinue(isCorrect, isTimeout, userText) {
    let ide = (questionCounter !== pitanja.length - 1);

    if (isTimeout) {
        $("#krivo")[0].play();
        bodovi -= 10;
        Swal.fire({
            title: "Isteklo je vrijeme.",
            html: "<p style='text-align:center; font-size: 1.5em;'><strong>Točno je: <span style='color:#bb422a;'>" + correctAnswer + "</span> (<span class='gla2'>" + correctAnswer + "</span>)</strong></p>",
            showCloseButton: true,
            confirmButtonText: 'dalje',
            backdrop: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => nextQuestion(ide));
        return;
    }

    if (isCorrect) {
        correctAnswersCounter++;
        bodovi += 10;
        $("#tocno")[0].play();

        let broj = vrijeme + 10;
        Swal.fire({
            title: "<span style='color:green'>Točno</span>",
            html: "<span style='font-size:1.5em'>+" + broj + "</span>",
            showCloseButton: true,
            confirmButtonText: 'dalje',
            backdrop: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => nextQuestion(ide));
    } else {
        $("#krivo")[0].play();
        bodovi -= 10;

        Swal.fire({
            title: "<span style='color:#bb422a'>Netočno</span>",
            html: "<p style='text-align:center; font-size: 1.5em;'><strong>Upisano je: <span style='color:#bb422a;'>" + (userText || "") + " (<span class='gla2'>" + correctAnswer + "</span>)</span></strong></p>"
                + "<p style='text-align:center; font-size: 1.5em;'><strong>Točno je: <span style='color:#bb422a;'>" + correctAnswer + "</span>  (<span class='gla2'>" + correctAnswer + "</span>)</strong></p>",
            showCloseButton: true,
            confirmButtonText: 'dalje',
            backdrop: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => nextQuestion(ide));
    }
}

function evaluateAnswer(isTimeout) {
    // zaustavi timer
    clearInterval(countdownTimer);

    // bodovi po preostalom vremenu (kao u originalu)
    vrijeme = parseInt($("#pageBeginCountdownText").text(), 10);
    if (!Number.isFinite(vrijeme)) vrijeme = 0;
    bodovi += vrijeme;

    if (isTimeout === true) {
        showResultAndContinue(false, true, "");
        return;
    }

    const userTextRaw = $("#userInput").val();
    const isCorrect = normalizeInput(userTextRaw) === normalizeInput(correctAnswer);

    showResultAndContinue(isCorrect, false, userTextRaw);
}

function nextQuestion(ide) {
    if (ide) {
        questionCounter++;
        generateQuestion();
    } else {
        // završetak
        $('.questions-page').hide();
        $('.results-page').show();
        $('.sakri').show();

        userScore.text(Math.floor((correctAnswersCounter / pitanja.length) * 100) + " %");
        prikazBodova.text(bodovi);
        $("#input-q2").attr("value", bodovi);
    }
}

$(document).ready(function () {
    initPage = $('.init-page');
    questionsPage = $('.questions-page');
    resultsPage = $('.results-page');

    startBtn = $('.init-page__btn, .results-page__retake-btn');
    retakeBtn = $('.results-page__retake-btn');

    question = $('.questions-page__question');
    definicija = $('.definicija');

    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');

    // inicijalni state
    questionsPage.hide();
    resultsPage.hide();

    // start (klik na razinu)
    startBtn.on('click', function () {
        newQuiz();
    });

    // submit (klik)
    $(document).on('click', '#submitAnswer', function () {
        evaluateAnswer(false);
    });

    // submit (Enter u inputu)
    $(document).on('keydown', '#userInput', function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            evaluateAnswer(false);
        }
    });
});
