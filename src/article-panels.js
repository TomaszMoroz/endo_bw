// Panel artykułu: otwieranie, zamykanie, overlay, focus-trap (wzór jak cennik)
(function() {
  const overlay = document.getElementById('modalOverlay');
  const gastroskopiaPanel = document.getElementById('gastroskopiaPanel');
  const kolonoskopiaPanel = document.getElementById('kolonoskopiaPanel');
  const closeBtns = document.querySelectorAll('[data-article-close]');
  let lastActive = null;
  let activePanel = null;
  let focusHandler = null;

  function openPanel(panel) {
  overlay.classList.add('is-active');
  panel.classList.add('is-active');
  // Scroll panel to top on open
  const content = panel.querySelector('.article-panel__content');
  if (content) content.scrollTop = 0;
  lastActive = document.activeElement;
  panel.focus();
  document.body.style.overflow = 'hidden';
  activePanel = panel;
  trapFocus(panel);
  }
  function closePanel() {
    if (!activePanel) return;
    overlay.classList.remove('is-active');
    activePanel.classList.remove('is-active');
    document.body.style.overflow = '';
    if (lastActive) lastActive.focus();
    releaseFocus();
    activePanel = null;
  }
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
    if (focusHandler && activePanel) activePanel.removeEventListener('keydown', focusHandler);
    focusHandler = null;
  }
  // Otwieranie paneli po kliknięciu w kafelek
  document.querySelectorAll('[data-article-open]').forEach(tile => {
    tile.addEventListener('click', e => {
      e.preventDefault();
      if (tile.getAttribute('data-article-open') === 'gastroskopia') openPanel(gastroskopiaPanel);
      if (tile.getAttribute('data-article-open') === 'kolonoskopia') openPanel(kolonoskopiaPanel);
    });
  });
  // Zamknięcie przez overlay
  overlay.addEventListener('click', closePanel);
  // Zamknięcie przez przycisk
  closeBtns.forEach(btn => btn.addEventListener('click', closePanel));
  // Zamknięcie przez ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activePanel && activePanel.classList.contains('is-active')) closePanel();
  });
})();
