const $ = require('jquery');
const Timer = require('./timer');
let $timer = $('.active-timer-js');

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
    $('.current-time-js').text(`${minutes}:${seconds}`);
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

  // enterOneReturnZero(n) {
  //   if (n === 0) return 1;
  //   if (n === 1) return 0;
  // }

  nextTimer(n) {
    return n + 1;
  }

  ifTimeExpired(n) {
    if(this.timers[n].timeLeft <= 0) {
      let nextTimer = this.nextTimer(n);
      this.timerEndValues(n);
      this.timers[nextTimer].currentState = 'unstarted';
      this.timers[nextTimer].startTimer();
      this.changeActiveTimer();
      return this.tick(nextTimer);
    }
  }

  changeActiveTimer() {
    $('.active-timer-js').closest('li').remove();
    $('.inactive-timer-js').first().addClass('active-timer-js');
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
