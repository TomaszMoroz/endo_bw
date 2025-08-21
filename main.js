// === BADGES MODAL LOGIC (mobile) ===
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('badgesTrophyBtn');
  var modal = document.getElementById('badgesModal');
  var overlay = document.getElementById('badgesModalOverlay');
  var back = document.getElementById('badgesModalBack');
  if (btn && modal && overlay && back) {
    btn.addEventListener('click', function () {
      modal.classList.add('is-active');
      overlay.classList.add('is-active');
    });
    back.addEventListener('click', function () {
      modal.classList.remove('is-active');
      overlay.classList.remove('is-active');
    });
    overlay.addEventListener('click', function () {
      modal.classList.remove('is-active');
      overlay.classList.remove('is-active');
    });
    // ESC key closes modal
    document.addEventListener('keydown', function (e) {
      if ((modal.classList.contains('is-active') || overlay.classList.contains('is-active')) && (e.key === 'Escape' || e.key === 'Esc')) {
        modal.classList.remove('is-active');
        overlay.classList.remove('is-active');
      }
    });
  }
});
// Badge fade-in after 2s on desktop
document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth > 700) {
    const badges = document.querySelectorAll('.badges__item');
    setTimeout(() => {
      badges.forEach((badge, i) => {
        setTimeout(() => badge.classList.add('badge-visible'), i * 250);
      });
    }, 2000);
  }
});

import './style.css'
import { setupContactFormEmail } from './src/contact-email.js';

// ===== MEDICAL CENTER WEBSITE FUNCTIONALITY =====

class MedicalCenterApp {
  constructor() {
    this.currentPage = 'main'
    this.init()
  }

  init() {
    this.setupNavigation()
    this.setupSmoothScrolling()
    this.setupFormHandling()
    this.setupModal()
    this.setupLoadingOverlay()
    this.setupScrollEffects()
    this.setupAccessibility()
    this.setupSubpages()
  }

  // ...oryginalna zawartość main.js...
}

// Add CSS for animations
const animationStyles = document.createElement('style')
animationStyles.textContent = `
  .animate-fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .form__input--error,
  .form__select--error,
  .form__textarea--error {
    border-color: var(--color-error) !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
  }

  .form__error {
    color: var(--color-error);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-1);
    display: block;
  }

  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      transition: none !important;
    }
  }
`
document.head.appendChild(animationStyles)

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Overlays: gastroskopia, kolonoskopia
  const overlays = ['gastroskopia', 'kolonoskopia'];
  overlays.forEach(id => {
    const overlay = document.getElementById(id);
    const openLinks = document.querySelectorAll(`a[data-overlay="${id}"]`);
    const closeBtn = document.getElementById(id + 'Back');
    // Ukrywamy tylko sekcje, które nie są overlayem
    const mainSections = Array.from(document.querySelectorAll('main > section, .awards')).filter(sec => sec !== overlay);
    openLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        mainSections.forEach(sec => sec.style.display = 'none');
        overlay.classList.add('overlay--visible');
        window.scrollTo({top: 0, behavior: 'auto'});
      });
    });
    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', e => {
        e.preventDefault();
        overlay.classList.remove('overlay--visible');
        setTimeout(() => {
          mainSections.forEach(sec => sec.style.display = '');
        }, 400);
        window.scrollTo({top: 0, behavior: 'auto'});
      });
    }
  });
  // Obsługa wysyłki email przez EmailJS
  setupContactFormEmail();

  // Cennik - pełnoekranowy panel z animacją
  const pricingSection = document.getElementById('cennik');
  const pricingLink = document.querySelector('a[href="#cennik"]');
  const pricingBack = document.getElementById('pricingBack');
  // Ukrywamy tylko sekcje, które nie są cennikiem
  const mainSections = Array.from(document.querySelectorAll('main > section, .awards, .articles')).filter(sec => sec !== pricingSection);

  if (pricingLink && pricingSection) {
    pricingLink.addEventListener('click', e => {
      e.preventDefault();
      mainSections.forEach(sec => sec.style.display = 'none');
      pricingSection.classList.add('pricing--visible');
      window.scrollTo({top: 0, behavior: 'auto'});
    });
  }
  if (pricingBack && pricingSection) {
    pricingBack.addEventListener('click', e => {
      e.preventDefault();
      pricingSection.classList.remove('pricing--visible');
      // Po zakończeniu animacji przywróć sekcje
      setTimeout(() => {
        mainSections.forEach(sec => sec.style.display = '');
      }, 400); // czas animacji z CSS
      window.scrollTo({top: 0, behavior: 'auto'});
    });
  }
})

// Export for testing
export { MedicalCenterApp }
