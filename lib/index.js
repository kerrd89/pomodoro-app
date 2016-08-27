'use strict';

require('./scss/styles');
require('./event-listeners');
const $ = require('jquery');
const Pomodoro = require('./pomodoro');
const Timer = require('./timer');
require('./build');

let $startButton =  $('.start-button-js');
let $pauseButton =  $('.pause-button-js');
let $resumeButton =  $('.resume-button-js');
let $resetButton =  $('.reset-button-js');

let pomodoro = new Pomodoro();

// pomodoro.getStorage();

function addTimers() {
  pomodoro.addTimer();
  pomodoro.addTimer(0.1,'pending', 'break');
}

function startActiveTimer() {
  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState === 'unstarted') {
      pomodoro.timers[i].startTimer();
      console.log(pomodoro.timers);
      console.log(pomodoro.timers[i]);
      pomodoro.tick(i);
    }
  }
}

$startButton.on('click', function() {
  if (pomodoro.timers.length !== 2) {
    addTimers();
    startActiveTimer();
  } else {
    startActiveTimer();
  }
});
$pauseButton.on('click', function() {
  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState === 'running') {
      pomodoro.timers[i].pauseTimer();
    }
  }
});

function checkBeforeResume(n) {
  if (pomodoro.timers.length === 0) return;
  if (pomodoro.timers[n].currentState !== 'paused') return;
}

$resumeButton.on('click', function() {
  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState === 'paused') {
      checkBeforeResume(i);
      pomodoro.timers[i].resumeTimer();
      pomodoro.tick(i);
    }
  }
});

$resetButton.on('click', function() {
  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState !== 'unstarted'
    && pomodoro.timers[i].currentState !== 'finished'
    && pomodoro.timers[i].currentState !== 'pending') {
      pomodoro.timers[i].resetTimer();
      pomodoro.updateTimer(i);
    }
  }
});
// window.addEventListener('beforeunload', function() {
//   pomodoro.setStorage();
// });
// window.addEventListener('load', function() {
//   pomodoro.getStorage();
// });
