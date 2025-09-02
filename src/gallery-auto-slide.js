
const images = [
  '/carousel/entry.jpeg',
  '/carousel/award.jpg',
  '/carousel/lobby2.jpeg',
  '/carousel/wroom.jpg',
  '/carousel/waitingroom.jpg',
  '/carousel/profoffice.jpg',
  '/carousel/endo.jpg',
  '/carousel/endoroom1.jpg',
  '/carousel/endoroom2.jpg',
  // '/carousel/recepcja.jpg',
  // '/carousel/poczekalnia.jpg',
  // // '/carousel/waitingroom.jpeg',
  // '/carousel/lobby2.jpeg'
];
const alts = [
  'Wejscie do Endonova',
  'Nagroda Orly Medycyny',
  'Poczekalnia Endonova',
  'Poczekalnia Endonova 2',
  'Gabinet',
  'Logo',
  'Gabinet Zabiegowy',
  'Gabinet ',
];
let current = 0;

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  const img = document.querySelector('.gallery__img');
  if (!img) return;
  img.style.opacity = 1;
  img.style.transform = 'translateX(0)';

  function show(idx) {
    // Tylko na mobile: płynna animacja z preloadem
    if (window.matchMedia('(max-width: 700px)').matches) {
      // Preload nowego obrazka
      const preload = new window.Image();
      preload.src = images[idx];
      preload.onload = () => {
        // Wyjazd starego w lewo
        img.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.3s';
        img.style.transform = 'translateX(-100vw)';
        img.style.opacity = 0;
        setTimeout(() => {
          // Podmień src i wróć z prawej
          img.src = images[idx];
          img.alt = alts[idx];
          img.style.transition = 'none';
          img.style.transform = 'translateX(100vw)';
          void img.offsetWidth; // reflow
          img.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.3s';
          img.style.opacity = 1;
          img.style.transform = 'translateX(0)';
        }, 500);
      };
    } else {
      // Desktop: stara animacja
      img.style.transition = 'none';
      img.style.opacity = 0;
      img.style.transform = 'translateX(-60vw)';
      setTimeout(() => {
        img.src = images[idx];
        img.alt = alts[idx];
        img.style.transition = 'opacity 0.3s, transform 0.7s cubic-bezier(.4,0,.2,1)';
        img.style.opacity = 1;
        img.style.transform = 'translateX(0)';
      }, 80);
    }
  }

  setInterval(() => {
    current = (current + 1) % images.length;
    show(current);
  }, 3500);
});
