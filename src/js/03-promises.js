import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formEl = document.querySelector('form');
const delayEl = document.querySelector('form [name=delay]')
const amountEl = document.querySelector('form [name=amount]');
const stepEl = document.querySelector('form [name=step]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(delayEl.value);

  for (let i = 1; i <= Number(amountEl.value); i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += Number(stepEl.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}