import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');
const counterDays = document.querySelector('span[data-days]');
const counterHours = document.querySelector('span[data-hours]');
const counterMinutes = document.querySelector('span[data-minutes]');
const counterSeconds = document.querySelector('span[data-seconds]');

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

let intervalId = null;

buttonStartEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {        
        if (selectedDates[0].getTime() < new Date().getTime()) {
            buttonStartEl.disabled = true; 
            Notify.failure('Please choose a date in the future');;
        } else {
            Notify.success('OK');
            buttonStartEl.disabled = false;
        }
    },
};

const datePicker = flatpickr(inputEl, options);

buttonStartEl.addEventListener('click', onClickStart);

function pad(value) {
    return String(value).padStart(2, '0');
}

function startsCounter() {
    const counterValue = Date.parse(datePicker.selectedDates) - Date.now();
    const counterReadings = convertMs(counterValue);
    
    counterDays.textContent = pad(counterReadings.days);
    counterHours.textContent = pad(counterReadings.hours);
    counterMinutes.textContent = pad(counterReadings.minutes);
    counterSeconds.textContent = pad(counterReadings.seconds); 
    
    if (counterValue < 1000) {
        clearInterval(intervalId);
    }
}

function onClickStart() {
    startsCounter()
    intervalId = setInterval(startsCounter, 1000);
    
    buttonStartEl.disabled = true;    
}