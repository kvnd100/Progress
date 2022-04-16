'use strict';

var ctx = null;
var gameMap = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
var tileW = 40,
  tileH = 40;
var mapW = 10,
  mapH = 10;
var currentSecond = 0,
  frameCount = 0,
  framesLastSecond = 0,
  lastFrameTime = 0;

const overlay = document.querySelector('.overlay');
const message = document.querySelector('.message__text');
const messageTime = document.querySelector('.header__message');
const modal = document.querySelector('.modal');
const modalButton1 = document.querySelector('.close-modal--1');
const modalButton2 = document.querySelector('.close-modal--2');
const modalButton3 = document.querySelector('.close-modal--3');
const modalButton4 = document.querySelector('.close-modal--4');
const modalTime = document.querySelector('.modal__timer');
const labelTime = document.querySelector('.header__timer');
const labelScore = document.querySelector('.header__score');
const labelHighscore = document.querySelector('.header__highscore');
const image = document.querySelector('.modal__img');
const btnAgain = document.querySelector('.again');
let currentSpeed = 1;
let timer,
  highscore = 0;

let randomNum;
let time = 60;

//test

// console.log(modalButton1.style.setProperty('top', '40%'));
// console.log(modalButton2.style.setProperty('top', '20%'));

//shuffle question

const shuffleQuestion = function () {
  //creating a random number to swap images
  const random = Math.trunc(Math.random() * 3 + 1);
  //change img
  image.src = `../images/question${random}.png`;
  //updating button text
  switch (random) {
    case 1:
      modalButton1.textContent = '110';
      modalButton2.textContent = '101';
      modalButton3.textContent = '100';
      modalButton4.textContent = '111';
      break;
    case 2:
      modalButton1.textContent = '11';
      modalButton2.textContent = '55';
      modalButton3.textContent = '56';
      modalButton4.textContent = '44';

      break;
    case 3:
      modalButton1.textContent = '1';
      modalButton2.textContent = '2';
      modalButton3.textContent = '3';
      modalButton4.textContent = '4';
      break;
  }
  return random;
};
//invoking random image on refresh
randomNum = shuffleQuestion();

//question logic

//1
const answerQuestion = function () {
  modalButton1.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time -= 30;
    return false;
  });
  modalButton2.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time += 30;
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    correctBlock();
    return true;
  });
  modalButton3.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time -= 30;

    return false;
  });
  modalButton4.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time -= 30;

    return false;
  });
};

//2

const answerQuestion2 = function () {
  modalButton1.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time -= 30;
    return false;
  });
  modalButton2.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time += 30;
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    correctBlock();
    return true;
  });
  modalButton3.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time -= 30;

    return false;
  });
  modalButton4.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    time -= 30;

    return false;
  });
};

//block
const mainBlock = function () {
  gameMap[toIndex(6, 1)] = gameMap[toIndex(6, 1)] === 2 ? 0 : 2;

  gameMap[toIndex(8, 3)] = gameMap[toIndex(8, 3)] === 2 ? 0 : 2;
  gameMap[toIndex(8, 5)] = gameMap[toIndex(8, 5)] === 2 ? 0 : 2;

  gameMap[toIndex(7, 8)] = gameMap[toIndex(7, 8)] === 2 ? 0 : 2;
};
const correctBlock = function () {
  gameMap[toIndex(9, 8)] = gameMap[toIndex(9, 8)] === 0 ? 2 : 0;
  gameMap[toIndex(9, 1)] = gameMap[toIndex(9, 1)] === 0 ? 2 : 0;
  gameMap[toIndex(9, 4)] = gameMap[toIndex(9, 4)] === 0 ? 2 : 0;
};
const roadBlock = function () {
  gameMap[toIndex(7, 1)] = gameMap[toIndex(8, 1)] == 2 ? 0 : 0;
};
//win
const gameWin = function () {
  clearInterval(timer);
  const score = time * 10;
  if (score > highscore) {
    labelHighscore.textContent = score;
    highscore = score;
  }
  message.textContent = 'You win! 🎉';
  messageTime.textContent = 'Well Played 👏';
  labelScore.textContent = score;
  currentSpeed = 0;
};

