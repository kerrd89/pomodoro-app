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

  updateTimer(n) {
    let minutes = Math.floor(this.timers[n].timeLeft/1000/60);
    let seconds = Math.floor((this.timers[n].timeLeft%60000)/1000);
    let milliSeconds = Math.floor((this.timers[n].timeLeft%60000)%1000);
    if( seconds < 10) { seconds = ('0' + seconds); }
    if( milliSeconds < 10) { milliSeconds = ('0' + milliSeconds); }
    $timer.text(`${minutes}:${seconds}:${milliSeconds}`);
  }


  tick(n){
    if(this.timers[n].currentState !== 'running') return;
    this.timers[n].updateTimeLeft();
    // this.setStorage();
    this.updateTimer(n);
    this.ifTimeExpired(n);
    setTimeout(this.tick.bind(this), 10, n);
  }

  timerEndValues(n) {
    this.timers[n].startTime = null;
    this.timers[n].endTime = null;
    this.timers[n].pauseTime = 0;
    this.timers[n].currentState = 'finished';
    this.timers[n].timeLeft = 0;
    if (this.timers[n].type === 'break') {
      this.timers[n].timeLeft = 6000;
      return;
    }
    if (this.timers[n].type === 'work') {
      this.timers[n].timeLeft = 10000;
      return;
    }
  }

  enterOneReturnZero(n) {
    if (n === 0) return 1;
    if (n === 1) return 0;
  }

  ifTimeExpired(n) {
    if(this.timers[n].timeLeft <= 0) {
      debugger;
      let otherTimer = this.enterOneReturnZero(n);
      this.timerEndValues(n);
      this.timers[otherTimer].currentState = 'unstarted';
      this.timers[otherTimer].startTimer();
      $('h1').text('get up and take a 5 minute break');
      return this.tick(otherTimer);
    }
  }

  setStorage(){
    localStorage.clear();
    localStorage.setItem('timers', JSON.stringify(this.timers[0]));
  }

  getStorage() {
    debugger;
    let timer = JSON.parse(localStorage.getItem('timers'));
    if (!timer) return;
    let timeLeft = timer.timeLeft/60000;
    this.addTimer(timeLeft, timer.currentState, timer.type);
    this.updateTimer();
    if(this.timers[0].currentState === 'running') {
    this.timers[0].startTimer();
    return this.tick(n);
    }
    if (this.timers[1].currentState === 'running') {
      this.timers[1].startTimer();
      return this.breakTick();
    }
  }
}

module.exports = Pomodoro;
