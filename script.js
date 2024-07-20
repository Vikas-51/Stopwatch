let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const clearLapsButton = document.getElementById('clearLaps');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');
const circle = document.querySelector('.circle');

function startPause() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    startPauseButton.innerText = 'Pause';
    circle.classList.add('running');
    circle.classList.remove('paused', 'reset');
    running = true;
  } else {
    clearInterval(tInterval);
    startPauseButton.innerText = 'Start';
    circle.classList.remove('running');
    circle.classList.add('paused');
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  startPauseButton.innerText = 'Start';
  circle.classList.remove('running', 'paused');
  circle.classList.add('reset');
  running = false;
  startTime = updatedTime = difference = 0;
  lapCounter = 0;
  minutesDisplay.innerText = '00';
  secondsDisplay.innerText = '00';
  millisecondsDisplay.innerText = '00';
  lapList.innerHTML = '';
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 10);

  minutesDisplay.innerText = (minutes < 10) ? '0' + minutes : minutes;
  secondsDisplay.innerText = (seconds < 10) ? '0' + seconds : seconds;
  millisecondsDisplay.innerText = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
}

function addLap() {
  if (running) {
    const lapTime = `${minutesDisplay.innerText}:${secondsDisplay.innerText}:${millisecondsDisplay.innerText}`;
    const lapElement = document.createElement('li');
    lapElement.innerText = `Lap ${++lapCounter}: ${lapTime}`;
    lapList.appendChild(lapElement);
  }
}

function clearLaps() {
  lapList.innerHTML = '';
  lapCounter = 0;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', addLap);
clearLapsButton.addEventListener('click', clearLaps);
