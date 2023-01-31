import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('submit', submitForm);
feedbackForm.addEventListener(
  'input',
  throttle(setFormDataInLocalStorage, 500)
);

function setFormDataInLocalStorage(event) {
  const {
    elements: { email, message },
  } = event.currentTarget;

  const userData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function setInitialData() {
  if (localStorage.getItem('feedback-form-state') !== null) {
    const data = JSON.parse(localStorage.getItem('feedback-form-state'));
    feedbackForm.elements.email.value = data.email;
    feedbackForm.elements.message.value = data.message;
  }
}
setInitialData();

function submitForm(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  this.reset();
}
