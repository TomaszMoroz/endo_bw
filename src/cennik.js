// Cennik overlay logic: open/close, focus trap, hide landing

window.addEventListener('DOMContentLoaded', function () {
  var cennikBtn = document.getElementById('cennik-btn');
  var cennikOverlay = document.getElementById('cennik-overlay');
  var cennikClose = document.getElementById('cennik-close');

  function openCennik() {
    cennikOverlay.style.display = 'flex';
    document.body.classList.add('cennik-open');
    cennikOverlay.focus();
  }
  function closeCennik() {
    cennikOverlay.style.display = 'none';
    document.body.classList.remove('cennik-open');
    cennikBtn && cennikBtn.focus();
  }

  if (cennikBtn) cennikBtn.addEventListener('click', openCennik);
  if (cennikClose) cennikClose.addEventListener('click', closeCennik);
  if (cennikOverlay) cennikOverlay.addEventListener('click', function(e) {
    if (e.target === cennikOverlay) closeCennik();
  });
  document.addEventListener('keydown', function(e) {
    if (cennikOverlay && cennikOverlay.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeCennik();
    }
  });
});
