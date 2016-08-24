'use strict';
const $ = require('jquery');
const Timer = require('./timer');


class Pomodoro {
  constructor() {
    this.timers = [];
  }


  addTimer() {
    let timer = new Timer();
    this.timers.push(timer);
  }

  updateTimer() {
    $('.timer').text(Timer.timeLeft);
    console.log('hadlfkadjf');
  }

  tick() {
    // if(Timer.timeLeft)
    // this.updateTimer();
    let i = 0;
    console.log(i++);
    Timer.timeLeft = Timer.timeLeft - 1000;
    setTimeout(this.tick(), 3000);
  }
}


// timer.changeTime($(.user-input-time))


// create new timer
// have a start event
// have a

module.exports = Pomodoro;


//call function on startPOOPADORA
//function should decrease time remaining by 1 second
//function should have a timeout which delays 1 second
//function should call itself again
//unless stop or pause has been called
