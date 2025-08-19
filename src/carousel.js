// File removed as part of carousel feature rollback.
// Minimalist image carousel logic for Endonova landing page
// Supports next/prev arrows and indicators

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel__track');
  const slides = Array.from(document.querySelectorAll('.carousel__slide'));
  let current = 0;

  function updateCarousel(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    track.style.transform = `translateX(-${index * 100}vw)`;
    current = index;
  }

  // Auto-advance every 4 seconds
  setInterval(() => {
    updateCarousel((current + 1) % slides.length);
  }, 4000);

  // Init
  updateCarousel(0);
});
