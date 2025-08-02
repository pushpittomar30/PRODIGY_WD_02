let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
  }
});

pauseBtn.addEventListener('click', () => {
  if (running) {
    clearInterval(intervalId);
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  running = false;
  updateDisplay();
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const li = document.createElement('li');
    li.textContent = `Lap: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(li);
  }
});
