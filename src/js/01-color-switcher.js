const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body')

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStartEl.addEventListener('click', onClickStart);
buttonStopEl.addEventListener('click', onClickStop);

function onClickStart(e) {
    bodyEl.style.backgroundColor = getRandomHexColor();    

    intervalId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    buttonStartEl.disabled = true;
    buttonStopEl.disabled = false;
}

function onClickStop(e) {
    clearInterval(intervalId);

    buttonStopEl.disabled = true;
    buttonStartEl.disabled = false;
}