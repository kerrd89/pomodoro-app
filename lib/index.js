'use strict';

require('./scss/styles');
require('./event-listeners');
const $ = require('jquery');
const Pomodoro = require('./pomodoro');
const Timer = require('./timer');
require('./build');


let $startButton = $('.start-button-js');
let $pauseButton = $('.pause-button-js');
let $resumeButton = $('.resume-button-js');
let $resetButton = $('.reset-button-js');
let $input = $('input');

let pomodoro = new Pomodoro();

// pomodoro.getStorage();

$(document).ready(function() {
  pomodoro.appendToPage();
  // startActiveTimer();
});

$('ul').on('mousemove', 'input', function() {
  let value = this.value;
  $(this).siblings('.timer-length-js').text(value);
});

function addTimers() {
  while ($('input').val() !== undefined) {
    pomodoro.addTimer($('input').val(), 'unstarted', 'work', $('input').first().siblings('p').text());
    pomodoro.addTimer(5, 'pending', 'break');
    $('input').first().remove();
    $('input').first().remove();
  }
}

function startActiveTimer() {
  for (var i = 0; i < pomodoro.timers.length; i++) {
    if (pomodoro.timers[i].currentState === 'unstarted' ||
      pomodoro.timers[i].currentState === 'paused' ||
      pomodoro.timers[i].currentState === 'running') {
      pomodoro.timers[i].startTimer();
      return pomodoro.tick(i);
    }
  }
}

$startButton.on('click', function() {
  addTimers();
  startActiveTimer();
  $(this).hide();
  $('.pause-button-js').show();
  $('.current-time-js').show();
});

$pauseButton.on('click', function() {
  for (var i = 0; i < pomodoro.timers.length; i++) {
    if (pomodoro.timers[i].currentState === 'running') {
      pomodoro.timers[i].pauseTimer();
    }
  }
  $(this).hide();
  $('.resume-button-js').show();
  $('.reset-button-js').show();
});

function checkBeforeResume(n) {
  if (pomodoro.timers.length === 0) return;
  if (pomodoro.timers[n].currentState !== 'paused') return;
}

$resumeButton.on('click', function() {
  for (var i = 0; i < pomodoro.timers.length; i++) {
    if (pomodoro.timers[i].currentState === 'paused') {
      checkBeforeResume(i);
      pomodoro.timers[i].resumeTimer();
      pomodoro.tick(i);
    }
  }
  $(this).hide();
  $('.reset-button-js').hide();
  $('.pause-button-js').show();
});

$resetButton.on('click', function() {
  pomodoro.deleteAllTimers();
  $(this).hide();
  $('.current-time-js').hide();
  $('.resume-button-js').hide();
  $('.start-button-js').show();
});
window.addEventListener('beforeunload', function() {
  pomodoro.setStorage();
});
// window.addEventListener('load', function() {
//   pomodoro.getStorage();
// });
