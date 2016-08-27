class Timer {
  constructor(options) {
    this.startTime = options.startTime || null;
    this.endTime = options.endTime || null;
    this.pauseTime = options.pauseTime || 0;
    this.timeLeft = this.convertMinToMilliSeconds(options.timeLeft) || 10000;
    this.currentState = options.currentState || 'unstarted';
    this.type = options.type || 'work';
  }

  convertMinToMilliSeconds(minutes) {
    return minutes * 60 * 1000;
  }

  startTimer() {
    this.currentState = 'running';
    this.startTime = Date.now();
    this.endTime = this.startTime + this.timeLeft;
  }

  changeTime(updatedTimeInMinutes) {
    this.timeLeft = this.convertMinToMilliSeconds(updatedTimeInMinutes);
  }

  pauseTimer() {
      this.currentState = 'paused';
      this.pauseTime = Date.now();
      this.timeLeft = this.endTime - this.pauseTime;
  }

  updateTimeLeft() {
    if (this.startTime === null) return;
    this.timeLeft = this.endTime - Date.now();
  }

  resumeTimer() {
    this.currentState = 'running';
    this.endTime = Date.now() + this.timeLeft;
  }

  resetTimer() {
    this.startTime = null;
    this.endTime = null;
    this.pauseTime = 0;
    this.currentState = 'unstarted';
    if (this.type === 'break') {
      this.timeLeft = this.convertMinToMilliSeconds(0.5);
      return;
    }
    if (this.type === 'work') {
      this.timeLeft = 10000;
      return;
    }

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
