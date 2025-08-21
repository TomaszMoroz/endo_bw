import { setupContactFormEmail } from './contact-email.js';
// Inicjalizacja obsługi formularza kontaktowego (EmailJS, walidacja, popupy)
document.addEventListener('DOMContentLoaded', () => {
  setupContactFormEmail();
});
// --- THEME TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  function setTheme(mode) {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }
  // Initial theme
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark');
    });
  }
});
// --- NAV MOBILE DROPDOWN ---
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.querySelector('.nav__mobile-btn');
  const mobileDropdown = document.querySelector('.nav__mobile-dropdown');
  if (mobileBtn && mobileDropdown) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileDropdown.classList.remove('open');
      }
    });
  }
});

// Minimalist sidepanel logic for overlays (cennik, artykuly, gastroskopia, kolonoskopia)
document.addEventListener('DOMContentLoaded', () => {
  // Open panel
  document.querySelectorAll('[data-panel-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      const panelId = btn.getAttribute('data-panel-open')
      openPanel(panelId)
    })
  })

  // Close panel
  document.querySelectorAll('.sidepanel__close').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      const panel = btn.closest('.sidepanel')
      closePanel(panel)
    })
  })

  // ESC key closes any open panel
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sidepanel.open').forEach(panel => closePanel(panel))
    }
  })
})

function openPanel(panelId) {
  const panel = document.getElementById(panelId)
  if (!panel) return
  panel.classList.add('open')
  // Trap focus inside panel
  trapFocus(panel)
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
}

function closePanel(panel) {
  if (!panel) return
  panel.classList.remove('open')
  document.body.style.overflow = ''
}

// Focus trap for accessibility
function trapFocus(panel) {
  const focusable = panel.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])')
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  panel.addEventListener('keydown', function handler(e) {
    if (!panel.classList.contains('open')) {
      panel.removeEventListener('keydown', handler)
      return
    }
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
  })
  setTimeout(() => first.focus(), 100)
}