//play again

btnAgain.addEventListener('click', function () {
  //clear countdown
  if (timer) clearInterval(timer);
  //reset score
  labelScore.textContent = '0';
  labelTime.textContent = '01:00';
  modalTime.textContent = '01:00';
  message.textContent = 'Good Luck! 🤞';
  messageTime.textContent = 'Time is running out! ⏳';
  //reset player position
  player.position = [5, 165];
  player.tileTo = [0, 4];
  player.tileFrom = [0, 4];
  //reset time
  timer = undefined;
  time = 60;
  //reset map
  gameMap[toIndex(7, 1)] = 1;
  mainBlock();
  correctBlock();
  currentSpeed = 1;
  //wrong answer timeout
  if (gameMap[toIndex(9, 8)] !== 0) {
    correctBlock();
  }
  if (gameMap[toIndex(6, 1)] !== 2) {
    mainBlock();
  }
  //invoking random image on reset
  randomNum = shuffleQuestion();

  // delete tileEvents[17] = drawBridge1;
});

//timer function

const startTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // display time in UI
    labelTime.textContent = `${min}:${sec}`;
    modalTime.textContent = `${min}:${sec}`;
    // When 0 seconds stop timer
    if (time <= 0) {
      clearInterval(timer);
      message.textContent = 'You Lose! 😢';
      //in case wrong answer timeout
      if (!modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
      }
      labelTime.textContent = '00:00';
      messageTime.textContent = 'Ran out of time 🎃';
      currentSpeed = 0;
    }

    // Decrease 1s
    time--;
  };

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

var tileEvents = {
  17: question1,
  18: roadBlock,
  19: gameWin,
  48: question2,
  49: gameWin,
  88: question3,
  89: gameWin,
};
function question1() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  //road block
  // gameMap[toIndex(6, 1)] = 0;
  // gameMap[toIndex(9, 1)] = 2;
  mainBlock();
  answerQuestion();

  // delete tileEvents[17];
}
function question2() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  // gameMap[toIndex(6, 1)] = 0;
  answerQuestion();

  //road blocks
  // gameMap[toIndex(9, 4)] = 2;
  // gameMap[toIndex(8, 3)] = 0;
  // gameMap[toIndex(8, 5)] = 0;
  mainBlock();
}
function question3() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  answerQuestion();

  //road block
  // gameMap[toIndex(9, 8)] = 2;
  // gameMap[toIndex(7, 8)] = 0;
  mainBlock();
}

// var tileset = null,
//   tilesetURL = 'tileset.png',
//   tilesetLoaded = false;

// var gameTime = 0;
// const gameSpeeds = [
//   { name: 'Normal', mult: 1 },
//   { name: 'Slow', mult: 0.3 },
//   { name: 'Fast', mult: 3 },
//   { name: 'Paused', mult: 0 },
// ];

var floorTypes = {
  solid: 0,
  grass: 1,
  path: 2,
};
var tileTypes = {
  0: {
    colour: '#E9A505',
    floor: floorTypes.solid,
  },
  1: {
    colour: '#5aa457',
    floor: floorTypes.grass,
  },
  2: {
    colour: '#e06817',
    floor: floorTypes.path,
  },
};

var directions = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

var keysDown = {
  37: false,
  38: false,
  39: false,
  40: false,
};

var viewport = {
  screen: [0, 0],
  startTile: [0, 0],
  endTile: [0, 0],
  offset: [0, 0],
  update: function (px, py) {
    this.offset[0] = Math.floor(this.screen[0] / 2 - px);
    this.offset[1] = Math.floor(this.screen[1] / 2 - py);

    var tile = [Math.floor(px / tileW), Math.floor(py / tileH)];

    this.startTile[0] = tile[0] - 1 - Math.ceil(this.screen[0] / 2 / tileW);
    this.startTile[1] = tile[1] - 1 - Math.ceil(this.screen[1] / 2 / tileH);

    if (this.startTile[0] < 0) {
      this.startTile[0] = 0;
    }
    if (this.startTile[1] < 0) {
      this.startTile[1] = 0;
    }

    this.endTile[0] = tile[0] + 1 + Math.ceil(this.screen[0] / 2 / tileW);
    this.endTile[1] = tile[1] + 1 + Math.ceil(this.screen[1] / 2 / tileH);

    if (this.endTile[0] >= mapW) {
      this.endTile[0] = mapW - 1;
    }
    if (this.endTile[1] >= mapH) {
      this.endTile[1] = mapH - 1;
    }
  },
};

