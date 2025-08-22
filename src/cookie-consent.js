// Cookie Consent Banner Logic
// Shows banner, handles accept/decline, stores choice in localStorage, disables Google Analytics if declined

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookieConsent');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');

  // RODO modal toggle
  const rodoCookieToggle = document.getElementById('rodoCookieToggle');

  // Helper: disable Google Analytics i zewnętrzne cookies (np. Orły Medycyny)
  function disableAnalytics() {
    window['ga-disable-G-K2QS8GKXEL'] = true;
    window['ga-disable-G-P0N3MC3SZL'] = true;
    // Usuń cookies analityczne i orlymedycyny oraz inne zewnętrzne
    document.cookie.split(';').forEach(function(c) {
      const name = c.trim().split('=')[0];
      if (
        name.startsWith('_ga') ||
        name.startsWith('_gid') ||
        name.match(/orly|orlymedycyny|orlymed|orlycookie/i) ||
        name.match(/cookieconsent|external|thirdparty/i)
      ) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      }
    });
  }

  // Show banner: jeśli decline, zawsze pokazuj popup; jeśli accept, nie pokazuj
  const consent = localStorage.getItem('cookieConsent');
  if (!consent || consent === 'decline') {
    banner.style.display = 'block';
    document.body.classList.add('cookie-banner-active');
    if (consent === 'decline') disableAnalytics();
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
