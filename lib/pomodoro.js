const $ = require('jquery');
const Timer = require('./timer');
let $timer = $('.active-timer-js');

// let setIntervalID = setInterval(this.tick, 1000);


class Pomodoro {
  constructor() {
    this.timers = [];
  }

  theFirstOfCurrentState(state) {
    for (var i = 0; i < this.timers.length; i++) {
      if(this.timers[i].currentState === state) return i;
    }
  }


  addTimer(timeLeft, currentState, type, goal) {
    let timer = new Timer({timeLeft: timeLeft, currentState: currentState, type: type, goal: goal});
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
    this.setStorage();
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

  nextTimer(n) {
    return n + 1;
  }

  ifTimeExpired(n) {
    if(this.timers[n].timeLeft <= 0) {
      let nextTimer = this.nextTimer(n);
      this.timerEndValues(n);
      this.timers[nextTimer].currentState = 'unstarted';
      this.timers[nextTimer].startTimer();
      this.changeActiveTimer(n);
      return this.tick(nextTimer);
    }
  }

  changeActiveTimer(n) {
    var currentLi = n+1;
    var nextLi = n+2;
    $('ul li:nth-child('+ nextLi + ')').addClass('active-timer');
    $('ul li:nth-child(' + nextLi +')').addClass('active-timer-js');
    $('ul li:nth-child(' + currentLi + ')').addClass('inactive-timer-js');
    $('ul li:nth-child(' + currentLi + ')').addClass('inactive-timer');
    $('ul li:nth-child(' + currentLi + ')').removeClass('active-timer-js');
    $('ul li:nth-child(' + currentLi + ')').removeClass('active-timer');
  }

  deleteAllTimers(){
    this.timers = [];
    this.deleteAllTimersOnPage();
    localStorage.clear();
    this.appendToPage();
  }

  deleteAllTimersOnPage(){
    $('ul').children().remove();
  }


  timerStatus(i) {
    if (this.timers[i].currentState === 'running') { return 'active-timer-js active-timer'; }
    if (this.timers[i].currentState === 'paused') { return 'active-timer-js active-timer'; }
    else { return 'inactive-timer inactive-timer-js'; }
  }

  appendToPage() {
    this.getStorage();
    if (this.timers.length === 0) {
      this.appendToPageIfNothingInStorage();
    } else {
      this.appendStorageTimersToPage();
    }
  }

  setStorage(){
    localStorage.clear();
    localStorage.setItem('timers', JSON.stringify(this.timers));
  }

  getStorage() {
    let timers = JSON.parse(localStorage.getItem('timers'));
    if (!timers) return;
    for(var i = 0; i < timers.length; i++) {
      this.addTimer(timers[i].timeLeft/60000, timers[i].currentState, timers[i].type, timers[i].goal);
    }
  }

  appendStorageTimersToPage() {
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i].type === 'work') {
        let timeLeft = Math.floor(this.timers[i].timeLeft/60000);
        $('ul').append(
          `
          <li class="${this.timerStatus(i)}">
          <p class="work-timer-name-js work-timer-name">${this.timers[i].goal}</p>
          <div class="timer-length timer-length-js">${timeLeft}</div>
          </li>
          `);
        }
        else {
          let timeLeft = Math.floor(this.timers[i].timeLeft/60000);
          $('ul').append(
            `
            <li class="${this.timerStatus(i)}">
            <p class="break-timer-name-js break-timer-name inactive-timer-js">${this.timers[i].goal}</p>
            <div class="timer-length timer-length-js">${timeLeft}</div>
            </li>
            `
          );
        }
      }
    }


  appendToPageIfNothingInStorage() {
    $('ul').append(`
      <li class="active-timer-js active-timer">
      <p class="work-timer-name-js work-timer-name">First work block</p>
      <div class="timer-length timer-length-js">25</div>
      <input type="range" min="5" max="60" step="5" value="25" class="work-timer-length-js work-timer-length">
      </li>
      <li class="inactive-timer-js inactive-timer">
      <p class="break-timer-name-js break-timer-name inactive-timer-js">Take a break</p>
      <div class="timer-length timer-length-js">5</div>
      <input type="range" min="1" max="15" step="1" value="5" class="break-timer-length-js break-timer-length">
      </li>
      <li class="inactive-timer-js inactive-timer">
      <p class="work-timer-name-js work-timer-name inactive-timer-js">Second work block</p>
      <div class="timer-length timer-length-js">25</div>
      <input type="range" min="5" max="60" step="5" value="25" class="work-timer-length-js work-timer-length">
      </li>
      <li class="inactive-timer-js inactive-timer">
      <p class="break-timer-name-js break-timer-name inactive-timer-js">Take a break</p>
      <div class="timer-length timer-length-js">5</div>
      <input type="range" min="1" max="15" step="1" value="5" class="break-timer-length-js break-timer-length">
      </li>
      `);
    }
}

module.exports = Pomodoro;
