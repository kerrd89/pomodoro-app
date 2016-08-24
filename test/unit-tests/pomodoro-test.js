'use strict';
const assert = require('chai').assert;
const Pomodoro = require('../../lib/pomodoro');

describe('Pomodoro', function () {
  it('is an object', function () {
    var pomodoro = new Pomodoro();
    assert.isObject(pomodoro);
  });
  it('has a function called addTimer which creates a timer held in Pomodoro', function () {
    var pomodoro = new Pomodoro();
    pomodoro.addTimer();
    assert.equal(pomodoro.timers.length, 1);
  });
  it.skip('has a recursive function tick which decreases timeLeft by 1 second, waits a second, then runs itself', function() {
    var pomodoro = new Pomodoro();
    pomodoro.addTimer();
  });
  it.skip('has a recursive function tick which decreases timeLeft by 1 second, waits a second, then runs itself', function() {
    var pomodoro = new Pomodoro();
    pomodoro.addTimer();
  });
});
