class Timer {
  constructor(options) {
    this.startTime = options.startTime || null;
    this.endTime = options.endTime || null;
    this.pauseTime = options.pauseTime || 0;
    this.timeLeft = this.convertMinToMilliSeconds(options.timeLeft) || 10000;
    this.currentState = options.currentState || 'pending';
    this.type = options.type || 'work';
    this.goal = options.goal || 'Take a Break';
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
    this.currentState = 'pending';
  }
}

module.exports = Timer;
