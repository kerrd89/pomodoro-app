'use strict';
const assert = require('chai').assert
const Timer = require('../../lib/timer');

describe('timer', function() {
  it('is an object', function() {
    var timer = new Timer({});
    assert.isObject(timer);
  });
  it('has the correct default values', function() {
    var timer = new Timer({});
    assert.deepEqual(timer, {
      startTime: null,
      endTime: null,
      pauseTime: 0,
      timeLeft: 10000,
      currentState: 'unstarted',
      type: 'work',
      goal: 'Take a Break'
    });
  });
});

describe('timer functions', function() {

  let dateNow;
  let now = Date.now();

  beforeEach(function() {
    dateNow = Date.now;
    Date.now = function() {
      return now;
    };
  });

  afterEach(function() {
    Date.now = dateNow;
  });


  it('has a function called startTimer which sets the start and end time', function() {
    let endTime = now + 10000;
    var timer = new Timer({startTime: now, endTime: endTime});
    timer.startTime = now;
    timer.startTimer();
    assert.equal(timer.startTime, now);
    assert.equal(timer.endTime, endTime);
    assert.equal(timer.pauseTime, 0);
    assert.equal(timer.timeLeft, 10000);
    //can refactor to a deep equal once things are locked down
  });

  it('has a function called pauseTimer which sets pauseTime and timeLeft', function() {
    let startTime = Date.now() - 60000;
    let endTime = startTime + 1500000;
    var timer = new Timer({});
    timer.startTimer();
    timer.startTime = startTime;
    timer.endTime = endTime;
    let pauseTime = Date.now();
    timer.pauseTimer();
    assert.equal(timer.startTime, startTime);
    assert.equal(timer.pauseTime, pauseTime);
    assert.equal(timer.timeLeft, endTime - pauseTime);
  });

  it('has a function called resumeTimer which resets the endTime', function() {
    let startTime = Date.now() - 60000;
    var timer = new Timer({});
    timer.startTimer(startTime);
    let pauseTime = Date.now() - 30000;
    timer.pauseTimer(pauseTime);
    let resumeTime = Date.now();
    timer.resumeTimer(resumeTime);
    assert.equal(timer.endTime, resumeTime + timer.timeLeft);
  });
  it('has a function called resetTimer which resets the timer to default', function() {
    var timer = new Timer({startTime: 100, endTime: 15100, pauseTime: 2000, timeLeft: 10});
    timer.resetTimer();
    assert.equal(timer.startTime, null);
    assert.equal(timer.endTime, null);
    assert.equal(timer.pauseTime, 0);
    assert.equal(timer.timeLeft, 10000);
    assert.equal(timer.currentState, 'unstarted');
  });
  it('has a function called changeTime that updates the timeLeft value', function() {
    var timer = new Timer({});
    timer.changeTime(20);
    assert.equal(timer.timeLeft, 1200000);
  });
  it('has a function called updateTimeLeft that updates the remaining time', function() {
    let endTime = Date.now() + 60000;
    let dateNow = Date.now();
    var timer = new Timer({startTime: dateNow});
    timer.endTime = endTime;
    timer.updateTimeLeft();
    assert.equal(timer.timeLeft, endTime - dateNow);
  });
});
