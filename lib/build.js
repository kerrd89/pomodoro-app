const Pomodoro = require('./pomodoro');
const Timer = require('./timer');

let pom = new Pomodoro();

pom.addTimer();

pom.tick();
