// index.js
console.log("I brought my gears")

$(document).ready(function(){
var currentQuestion;
var operator;
var timeLeft = 10;
var interval;
var score = 0;
var highScore = 0;

const slider = document.getElementById('number-limit');
const sliderDisplay = document.getElementById('number-output');
    sliderDisplay.innerHTML = slider.value;

    slider.oninput = function() {
      sliderDisplay.innerHTML = this.value;
  }


const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const times = document.getElementById('times');
const divide = document.getElementById('divide');

var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

var getOperator = function() {
    var operators = [];
    if (plus.checked === true) {
            operators.push('+');
        }
    if (minus.checked === true) {
            operators.push('-');  
        }
    if (times.checked === true) {
            operators.push('*');
        }
    if (divide.checked === true) {
            operators.push('/');
        }
    if (operators.length === 0) {
            operator = '+';
        } else if (operators.length === 1) {
            operator = operators[0];
        } else {
            let i = Math.floor(Math.random() * operators.length);
            operator = operators[i];
        }
        return operator;
    }
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(slider.value);
    var num2 = randomNumberGenerator(slider.value);

        var smallestNumber;

        while(num1 === num2) {
            num1 = randomNumberGenerator(slider.value);
        }

        if (num1 < num2) {
            smallestNumber = num1;
            num1 = num2;
            num2 = smallestNumber;
        }

        var num3 = num1 * num2;
    
    getOperator();
        if (operator === '+') {
            question.answer = num1 + num2;
            question.equation = String(num1) + operator + String(num2);
        } else if (operator === '-') {
            question.answer = num1 - num2;
            question.equation = String(num1) + operator + String(num2);
        } else if (operator === '*') {
            question.answer = num1 * num2;
            question.equation = String(num1) + operator + String(num2);
        } else if (operator === '/') {
            question.answer = num3 / num1;
            question.equation = String(num3) + operator + String(num1);
        }
    
    console.log(num1);
    console.log(num2);
    console.log(num3);
    
    return question;
  }
  

  var renderNewQuestion = function (){
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

var checkAnswer = function (userInput, answer) {
    if (userInput === answer){
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
    }
  }
  
  $('.equationType').onclick = function () {
    getOperator();        
};

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var startGame = function () {
    if (!interval) {
        if (timeLeft === 0){
            updateTimeLeft(10);
            updateScore(-score);
        }

      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
          updateHighScore();
        }
      }, 1000);  
    }
  }

  //$('#equation').one('click', startGame());

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateHighScore = function () {
    if (score > highScore){
    highScore = score;
    }
    $('#highScore').text(highScore);
  }

});