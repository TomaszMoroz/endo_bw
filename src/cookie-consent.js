// Cookie Consent Banner Logic
// Shows banner, handles accept/decline, stores choice in localStorage, disables Google Analytics if declined

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookieConsent');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');

  // RODO modal toggle
  const rodoCookieToggle = document.getElementById('rodoCookieToggle');

  // Helper: disable Google Analytics
  function disableAnalytics() {
    window['ga-disable-G-K2QS8GKXEL'] = true;
    window['ga-disable-G-P0N3MC3SZL'] = true;
    // Usuń cookies analityczne jeśli istnieją
    document.cookie.split(';').forEach(function(c) {
      if (c.trim().startsWith('_ga') || c.trim().startsWith('_gid')) {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      }
    });
  }

  // Show banner only if not set
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    banner.style.display = 'block';
    document.body.classList.add('cookie-banner-active');
  } else if (consent === 'decline') {
    disableAnalytics();
    banner.style.display = 'none';
    document.body.classList.remove('cookie-banner-active');
  } else {
    banner.style.display = 'none';
    document.body.classList.remove('cookie-banner-active');
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'accept');
    banner.style.display = 'none';
    document.body.classList.remove('cookie-banner-active');
  });

  declineBtn.addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'decline');
    disableAnalytics();
    banner.style.display = 'none';
    document.body.classList.remove('cookie-banner-active');
  });

  // RODO modal checkbox obsługa
  if (rodoCookieToggle) {
    // Ustaw stan checkboxa na podstawie localStorage
    rodoCookieToggle.checked = localStorage.getItem('cookieConsent') === 'decline';
    rodoCookieToggle.addEventListener('change', function () {
      if (rodoCookieToggle.checked) {
        localStorage.setItem('cookieConsent', 'decline');
        disableAnalytics();
      } else {
        localStorage.setItem('cookieConsent', 'accept');
        // reload by force to enable cookies jeśli user zmienia zdanie
        window.location.reload();
      }
    });
  }
});
