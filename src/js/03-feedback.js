
import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onInputData, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFeedbackForm();

function onInputData(e) {
  formData = {
    email: refs.input.value.trim(),
    message: refs.textarea.value.trim(),
  };

  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Будь ласка, заповніть всі поля');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
  formData = {};
}

function populateFeedbackForm() {
  let data = localStorage.getItem(LOCAL_KEY);
  if (!data) return;
  formData = JSON.parse(data);
  refs.input.value = formData.email ?? '';
  refs.textarea.value = formData.message ?? '';
}
