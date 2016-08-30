'use strict';

require('./scss/styles');
const $ = require('jquery');
const Pomodoro = require('./pomodoro');
const Timer = require('./timer');

let $startButton = $('.start-button-js');
let $pauseButton = $('.pause-button-js');
let $resumeButton = $('.resume-button-js');
let $resetButton = $('.reset-button-js');

let pomodoro = new Pomodoro();

$(document).ready(function() {
  pomodoro.appendToPage();
  console.log(pomodoro.timers.length);
  if (pomodoro.timers.length !== 0) { return pauseState(); }
});

$('ul').on('mousemove', 'input', function() {
  let value = this.value;
  $(this).siblings('.timer-length-js').text(value);
});

function addTimers() {
  while ($('input').val() !== undefined) {
    pomodoro.addTimer($('input').val(), 'pending', 'work', $('input').first().siblings('p').text());
    pomodoro.addTimer(5, 'pending', 'break');
    $('input').first().remove();
    $('input').first().remove();
  }
}

function startActiveTimer() {
  for (var i = 0; i < pomodoro.timers.length; i++) {
    if (pomodoro.timers[i].currentState === 'active' ||
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
  runningState();
});

$resetButton.on('click', function() {
  pomodoro.deleteAllTimers();
  resetState();
});

$pauseButton.on('click', function() {
  resumeOrPause();
  pauseState();
});

$resumeButton.on('click', function() {
  resumeOrPause();
  runningState();
});

$resetButton.on('click', function() {
  pomodoro.deleteAllTimers();
  resetState();
});

function resumeOrPause() {
  pomodoro.getStorage();
  for (var i = 0; i < pomodoro.timers.length; i++) {
    if (pomodoro.timers[i].currentState === 'running') {
      return pomodoro.timers[i].pauseTimer();
    }
    if (pomodoro.timers[i].currentState === 'paused' ||
        pomodoro.timers[i].currentState === 'active') {
      pomodoro.timers[i].resumeTimer();
      return pomodoro.tick(i);
    }
  }
}


function resetState() {
  $('.reset-button-js').hide();
  $('.resume-button-js').hide();
  $('.pause-button-js').hide();
  $('.current-time-js').hide();
  $('.start-button-js').show();
}

function runningState() {
  $('.start-button-js').hide();
  $('.reset-button-js').hide();
  $('.resume-button-js').hide();
  $('.pause-button-js').show();
  $('.current-time-js').show();
}

function pauseState() {
  $('.start-button-js').hide();
  $('.pause-button-js').hide();
  $('.current-time-js').show();
  $('.reset-button-js').show();
  $('.resume-button-js').show();
}

// window.addEventListener('beforeunload', function() {
//   if (pomodoro.timers[i].currentState === 'running') { pomodoro.timers[i].currentState = 'paused' };
//   pomodoro.setStorage();
// });