class Character {
  constructor() {
    this.tileFrom = [0, 4];
    this.tileTo = [0, 4];
    this.timeMoved = 0;
    this.dimensions = [30, 30];
    this.position = [5, 165];

    this.delayMove = {};
    this.delayMove[floorTypes.path] = 400;
    this.delayMove[floorTypes.grass] = 100;
    // this.delayMove[floorTypes.ice] = 300;
    // this.delayMove[floorTypes.conveyorU] = 200;
    // this.delayMove[floorTypes.conveyorD] = 200;
    // this.delayMove[floorTypes.conveyorL] = 200;
    // this.delayMove[floorTypes.conveyorR] = 200;
    this.direction = directions.up;
    // this.sprites = {};
    // this.sprites[directions.up] = [{ x: 0, y: 120, w: 30, h: 30 }];
    // this.sprites[directions.right] = [{ x: 0, y: 150, w: 30, h: 30 }];
    // this.sprites[directions.down] = [{ x: 0, y: 180, w: 30, h: 30 }];
    // this.sprites[directions.left] = [{ x: 0, y: 210, w: 30, h: 30 }];
  }
  placeAt(x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];
    this.position = [
      tileW * x + (tileW - this.dimensions[0]) / 2,
      tileH * y + (tileH - this.dimensions[1]) / 2,
    ];
  }
  processMovement(t) {
    if (
      this.tileFrom[0] == this.tileTo[0] &&
      this.tileFrom[1] == this.tileTo[1]
    ) {
      return false;
    }

    var moveSpeed =
      this.delayMove[
        tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor
      ];

    if (t - this.timeMoved >= moveSpeed) {
      this.placeAt(this.tileTo[0], this.tileTo[1]);

      if (
        typeof tileEvents[toIndex(this.tileTo[0], this.tileTo[1])] !=
        'undefined'
      ) {
        tileEvents[toIndex(this.tileTo[0], this.tileTo[1])](this);
      }

      var tileFloor =
        tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

      if (tileFloor == floorTypes.ice) {
        if (this.canMoveDirection(this.direction)) {
          this.moveDirection(this.direction, t);
        }
      } else if (tileFloor == floorTypes.conveyorL && this.canMoveLeft()) {
        this.moveLeft(t);
      } else if (tileFloor == floorTypes.conveyorR && this.canMoveRight()) {
        this.moveRight(t);
      } else if (tileFloor == floorTypes.conveyorU && this.canMoveUp()) {
        this.moveUp(t);
      } else if (tileFloor == floorTypes.conveyorD && this.canMoveDown()) {
        this.moveDown(t);
      }
    } else {
      this.position[0] =
        this.tileFrom[0] * tileW + (tileW - this.dimensions[0]) / 2;
      this.position[1] =
        this.tileFrom[1] * tileH + (tileH - this.dimensions[1]) / 2;

      if (this.tileTo[0] != this.tileFrom[0]) {
        var diff = (tileW / moveSpeed) * (t - this.timeMoved);
        this.position[0] += this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff;
      }
      if (this.tileTo[1] != this.tileFrom[1]) {
        var diff = (tileH / moveSpeed) * (t - this.timeMoved);
        this.position[1] += this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff;
      }

      this.position[0] = Math.round(this.position[0]);
      this.position[1] = Math.round(this.position[1]);
    }

    return true;
  }
  canMoveTo(x, y) {
    if (x < 0 || x >= mapW || y < 0 || y >= mapH) {
      return false;
    }
    if (
      typeof this.delayMove[tileTypes[gameMap[toIndex(x, y)]].floor] ==
      'undefined'
    ) {
      return false;
    }
    return true;
  }
  canMoveUp() {
    return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1);
  }
  canMoveDown() {
    return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1);
  }
  canMoveLeft() {
    return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]);
  }
  canMoveRight() {
    return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]);
  }
  canMoveDirection(d) {
    switch (d) {
      case directions.up:
        return this.canMoveUp();
      case directions.down:
        return this.canMoveDown();
      case directions.left:
        return this.canMoveLeft();
      default:
        return this.canMoveRight();
    }
  }
  moveLeft(t) {
    this.tileTo[0] -= 1;
    this.timeMoved = t;
    this.direction = directions.left;
  }
  moveRight(t) {
    this.tileTo[0] += 1;
    this.timeMoved = t;
    this.direction = directions.right;
  }
  moveUp(t) {
    this.tileTo[1] -= 1;
    this.timeMoved = t;
    this.direction = directions.up;
  }
  moveDown(t) {
    this.tileTo[1] += 1;
    this.timeMoved = t;
    this.direction = directions.down;
  }
  moveDirection(d, t) {
    switch (d) {
      case directions.up:
        return this.moveUp(t);
      case directions.down:
        return this.moveDown(t);
      case directions.left:
        return this.moveLeft(t);
      default:
        return this.moveRight(t);
    }
  }
}
var player = new Character();

