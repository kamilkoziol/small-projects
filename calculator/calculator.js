numberBtns = document.querySelectorAll(".digit-btn[data-number]");
functionBtns = document.querySelectorAll(".function-btn");
commaBtn = document.getElementById("comma-btn");
clearBtn = document.getElementById("clear-btn");
equalBtn = document.querySelector(".equal-btn");
inputDiv = document.getElementById("input");
let inputValue = "";
let numberInputValue = 0;
let result = 0;
let op = "";
let lastOp = "";

numberBtns.forEach((numberBtn) => {
  numberBtn.addEventListener("click", numberButtonPressed);
});

functionBtns.forEach((functionBtn) => {
  functionBtn.addEventListener("click", functionButtonPressed);
});

commaBtn.addEventListener("click", commaButtonPressed);
clearBtn.addEventListener("click", clearButtonPressed);
equalBtn.addEventListener("click", equalButtonPressed);

function numberButtonPressed(event) {
  if (lastOp === "eq") {
    inputValue = "";
  }
  inputValue += event.target.dataset.number;
  renderInput();
}

function functionButtonPressed(event) {
  numberInputValue = Number(inputValue);
  op = event.target.dataset.function;
  switch (lastOp) {
    case "+":
      result += numberInputValue;
      break;
    case "-":
      result -= numberInputValue;
      break;
    case "/":
      result /= numberInputValue;
      break;
    case "*":
      result *= numberInputValue;
      break;
    default:
      result = numberInputValue;
  }
  inputValue = result;
  renderInput();
  inputValue = "";
  lastOp = op;
}

function reset() {
  inputValue = "";
  numberInputValue = 0;
  result = 0;
  op = "";
  lastOp = "";
}

function equalButtonPressed(event) {
  numberInputValue = Number(inputValue);
  switch (lastOp) {
    case "+":
      result += numberInputValue;
      inputValue = result;
      break;
    case "-":
      result -= numberInputValue;
      inputValue = result;
      break;
    case "/":
      result /= numberInputValue;
      inputValue = result;
      break;
    case "*":
      result *= numberInputValue;
      inputValue = result;
      break;
  }
  lastOp = "eq";
  renderInput();
}

function commaButtonPressed(event) {
  inputValue = inputValue.includes(".") ? inputValue : (inputValue += ".");
  renderInput();
}

function clearButtonPressed(event) {
  reset();
  renderInput();
}

function renderInput() {
  inputDiv.textContent = inputValue;
}
