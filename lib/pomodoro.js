const $ = require('jquery');
const Timer = require('./timer');
let $timer = $('.timer-js');

// let setIntervalID = setInterval(this.tick, 1000);


class Pomodoro {
  constructor() {
    this.timers = [];
  }


  addTimer(timeLeft, currentState, type) {
    let timer = new Timer({timeLeft: timeLeft, currentState: currentState, type: type});
    this.timers.push(timer);
  }

  updateTimer() {
    let minutes = Math.floor(this.timers[0].timeLeft/1000/60);
    let seconds = Math.floor((this.timers[0].timeLeft%60000)/1000);
    let milliSeconds = Math.floor((this.timers[0].timeLeft%60000)%1000);
    if( seconds < 10) { seconds = ('0' + seconds); }
    if( milliSeconds < 10) { milliSeconds = ('0' + milliSeconds); }
    $timer.text(`${minutes}:${seconds}:${milliSeconds}`);
  }


  tick(){
    this.timers[0].updateTimeLeft();
    // this.setStorage();
    this.updateTimer();
    this.ifTimeExpires();
    if(this.timers[0].currentState === 'paused') return 'return';
    if(this.timers[0].currentState === 'unstarted') return 'return';
    setTimeout(this.tick.bind(this), 10);
  }

  ifTimeExpires() {
    if(this.timers[0].timeLeft <= 0) {
      this.timers[0].currentStatus = 'finished';
      this.addTimer(0.5,'unstarted', 'break');
      this.timers[1].startTimer();
      $('h1').text('get up and take a 5 minute break');
      return this.breakTick();
    }
  }

  updateBreakTimer(){
    let minutes = Math.floor(this.timers[1].timeLeft/1000/60);
    let seconds = Math.floor((this.timers[1].timeLeft%60000)/1000);
    let milliSeconds = Math.floor((this.timers[1].timeLeft%60000)%1000);
    if( seconds < 10) { seconds = ('0' + seconds); }
    if( milliSeconds < 10) { milliSeconds = ('0' + milliSeconds); }
    $timer.text(`${minutes}:${seconds}:${milliSeconds}`);
  }

  //can do this with momentjs

  breakTick(){
    this.timers[1].updateTimeLeft();
    this.setStorage();
    this.updateBreakTimer();
    if(this.timers[1].timeLeft <= 0) ;
    if(this.timers[1].currentState === 'paused') return 'return';
    if(this.timers[1].currentState === 'unstarted') return 'return';
    setTimeout(this.breakTick.bind(this), 10);
  }

  setStorage(){
    localStorage.clear();
    localStorage.setItem('timers', JSON.stringify(this.timers[0]));
  }

  getStorage() {
    let timer = JSON.parse(localStorage.getItem('timers'));
    if (!timer) return;
    let timeLeft = timer.timeLeft/60000;
    this.addTimer(timeLeft, timer.currentState, timer.type);
    this.updateTimer();
    if(this.timers[0].currentState === 'running') {
    this.timers[0].startTimer();
    return this.tick();
    }
    if (this.timers[1].currentState === 'running') {
      this.timers[1].startTimer();
      return this.breakTick();
    }
  }
}

module.exports = Pomodoro;
