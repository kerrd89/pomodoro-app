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
    $('.timer').text(this.timers[0].timeLeft);
  }

  tick() {
    debugger;
    if(!this.timers[0].timeLeft) return console.log('your time has run out');
    this.updateTimer();
    Timer.timeLeft = Timer.timeLeft - 1000;
    setTimeout(Timer.tick, 1000);
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
