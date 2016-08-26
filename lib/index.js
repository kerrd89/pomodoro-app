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

$startButton.on('click', function() {
  if (pomodoro.timers.length >= 2) return;
  pomodoro.addTimer();
  pomodoro.addTimer(0.5,'unstarted', 'break');


  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState === 'unstarted') {
      pomodoro.timers[i].startTimer();
      return pomodoro.tick(i);
      console.log(pomodoro.timers[i]);
    }
  }
});
$pauseButton.on('click', function() {
  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState === 'running') {
      pomodoro.timers[i].pauseTimer();
      console.log(pomodoro.timers[i]);
    }
  }
});
$resumeButton.on('click', function() {
  debugger;
  if (pomodoro.timers.length === 0) return;
  if (pomodoro.timers[0].currentState !== 'paused') return;
  for(var i = 0; i < pomodoro.timers.length; i ++) {
    if(pomodoro.timers[i].currentState === 'paused') {
      pomodoro.timers[i].resumeTimer();
      pomodoro.tick(i);
      console.log(pomodoro.timers[i]);
    }
  }
});
$resetButton.on('click', function() {
  pomodoro.timers[0].resetTimer();
  pomodoro.updateTimer();
});
// window.addEventListener('beforeunload', function() {
//   pomodoro.setStorage();
// });
// window.addEventListener('load', function() {
//   pomodoro.getStorage();
// });
