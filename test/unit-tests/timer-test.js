'use strict';
const assert = require('chai').assert
const Timer = require('../../lib/timer');

describe('timer', function () {
  it('is an object', function () {
    var timer = new Timer();
    assert.isObject(timer);
  });
  it('has the correct default values', function () {
    var timer = new Timer();
    assert.deepEqual(timer, {startTime: undefined,
      endTime: undefined, pauseTime: 0, timeLeft: 1500000});
  });
});

describe('timer functions', function () {
  it('has a function called startTimer which sets the start and end time', function () {
    var timer = new Timer();
    let startTime = Date.now();
    timer.startTimer(startTime);
    assert.equal(timer.startTime, startTime);
    assert.equal(timer.endTime, startTime + 1500000);
    assert.equal(timer.pauseTime, 0);
    assert.equal(timer.timeLeft, 1500000);
    //can refactor to a deep equal once things are locked down
  });

  it('has a function called pauseTimer which sets pauseTime and timeLeft', function () {
    let startTime = Date.now() - 60000;
    let endTime = startTime + 1500000;
    var timer = new Timer();
    timer.startTimer(startTime);
    let pauseTime = Date.now();
    timer.pauseTimer(pauseTime);
    assert.equal(timer.startTime, startTime);
    assert.equal(timer.endTime, endTime);
    assert.equal(timer.pauseTime, pauseTime);
    assert.equal(timer.timeLeft, endTime - pauseTime);
  });

  it('has a function called resumeTimer which resets the endTime', function () {
    let startTime = Date.now() - 60000;
    var timer = new Timer();
    timer.startTimer(startTime);
    let pauseTime = Date.now() - 30000;
    timer.pauseTimer(pauseTime);
    let resumeTime = Date.now();
    timer.resumeTimer(resumeTime);
    assert.equal(timer.endTime, resumeTime + timer.timeLeft);
  });
  //
  it('has a function called resetTimer which resets the timer to default', function() {
    var timer = new Timer(100, 15100, 2000, 10);
    timer.resetTimer();
    assert.equal(timer.startTime, null);
    assert.equal(timer.endTime, null);
    assert.equal(timer.pauseTime, 0);
    assert.equal(timer.timeLeft, 25);
  });

  it('has a function called setStorage/getStorage which sets/gets the timeLeft to/from Storage', function() {
    let startTime = Date.now() - 60000;
    var timer = new Timer();
    timer.startTimer(startTime);
    let pauseTime = Date.now() - 30000;
    timer.pauseTimer(pauseTime);
    timer.setStorage();
    assert.equal(JSON.parse(localStorage.getItem('timeLeft')), 1470000);
  });

  it('has a function called getStorage which gets the timeLeft from Storage', function() {
    let startTime = Date.now() - 60000;
    var timer = new Timer();
    timer.startTimer(startTime);
    let pauseTime = Date.now() - 30000;
    timer.pauseTimer(pauseTime);
    timer.setStorage();
    timer.getStorage();
    assert.equal(timer.timeLeft, 1470000);
  });
  it('has a function called getStorage which returns nothing if there is nothing in storage', function() {
    var timer = new Timer();
    localStorage.clear();
    timer.getStorage();
    assert.equal(timer.timeLeft, 1500000);
  });
  it('has a function called changeTime that updates the timeLeft value', function() {
    var timer = new Timer();
    timer.changeTime(20);
    assert.equal(timer.timeLeft, 1200000);
  });
});
