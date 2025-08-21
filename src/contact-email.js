// EmailJS integration for contact form
// https://www.emailjs.com/docs/sdk/installation/

import emailjs from 'emailjs-com';

function showPopup(message, isSuccess = true) {
  let popup = document.createElement('div');
  popup.className = 'contact-popup' + (isSuccess ? ' contact-popup--success' : ' contact-popup--error');
  popup.innerText = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add('contact-popup--visible');
  }, 10);
  setTimeout(() => {
    popup.classList.remove('contact-popup--visible');
    setTimeout(() => popup.remove(), 400);
  }, 3200);
}

// Funkcja sprawdzająca poprawność formularza
function isFormValid(form) {
  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const msg = form.elements['message'].value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return !!name && emailPattern.test(email) && msg.length >= 30;
}



export function setupContactFormEmail() {
  const form = document.querySelector('.contact-section__form form');
  if (!form) { return; }
  const submitBtn = form.querySelector('button[type="submit"]');

  // Dynamiczne blokowanie przycisku
  function updateButtonState() {
    if (!submitBtn) return;
  submitBtn.disabled = !isFormValid(form);
  }
  form.addEventListener('input', updateButtonState);
  form.addEventListener('change', updateButtonState);
  updateButtonState();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const msg = form.elements['message'].value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // Walidacja imienia
    if (!name) {
      showPopup('Podaj imię.', false);
      updateButtonState();
      return;
    }
    // Walidacja emaila
    if (!emailPattern.test(email)) {
      showPopup('Podaj poprawny adres e-mail.', false);
      updateButtonState();
      return;
    }
    // Walidacja długości wiadomości
    if (msg.length < 30) {
      showPopup('Wiadomość musi mieć przynajmniej 30 znaków.', false);
      updateButtonState();
      return;
    }
    submitBtn.disabled = true;
    const templateParams = {
      name,
      email,
      msg,
    };
    emailjs.send('service_nw6par8', 'template_73orzfe', templateParams, 'rcc1xZOyxeZto4PeZ')
      .then(() => {
        showPopup('Dziękujemy za kontakt! Wiadomość została wysłana.', true);
        form.reset();
        updateButtonState();
      }, (error) => {
        showPopup('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.', false);
        updateButtonState();
      });
  });
}
