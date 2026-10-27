/* =========================================
   CUTE SURPRISE WEBSITE
   JAVASCRIPT
   ========================================= */

const openingScreen = document.getElementById("opening-screen");
const messagesScreen = document.getElementById("messages-screen");
const factsScreen = document.getElementById("facts-screen");
const questionScreen = document.getElementById("question-screen");
const finalScreen = document.getElementById("final-screen");

const openButton = document.getElementById("open-button");
const continueButton = document.getElementById("continue-button");
const factsContinueButton = document.getElementById("facts-continue-button");

const typewriterText = document.getElementById("typewriter-text");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const questionMessage = document.getElementById("question-message");

const replayButton = document.getElementById("replay-button");

const tapSparkleContainer =
    document.getElementById("tap-sparkle-container");

const confettiContainer =
    document.getElementById("confetti-container");


/* =========================================
   PAGE SWITCHING
   ========================================= */

function showScreen(screenToShow) {

    const allScreens = document.querySelectorAll(".screen");

    allScreens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");
}


/* =========================================
   OPENING BUTTON
   ========================================= */

openButton.addEventListener("click", function() {

    showScreen(messagesScreen);

    startTypewriter();

});


/* =========================================
   TYPEWRITER MESSAGES
   ========================================= */

const messages = [

    "Okay... tiny announcement incoming. 🤭",

    "This page contains absolutely no useful information.",

    "Except for one extremely important observation... ✨",

    "Some people just have that smile that makes the day better.",

    "And somehow, you are also ridiculously adorable.",

    "Scientists are still trying to explain this phenomenon. 🔬",

    "Their current conclusion: yep... definitely cute. 🌸"

];


let currentMessage = 0;
let currentCharacter = 0;


function startTypewriter() {

    currentMessage = 0;
    currentCharacter = 0;

    typewriterText.textContent = "";

    continueButton.classList.add("hidden");

    typeNextMessage();

}


function typeNextMessage() {

    if (currentMessage >= messages.length) {

        continueButton.classList.remove("hidden");

        return;
    }

    const message = messages[currentMessage];

    typewriterText.textContent = "";
    currentCharacter = 0;

    typeCharacter(message);

}


function typeCharacter(message) {

    if (currentCharacter < message.length) {

        typewriterText.textContent +=
            message.charAt(currentCharacter);

        currentCharacter++;

        /* Slower typing speed */
        setTimeout(function() {
            typeCharacter(message);
        }, 75);

    } else {

        /* Slightly longer pause between messages */
        setTimeout(function() {

            currentMessage++;

            typeNextMessage();

        }, 1500);

    }

}


/* =========================================
   SCREEN 2 → SCREEN 3
   ========================================= */

continueButton.addEventListener("click", function() {

    showScreen(factsScreen);

});


/* =========================================
   FACT CARDS
   ========================================= */

const factCards =
    document.querySelectorAll(".fact-card");

factCards.forEach(function(card) {

    card.addEventListener("click", function(event) {

        card.classList.toggle("revealed");

        createTapSparkle(
            event.clientX,
            event.clientY
        );

    });

});


/* =========================================
   SCREEN 3 → SCREEN 4
   ========================================= */

factsContinueButton.addEventListener("click", function() {

    showScreen(questionScreen);

});


/* =========================================
   PLAYFUL QUESTION
   ========================================= */

let yesSize = 1;
let noAttempts = 0;


noButton.addEventListener("click", function(event) {

    event.preventDefault();

    noAttempts++;

    yesSize += 0.12;

    yesButton.style.transform =
        `scale(${yesSize})`;


    const noMessages = [

        "Hmm... suspicious answer. 🤨",

        "Are you absolutely sure? 👀",

        "The evidence says otherwise. 📋",

        "Nice try. 😌",

        "Okay, the button is getting nervous now. 😂",

        "I think we're running out of options here. ✨"

    ];


    const messageIndex =
        Math.min(noAttempts - 1, noMessages.length - 1);

    questionMessage.textContent =
        noMessages[messageIndex];


    moveNoButton();

});


function moveNoButton() {

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const maxX =
        Math.max(10, screenWidth - buttonWidth - 20);

    const maxY =
        Math.max(10, screenHeight - buttonHeight - 20);

    const randomX =
        Math.floor(Math.random() * maxX);

    const randomY =
        Math.floor(Math.random() * maxY);

    noButton.style.position = "fixed";

    noButton.style.left = `${randomX}px`;

    noButton.style.top = `${randomY}px`;

}


/* =========================================
   YES BUTTON
   ========================================= */

yesButton.addEventListener("click", function() {

    questionMessage.textContent =
        "Correct answer! The official report agrees. 😌✨";

    yesButton.style.transform =
        "scale(1.15)";

    setTimeout(function() {

        showScreen(finalScreen);

        createConfetti();

    }, 900);

});


/* =========================================
   CONFETTI
   ========================================= */

function createConfetti() {

    confettiContainer.innerHTML = "";

    const symbols = [
        "✦",
        "✧",
        "✨",
        "🌸",
        "✿"
    ];

    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("div");

        piece.classList.add("confetti-piece");

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDuration =
            (2.5 + Math.random() * 2) + "s";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.textContent =
            symbols[
                Math.floor(Math.random() * symbols.length)
            ];

        confettiContainer.appendChild(piece);

    }

}


/* =========================================
   TAP SPARKLE EFFECT
   ========================================= */

document.addEventListener("click", function(event) {

    if (!event.target.closest(".fact-card")) {

        createTapSparkle(
            event.clientX,
            event.clientY
        );

    }

});


function createTapSparkle(x, y) {

    const sparkle =
        document.createElement("div");

    sparkle.classList.add("tap-sparkle");

    sparkle.textContent = "✦";

    sparkle.style.left = `${x}px`;

    sparkle.style.top = `${y}px`;

    tapSparkleContainer.appendChild(sparkle);

    setTimeout(function() {

        sparkle.remove();

    }, 700);

}


/* =========================================
   REPLAY BUTTON
   ========================================= */

replayButton.addEventListener("click", function() {

    yesSize = 1;

    yesButton.style.transform =
        "scale(1)";

    noButton.style.position = "";

    noButton.style.left = "";

    noButton.style.top = "";

    questionMessage.textContent = "";

    confettiContainer.innerHTML = "";

    showScreen(openingScreen);

});
