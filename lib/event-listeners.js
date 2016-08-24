'use strict';
const $ = require('jquery');
const Pomodoro = require('./pomodoro');

$('.start-button-js').on('click', function() {
    debugger;
  Pomodoro.timers[0].startTimer();
  Pomodoro.tick();
});
