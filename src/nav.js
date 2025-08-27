// Hamburger menu logic for mobile nav

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-active');
    if (overlay) overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-active');
    if (overlay) overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Hide menu when any link is clicked (mobile UX best practice)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
  }
});

// --- SMOOTH SCROLL WITH NAVBAR OFFSET ---
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav--main');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  if (!nav || !navLinks.length) return;
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetRect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = targetRect.top + scrollTop - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
        // Aktualizuj hash w adresie URL (bez skoku)
        history.replaceState(null, '', hash);
      }
    });
  });
});
