import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener('submit', submitForm);
feedbackForm.addEventListener(
  'input',
  throttle(setFormDataInLocalStorage, 500)
);

function setFormDataInLocalStorage(event) {
  // const form = event.target.closest('form');
  const {
    elements: { email, message },
  } = feedbackForm;

  const userData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userData));
}

function setInitialData() {
  if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    feedbackForm.elements.email.value = data.email;
    feedbackForm.elements.message.value = data.message;
  }
}
setInitialData();

function submitForm(event) {
  event.preventDefault();
  const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (data === null || data.email === '' || data.message === '') {
    return alert('Введіть Ваші дані');
  }
  console.log(data);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  this.reset();
}
