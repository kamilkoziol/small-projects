const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const minutesSpan = document.getElementById("minutes-span");
const secondsSpan = document.getElementById("seconds-span");
const lapDiv = document.querySelector(".lap-times");
let lapList = [];
let lapTime = "";
let lapDivHtml = "";
let lastMinutes = 0;
let lastSeconds = 0;
let lastIndex = 1;
let isRunning = false;
let intervalId = null;
let seconds = 0;
let minutes = 0;

startBtn.addEventListener("click", () => {
  startTimer();
});

stopBtn.addEventListener("click", () => {
  stopTimer();
});

resetBtn.addEventListener("click", () => {
  resetTimer();
});

lapBtn.addEventListener("click", () => {
  addLap();
});

function startTimer() {
  if (isRunning === false) {
    intervalId = setInterval(incrementTime, 1000);
    isRunning = true;
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

function resetTimer() {
  isRunning = false;
  clearInterval(intervalId);
  minutes = 0;
  seconds = 0;
  clearLapList();
  renderTime();
  renderLapList();
}

function addLap() {
  if (lapList.length === 0) {
    lapList.push({
      interval:
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0"),
      total:
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0"),
    });
  } else {
    lapList.push({
      interval:
        (minutes - lastMinutes).toString().padStart(2, "0") +
        ":" +
        (seconds - lastSeconds).toString().padStart(2, "0"),
      total:
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0"),
    });
  }
  lastMinutes = minutes;
  lastSeconds = seconds;
  renderLapList();
}

function clearLapList() {
  lapList = [];
}

function incrementTime() {
  seconds += 1;
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  renderTime();
}

function renderTime() {
  minutesSpan.textContent = minutes.toString().padStart(2, "0");
  secondsSpan.textContent = seconds.toString().padStart(2, "0");
}

function renderLapList() {
  lastIndex = 1;
  lapList.forEach((lap) => {
    console.log(lap);
    lapDivHtml += `<div class="lap-index">${lastIndex}</div>
                <div class="lap-interval">${lap.interval}</div>
                <div class="lap-total">${lap.total}</div>`;
    lastIndex += 1;
  });
  lapDiv.innerHTML = lapDivHtml;
  lapDivHtml = "";
}
