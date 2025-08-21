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
  if (!form) { console.log('[contact-email] Formularz nie znaleziony'); return; }
  const submitBtn = form.querySelector('button[type="submit"]');
  console.log('[contact-email] Formularz znaleziony, podpinam obsługę');

  // Dynamiczne blokowanie przycisku
  function updateButtonState() {
    if (!submitBtn) return;
    const valid = isFormValid(form);
    submitBtn.disabled = !valid;
    console.log('[contact-email] updateButtonState:', valid ? 'aktywny' : 'zablokowany');
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
    console.log('[contact-email] submit:', { name, email, msg });
    // Walidacja imienia
    if (!name) {
      showPopup('Podaj imię.', false);
      updateButtonState();
      console.log('[contact-email] Walidacja: brak imienia');
      return;
    }
    // Walidacja emaila
    if (!emailPattern.test(email)) {
      showPopup('Podaj poprawny adres e-mail.', false);
      updateButtonState();
      console.log('[contact-email] Walidacja: zły email');
      return;
    }
    // Walidacja długości wiadomości
    if (msg.length < 30) {
      showPopup('Wiadomość musi mieć przynajmniej 30 znaków.', false);
      updateButtonState();
      console.log('[contact-email] Walidacja: za krótka wiadomość');
      return;
    }
    submitBtn.disabled = true;
    const templateParams = {
      name,
      email,
      msg,
    };
    console.log('[contact-email] Wysyłam email przez emailjs', templateParams);
    emailjs.send('service_nw6par8', 'template_73orzfe', templateParams, 'rcc1xZOyxeZto4PeZ')
      .then(() => {
        showPopup('Dziękujemy za kontakt! Wiadomość została wysłana.', true);
        form.reset();
        updateButtonState();
        console.log('[contact-email] Email wysłany OK');
      }, (error) => {
        showPopup('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.', false);
        updateButtonState();
        console.error('[contact-email] Błąd emailjs:', error);
      });
  });
}
