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
    var pomodoro = new Pomodoro();
    pomodoro.addTimer(1, 'unstarted', 'work', 'get shit done');
    pomodoro.setStorage();
    pomodoro.timers = [];
    pomodoro.getStorage();
    assert.equal(pomodoro.timers[0].timeLeft, 60000);
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
  it('has a function called timerStatus which returns classes based on currentState', function (){
    var pomodoro = new Pomodoro();
    pomodoro.addTimer(1, 'unstarted', 'work', 'get shit done');
    pomodoro.timers[0].currentState = 'paused';
    assert.equal(pomodoro.timerStatus(0), 'active-timer-js active-timer');
    pomodoro.timers[0].currentState = 'unstarted';
    assert.equal(pomodoro.timerStatus(0), 'inactive-timer inactive-timer-js');
  });
  it('has a function called theFirstOfCurrentState which returns the position of the first timer with that currentState', function (){
    var pomodoro = new Pomodoro();
    pomodoro.addTimer(1, 'unstarted', 'work', 'get shit done');
    pomodoro.addTimer(1, 'paused', 'work', 'get shit done');
    pomodoro.addTimer(1, 'paused', 'work', 'get shit done');
    assert.equal(pomodoro.theFirstOfCurrentState('paused'), 1);
  });
});
