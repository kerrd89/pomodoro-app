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
  it('has a function called setStorage/getStorage which sets/gets the timeLeft to/from Storage', function() {
    let startTime = Date.now() - 60000;
    var pomodoro = new Pomodoro();
    pomodoro.addTimer(startTime);
    pomodoro.timers[0].startTimer();
    pomodoro.timers[0].pauseTimer();
    pomodoro.setStorage();
    pomodoro.getStorage();
    assert.equal(pomodoro.timers[0].timeLeft, 1500000);
  });
  it('has a function called getStorage which returns nothing if there is nothing in storage', function() {
    var pomodoro = new Pomodoro();
    localStorage.clear();
    pomodoro.getStorage();
    assert.equal(pomodoro.timers.length, 0);
  });
  it('has a function called tick which when the timer has a status of running', function (){
    var pomodoro = new Pomodoro();
    pomodoro.addTimer();
    pomodoro.timers[0].currentState = 'paused';
    assert.isFunction(pomodoro.tick, 'return')
  });
});
