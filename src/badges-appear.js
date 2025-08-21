// Animowane pojawianie się wyróżnień na dole sekcji opisu (hero)
(function() {
  const badges = document.getElementById('badges');
  if (!badges) return;
  const items = badges.querySelectorAll('.badges__item');
  let triggered = false;
  function fadeInBadges() {
    if (triggered) return;
    if (window.scrollY === 0) return; // czekaj na faktyczny scroll
    triggered = true;
    items.forEach((item, i) => {
      setTimeout(() => { item.classList.add('badge-visible'); }, i * 600);
    });
    window.removeEventListener('scroll', fadeInBadges);
  }
  window.addEventListener('scroll', fadeInBadges);
})();
