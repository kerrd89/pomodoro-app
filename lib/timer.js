class Timer {
  constructor(startTime, endTime, pauseTime, timeLeft) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.pauseTime = pauseTime || 0;
    this.timeLeft = this.convertMinToMilliSeconds(timeLeft) || this.convertMinToMilliSeconds(25);
  }

  convertMinToMilliSeconds(minutes) {
    return minutes * 60 * 1000;
  }

  startTimer(dateNow) {
    this.startTime = dateNow;
    this.endTime = this.startTime + this.timeLeft;
  }

  pauseTimer(dateNow) {
    this.pauseTime = dateNow;
    this.timeLeft = this.endTime - this.pauseTime;
  }

  resumeTimer(dateNow) {
    this.endTime = dateNow + this.timeLeft;
  }

  resetTimer() {
    this.startTime = null;
    this.endTime = null;
    this.pauseTime = null;
    this.timeLeft = 25;
  }

// not tested
  setStorage(){
    let remainingTime = this.startTime - this.endTime;
    localStorage.setItem('remainingTime', JSON.stringify(remainingTime));
  }
// not tested
  getStorage() {
    let remainingTime = JSON.parse(localStorage.getItem('remainingTime'));
    if (!remainingTime) return;
    this.timeLeft = remainingTime;
  }
}

module.exports = Timer;



// String.prototype.toHHMMSS = function () {
//     var sec_num = parseInt(this, 10); // don't forget the second param
//     var hours   = Math.floor(sec_num / 3600);
//     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
//     var seconds = sec_num - (hours * 3600) - (minutes * 60);
//
//     if (hours   < 10) {hours   = "0"+hours;}
//     if (minutes < 10) {minutes = "0"+minutes;}
//     if (seconds < 10) {seconds = "0"+seconds;}
//     return hours+':'+minutes+':'+seconds;
// }
