const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      formData = { ...formData, ...parsed };
      emailInput.value = parsed.email || '';
      messageInput.value = parsed.message || '';
    } catch (e) {
      console.warn('Помилка при зчитуванні з localStorage:', e);
    }
  }
});

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim(); // обрізаємо пробіли
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
