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

$(document).ready(function() {
  pomodoro.appendToPage();
  for (var i = 0; i < pomodoro.timers.length; i++) {
    if(pomodoro.timers[i].currentState === 'unstarted') {
      return resetState();
    }
    if(pomodoro.timers[i].currentState === 'paused') {
      pauseState();
      return pomodoro.updateTimer(i);
    }
    if(pomodoro.timers[i].currentState === 'running') {
      runningState();
      pomodoro.timers[i].startTimer();
      return pomodoro.tick(i);
    }
  }
});

$('ul').on('change', 'input', function() {
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
  let i = pomodoro.theFirstOfCurrentState('unstarted');
  pomodoro.timers[i].startTimer();
  return pomodoro.tick(i);
}

$startButton.on('click', function() {
  addTimers();
  startActiveTimer();
  runningState();
});

$pauseButton.on('click', function() {
  let i = pomodoro.theFirstOfCurrentState('running');
  pomodoro.timers[i].pauseTimer();
  pauseState();
  pomodoro.setStorage();
});

$resumeButton.on('click', function() {
  let i = pomodoro.theFirstOfCurrentState('paused');
  pomodoro.timers[i].resumeTimer();
  pomodoro.tick(i);
  runningState();
});

$resetButton.on('click', function() {
  pomodoro.deleteAllTimers();
  resetState();
});

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
//   pomodoro.setStorage();
// });
// window.addEventListener('load', function() {
//   pomodoro.getStorage();
// });
