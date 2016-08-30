const assert = require('assert')

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, 'Time Box');
  });
});

describe('input field', function(){
  it('should have an work input range with default range of 25', function(){
    browser.url('/');
    var workInput = browser.element('.work-timer-length-js');
    var breakInput = browser.element('.break-timer-length-js');
    assert.equal(workInput.getValue(), 25);
    assert.equal(breakInput.getValue(), 5);
  });
  it.skip('should change work input when the slider is moved', function(){
    browser.localStorage('DELETE', 'timers');
    browser.url('/');
    var workInput = browser.element('.work-timer-length-js');
    var breakInput = browser.element('.break-timer-length-js');
    browser.click('.work-timer-length-js');
    workInput.setValue(35);
    // browser.click('.break-timer-length-js');
    // breakInput.addValue(2);
    assert.equal(workInput.getValue(), 35);
    // assert.equal(breakInput.getValue(), 14);
  });
  it.skip('should change work input when the slider is moved', function(){
    browser.url('/');
    var workInput = browser.element('.work-timer-length-js');
    var breakInput = browser.element('.break-timer-length-js');
    // browser.click('.work-timer-length-js');
    // workInput.addValue(30);
    browser.click('.break-timer-length-js');
    breakInput.addValue(14);
    // assert.equal(workInput.getValue(), 30);
    assert.equal(breakInput.getValue(), 14);
  });

  it('should remove inputs when the startButton is pressed', function(){
    browser.url('/');
    browser.click('.start-button-js');
    var input = browser.element('input');
    assert.equal(input.isExisting(), false);
  });

  it('should have only the pause button when you press start', function(){
    browser.url('/');
    browser.click('.pause-button-js');
    browser.click('.reset-button-js');
    browser.click('.start-button-js');

    var startButton = browser.element('.start-button-js');
    var pauseButton = browser.element('.pause-button-js');
    var currentTime = browser.element('.current-time-js');
    var resetButton = browser.element('.reset-button-js');
    var resumeButton = browser.element('.resume-button-js');

    assert.equal(startButton.isVisible(), false);
    assert.equal(pauseButton.isVisible(), true);
    assert.equal(currentTime.isVisible(), true);
    assert.equal(resetButton.isVisible(), false);
    assert.equal(resumeButton.isVisible(), false);
  });
  it('should have only the resume and reset button when you press pause', function(){
    browser.url('/');
    // browser.click('.start-button-js');
    browser.click('.pause-button-js');

    var startButton = browser.element('.start-button-js');
    var pauseButton = browser.element('.pause-button-js');
    var currentTime = browser.element('.current-time-js');
    var resetButton = browser.element('.reset-button-js');
    var resumeButton = browser.element('.resume-button-js');

    assert.equal(startButton.isVisible(), false);
    assert.equal(pauseButton.isVisible(), false);
    assert.equal(currentTime.isVisible(), true);
    assert.equal(resetButton.isVisible(), true);
    assert.equal(resumeButton.isVisible(), true);
  });
  it('should have only the resume and reset button when you press pause', function(){
    browser.url('/');
    // browser.click('.start-button-js');
    browser.click('.resume-button-js');

    var startButton = browser.element('.start-button-js');
    var pauseButton = browser.element('.pause-button-js');
    var currentTime = browser.element('.current-time-js');
    var resetButton = browser.element('.reset-button-js');
    var resumeButton = browser.element('.resume-button-js');

    assert.equal(startButton.isVisible(), false);
    assert.equal(pauseButton.isVisible(), true);
    assert.equal(currentTime.isVisible(), true);
    assert.equal(resetButton.isVisible(), false);
    assert.equal(resumeButton.isVisible(), false);
  });
  it('should have only the pause button when you press start', function(){
    browser.url('/');
    browser.click('.pause-button-js');
    browser.click('.reset-button-js');

    var startButton = browser.element('.start-button-js');
    var pauseButton = browser.element('.pause-button-js');
    var currentTime = browser.element('.current-time-js');
    var resetButton = browser.element('.reset-button-js');
    var resumeButton = browser.element('.resume-button-js');

    assert.equal(startButton.isVisible(), true);
    assert.equal(pauseButton.isVisible(), false);
    assert.equal(currentTime.isVisible(), false);
    assert.equal(resetButton.isVisible(), false);
    assert.equal(resumeButton.isVisible(), false);
  });
});
