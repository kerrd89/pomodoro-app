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

pomodoro.getStorage();

$startButton.on('click', function() {
  if (pomodoro.timers.length < 1) pomodoro.addTimer();
  if (pomodoro.timers[0].currentState === "running") return;
  pomodoro.timers[0].startTimer();
  pomodoro.tick();
});
$pauseButton.on('click', function() {
  if (pomodoro.timers[0].currentState !== 'running') return;
  pomodoro.timers[0].pauseTimer();
});
$resumeButton.on('click', function() {
  if (pomodoro.timers.length === 0) return;
  if (pomodoro.timers[0].currentState !== 'paused') return;
  pomodoro.timers[0].resumeTimer();
  pomodoro.tick();
});
$resetButton.on('click', function() {
  pomodoro.timers[0].resetTimer();
  pomodoro.updateTimer();
});
