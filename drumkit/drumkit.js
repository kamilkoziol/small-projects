const soundBtns = document.querySelectorAll(".complex-btn > .sound-btn");
const fileBtns = document.querySelectorAll(".complex-btn > .file-btn");
const keyBtns = document.querySelectorAll(".complex-btn > .key-btn");

const buttons = [];
let isListening = false;

soundBtns.forEach((soundBtn) => {
  buttons.push({
    id: soundBtn.dataset.id,
    isListening: false,
    key: "",
  });

  soundBtn.addEventListener("pointerdown", (event) => {
    let buttonId = event.target.dataset.id;
    let button = buttons.find((button) => button.id === buttonId);
    if (button.audio != undefined) {
      playSound(buttonId);
    }
  });
});

fileBtns.forEach((fileBtn) => {
  let id = fileBtn.dataset.id;
  let input = document.querySelector(`[id="${id}"] > input`);
  input.onchange = function () {
    let files = this.files;
    let file = URL.createObjectURL(files[0]);
    let keyBtn = document.querySelector(`.file-btn[data-id="${id}"]`);
    keyBtn.classList.add("file-btn-assigned");
    console.log(keyBtn);
    buttons.map((button) => {
      if (button.id === id) {
        button.audio = new Audio(file);
      }
    });
  };

  fileBtn.addEventListener("pointerdown", (event) => {
    let id = event.target.dataset.id;
    let input = document.querySelector(`[id="${id}"] > input`);
    input = document.querySelector(`[id="${id}"] > input`);
    input.click();
  });
});

keyBtns.forEach((keyBtn) => {
  keyBtn.addEventListener("pointerdown", (event) => {
    let buttonId = event.target.dataset.id;
    keyBtn.classList.toggle("key-btn-active");
    bindKey(buttonId);
  });
});

function bindKey(buttonId) {
  toggleListening(buttonId);
  window.addEventListener("keydown", changeKey);
}

function changeKey(event) {
  buttons.map((button) => {
    button.key = button.key === event.key ? "" : button.key;
    button.key = button.isListening === true ? event.key : button.key;
    if (button.isListening) {
      let keyBtn = document.querySelector(
        `.key-btn[data-id="${button.id}"]`
      );
      keyBtn.classList.toggle("key-btn-active");
    }
    button.isListening = false;
  });
  isListening = false;
  window.removeEventListener("keydown", changeKey);
  render();
}

function toggleListening(buttonId) {
  isListening = true;
  console.log(isListening);
  buttons.forEach((button) => {
    button.isListening = button.id === buttonId ? true : false;
  });
}

function toggleLightSoundBtn(buttonId) {
  let soundBtn = document.querySelector(
    `.sound-btn[data-id="${buttonId}"]`
  );
  soundBtn.classList.toggle("sound-btn-active");
}

window.addEventListener("keydown", (event) => {
  let key = event.key;
  let button = buttons.find((button) => button.key === key);

  if (button !== undefined && !isListening) {
    let id = button.id;
    toggleLightSoundBtn(id);
    setTimeout(function () {
      toggleLightSoundBtn(id);
    }, 100);
  }
  if (!isListening && button.audio != undefined) {
    playSound(button.id);
  }
});

function playSound(buttonId) {
  let button = buttons.find((button) => button.id === buttonId);
  if (!button.audio.paused) {
    button.audio.currentTime = 0;
  } else {
    button.audio.play();
  }
}

function render() {
  keyBtns.forEach((keyBtn) => {
    let id = keyBtn.dataset.id;
    let button = buttons.find((button) => button.id === id);
    if (button.key != "") {
      keyBtn.innerHTML = button.key;
      keyBtn.classList.add("key-btn-assigned");
    } else {
      keyBtn.innerHTML =
        '<i class="fa fa-keyboard-o" aria-hidden="true"></i>';
      keyBtn.classList.remove("key-btn-assigned");
    }
  });
}
