// Minimalistyczny panel cennika: otwieranie, zamykanie, overlay, focus-trap
(function() {
  const overlay = document.getElementById('modalOverlay');
  const panel = document.getElementById('cennikPanel');
  const closeBtn = document.getElementById('cennikClose');
  let lastActive = null;

  function openPanel() {
    overlay.classList.add('is-active');
    panel.classList.add('is-active');
    lastActive = document.activeElement;
    panel.focus();
    document.body.style.overflow = 'hidden';
    trapFocus(panel);
  }

  function closePanel() {
    overlay.classList.remove('is-active');
    panel.classList.remove('is-active');
    document.body.style.overflow = '';
    if (lastActive) lastActive.focus();
    releaseFocus();
  }

  // Focus trap
  let focusHandler = null;
  function trapFocus(el) {
    const focusable = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    focusHandler = function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    el.addEventListener('keydown', focusHandler);
  }
  function releaseFocus() {
    if (focusHandler) panel.removeEventListener('keydown', focusHandler);
    focusHandler = null;
  }

  // Open cennik (example: link with data-panel-open="cennik")
  document.querySelectorAll('[data-panel-open="cennik"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openPanel();
    });
  });
  // Overlay click closes
  overlay.addEventListener('click', closePanel);
  // Close button
  closeBtn.addEventListener('click', closePanel);
  // ESC closes
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('is-active')) closePanel();
  });
})();
