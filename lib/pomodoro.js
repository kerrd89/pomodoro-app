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
    this.timers[n].updateTimeLeft();
    // this.setStorage();
    this.updateTimer(n);
    this.ifTimeExpires();
    if(this.timers[n].currentState === 'paused') return 'return';
    if(this.timers[n].currentState === 'unstarted') return 'return';
    setTimeout(this.tick.bind(this), 10);
  }

  timerEndValues(n) {
    this.timers[n].timeLeft = 0;
    this.timers[n].currentState = 'finished';
  }

  ifTimeExpires() {
    if(this.timers[0].timeLeft <= 0) {
      this.timerEndValues(0);
      this.timers[1].startTimer();
      $('h1').text('get up and take a 5 minute break');
      return this.tick(1);
    }
  }

  breakTick(){
    this.timers[1].updateTimeLeft();
    // this.setStorage();
    this.updateTimer(1);
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