function toIndex(x, y) {
  return y * mapW + x;
}

function getFrame(sprite, duration, time, animated) {
  if (!animated) {
    return sprite[0];
  }
  time = time % duration;

  for (x in sprite) {
    if (sprite[x].end >= time) {
      return sprite[x];
    }
  }
}

window.onload = function () {
  ctx = document.getElementById('game').getContext('2d');
  requestAnimationFrame(drawGame);
  ctx.font = 'bold 10pt sans-serif';

  window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      keysDown[e.keyCode] = true;
      //Start Timer

      if (!timer) {
        timer = startTimer();
      }
    }
  });
  window.addEventListener('keyup', function (e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      keysDown[e.keyCode] = false;
    }
    if (e.keyCode == 83) {
      currentSpeed =
        currentSpeed >= gameSpeeds.length - 1 ? 0 : currentSpeed + 1;
    }
  });

  viewport.screen = [
    document.getElementById('game').width,
    document.getElementById('game').height,
  ];
};

function drawGame() {
  if (ctx == null) {
    return;
  }

  var currentFrameTime = Date.now();
  var timeElapsed = currentFrameTime - lastFrameTime;

  var sec = Math.floor(Date.now() / 1000);
  if (sec != currentSecond) {
    currentSecond = sec;
    framesLastSecond = frameCount;
    frameCount = 1;
  } else {
    frameCount++;
  }

  if (!player.processMovement(currentFrameTime) && currentSpeed != 0) {
    if (keysDown[38] && player.canMoveUp()) {
      player.moveUp(currentFrameTime);
    } else if (keysDown[40] && player.canMoveDown()) {
      player.moveDown(currentFrameTime);
    } else if (keysDown[37] && player.canMoveLeft()) {
      player.moveLeft(currentFrameTime);
    } else if (keysDown[39] && player.canMoveRight()) {
      player.moveRight(currentFrameTime);
    }
  }

  viewport.update(
    player.position[0] + player.dimensions[0] / 2,
    player.position[1] + player.dimensions[1] / 2
  );

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

  for (var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
    for (var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
      ctx.fillStyle = tileTypes[gameMap[toIndex(x, y)]].colour;

      ctx.fillRect(
        viewport.offset[0] + x * tileW,
        viewport.offset[1] + y * tileH,
        tileW,
        tileH
      );
    }
  }

  ctx.fillStyle = '#000';
  ctx.fillRect(
    viewport.offset[0] + player.position[0],
    viewport.offset[1] + player.position[1],
    player.dimensions[0],
    player.dimensions[1]
  );

  ctx.fillStyle = '#ff0000';
  ctx.fillText('FPS: ' + framesLastSecond, 10, 20);

  lastFrameTime = currentFrameTime;
  requestAnimationFrame(drawGame);
}
