let gameSequence = [];
let userSequence = [];
let score = 0;
let btns = ["yellow", "red", "purple", " green"];

let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let started = false;
let level = 0;

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function startGame() {
  if (!started) {
    score = 0;
    level = 0;
    gameSequence = [];
    started = true;
    levelUp();
  }
}

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randInx = Math.floor(Math.random() * 3);
  let randColor = btns[randInx];
  let randButton = document.querySelector(`.${randColor}`);
  gameSequence.push(randColor)
  gameFlash(randButton);
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSequence.push(userColor);
  checkAns(userSequence.length - 1);
}

function checkAns(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length === gameSequence.length) {
      score++;
      setTimeout(levelUp, 500);
    }
  } else {
    reset();
  }
}

function reset() {
  body.classList.add("flashBackground");
  h2.innerText = `Game Over \n Your Score is ${score} \n Press any key to restart the Game`;
  setTimeout(function() {
  body.classList.remove("flashBackground");
  }, 250);
  started = false;
  document.addEventListener("keypress", startGame);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove('flash')
  },
    300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove('userflash')
  },
    300);
}


document.addEventListener("keypress", startGame);

