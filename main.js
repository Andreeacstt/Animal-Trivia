//Adapted from https://www.codingem.com/javascript-user-input/ (Artturi Jalli)
var nickname = prompt("Please enter your name: ");

//Adapted from https://www.sitepoint.com/simple-javascript-quiz/ (Yaphi Berhanu, James Hibbard, 11/02/2020) 
var quizQuestions = [
    {
        question: "1.Which mammal is known to have the most powerful bite in the world?",
        answers: {
            a: "Elephant",
            b: "Lion",
            c: "Hippopotamus",
			d: "Leopard"
        },
        answer: "c"
    },
    {
        question: "2.Which is the only mammal that lays eggs and feeds milk to their young?",
        answers: {
            a: "Anteater",
            b: "Platypus",
            c: "Prairie dog",
			d: "Whale"
        },
        answer: "b"
    },
    {
        question: "3.What is the loudest animal in the world?",
        answers: {
            a: "Howler Monkey",
            b: "Lion",
            c: "Blue Whale",
			d: "Wolf"
        },
        answer: "c"
    },
    {
        question: "4.How many years does a cicada live underground?",
        answers: {
            a: "17",
            b: "22",
            c: "24",
			d: "31"
        },
        answer: "a"
    },
    {
        question: "5.What is the fastest land animal?",
        answers: {
            a: "Horse",
            b: "Cheetah",
            c: "Antelope",
			d: "Pronghorn"
        },
        answer: "b"
    },
	{
		question: "6.What is an apex predator?",
		answers: {
			a: "A monkey that preys on other wild life",
			b: "A nocturnal predator",
			c: "An animal that has no natural predators",
			d: "All of the above"
		},
		answer: "c"
	},
	{
		question: "7.Which common house pet was worshipped in ancient Egypt?",
		answers: {
			a: "Dog",
			b: "Hamster",
			c: "Goldfish",
			d: "Cat"
		},
		answer: "d"
	},
	{
		question: "8.A group of crows are referred to as a what?",
		answers: {
			a: "A murder",
			b: "A flock",
			c: "A pack",
			d: "A pride"
		},
		answer: "a"
	},
	{
		question: "9.Why is the common basilisk nicknamed the Jesus Lizard?",
		answers: {
			a: "They have been found in church basements",
			b: "It can run on water",
			c: "It is associated with miracles",
			d: "It has a cross sign on its back"
		},
		answer: "b"
	},	
	{
		question: "10.What mammal has the longest lifespan?",
		answers: {
			a: "Bowhead whales",
			b: "Elephant",
			c: "Gorilla",
			d: "Horse"
		},
		answer: "a"
	}
];

function quiz(){
	
	//Stores the output
	var output=[];
		quizQuestions.forEach((currentQuestion, questionNumber) => {
		
        //Stores answers
        var answers = [];
        for(letter in currentQuestion.answers) {

            //Add HTML radio button
            answers.push(
				`<label>
				<input type="radio" name="question${questionNumber}" value="${letter}">
					${letter} :
					${currentQuestion.answers[letter]}
				</label>`
            );
        }

        output.push(
            `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join("")}</div>
            </div>`
             
        );
    });
    quizContainer.innerHTML = output.join("");
}

function results(){

    //Gather answer from the quiz
    var answerContainers = quizContainer.querySelectorAll(".answers");
    var numCorrect = 0;

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
		
        //Selects which radio button has been checked
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
		
		 //If answer is correct
        if(userAnswer === currentQuestion.answer) {
			
            //Add to total of correct answers
            numCorrect++;
        } 
    });

    //Show total score out of total questions
    resultsContainer.innerHTML = `${nickname}, your total score is ${numCorrect} out of ${quizQuestions.length}`;
}


function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    //For first slide hide previous button
    if(currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    //For last slide hide next button and show submit and replay buttons
    if(currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
		replayButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
		replayButton.style.display = "none";
    }
	
}

function replay() {
	location.reload();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");


//Display quiz 
quiz();

var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var replayButton = document.getElementById("replay");
var slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//Display slides
showSlide(0);

//Click to replay the quiz
//Adapted from http://www.jacobenfield.com/jakeWeb/JS_GAMES/lesson18/index.php
replayButton.addEventListener("click", replay);

//Showing results when clicking submit
submitButton.addEventListener("click", results);

//Click to show next or previous slides
previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);