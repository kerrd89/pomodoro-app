const $ = require('jquery');
const Timer = require('./timer');
let $timer = $('.timer-js');

// let setIntervalID = setInterval(this.tick, 1000);


class Pomodoro {
  constructor() {
    this.timers = [];
  }


  addTimer(startTime, endTime, pauseTime, timeLeft, currentState) {
    let timer = new Timer(startTime, endTime, pauseTime, timeLeft, currentState);
    this.timers.push(timer);
  }

  updateTimer() {
    let minutes = Math.floor(this.timers[0].timeLeft/1000/60);
    let seconds = Math.floor((this.timers[0].timeLeft%60000)/1000)
    let milliSeconds = Math.floor((this.timers[0].timeLeft%60000)%1000);
    if( seconds < 10) { seconds = ('0' + seconds); }
    if( milliSeconds < 10) { milliSeconds = ('0' + milliSeconds); }
    $timer.text(`${minutes}:${seconds}:${milliSeconds}`);
  }

  tick() {
    this.timers[0].updateTimeLeft();
    this.setStorage();
    this.updateTimer();
    if(this.timers[0].timeLeft === 0) return alert('GO TAKE A POMODOODOO!!!');
    if(this.timers[0].currentState === 'paused') return 'return';
    if(this.timers[0].currentState === 'unstarted') return 'return';
    setTimeout(this.tick.bind(this), 10);
  }

  setStorage(){
    localStorage.clear();
    localStorage.setItem('timers', JSON.stringify(this.timers[0]));
  }

  getStorage() {
    let timer = JSON.parse(localStorage.getItem('timers'));
    if (!timer) return;
    let timeLeft = timer.timeLeft/60000;
    this.addTimer(timer.startTime, timer.endTime, timer.pauseTime, timeLeft, timer.currentState);
    this.updateTimer();
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
