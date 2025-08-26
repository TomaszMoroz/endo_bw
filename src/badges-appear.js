// Animowane pojawianie się wyróżnień na dole sekcji opisu (hero)

// Animates badges when their parent enters the viewport
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.badges__container');
  if (!container) return;
  const badges = container.querySelectorAll('.badges__item');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        badges.forEach((badge, i) => {
          setTimeout(() => {
            badge.classList.add('badge-visible');
          }, i * 180);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
});
