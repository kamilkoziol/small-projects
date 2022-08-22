const clock = document.getElementById("clock");
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
let seconds = today.getSeconds();

const intervalId = setInterval(incrementTime, 1000);

function renderClock() {
  time = `
    ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  clock.textContent = time;
}

function incrementTime() {
  seconds += 1;
  if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours >= 24) {
    hours = 0;
  }
  renderClock();
}

renderClock();
