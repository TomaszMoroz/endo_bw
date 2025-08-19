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
