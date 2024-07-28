const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const themeToggle = document.getElementById("theme-toggle");

let isPlay = false;
let secCounter = 0;
let min;
let sec;
let centiSec;
let centiCounter = 0;
let minCounter = 0;
let isReset = false;
let lapItem = 0;
let previousLapTime = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause';
        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter} : `;
        }, 1000);
        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
    }
    toggleButton();
};

const reset = () => {
    isReset = true;
    play();
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = '&nbsp;0';
    minute.innerHTML = '0 : ';
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    const lapDifference = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timestamp");
    lapDifference.setAttribute("class", "lap-difference");

    let currentLapTime = minCounter * 6000 + secCounter * 100 + centiCounter;
    let difference = currentLapTime - previousLapTime;
    previousLapTime = currentLapTime;

    let diffMin = Math.floor(difference / 6000);
    let diffSec = Math.floor((difference % 6000) / 100);
    let diffCentiSec = difference % 100;

    number.innerText = `#${++lapItem}`;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;
    lapDifference.innerHTML = `+${diffMin}:${diffSec}:${diffCentiSec}`;

    li.append(number, timeStamp, lapDifference);
    laps.append(li);
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
