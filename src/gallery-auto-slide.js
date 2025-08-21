const images = [
  '/carousel/cabin2.jpeg',
  '/carousel/office.jpeg',
  '/carousel/entry.jpeg',
  '/carousel/lobby2.jpeg',
  '/carousel/coloSQR.jpeg',
  '/carousel/cabin.jpeg',
  '/carousel/profesorz.jpeg',
  '/carousel/waitingroom.jpeg',
  '/carousel/lobby.jpeg'
];
const alts = [
  'Wnętrze gabinetu Endonova',
  'Gabinet Endonova',
  'Wejście do Endonova',
  'Poczekalnia Endonova',
  'Kolonoskopia Endonova',
  'Gabinet Endonova 2',
  'Lekarz Endonova',
  'Poczekalnia 2 Endonova',
  'Lobby Endonova'
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
    img.style.transition = 'none';
    img.style.opacity = 0;
    img.style.transform = 'translateX(-60vw)';
    setTimeout(() => {
      img.src = images[idx];
      img.alt = alts[idx];
      img.style.transition = 'opacity 0.3s, transform 0.7s cubic-bezier(.4,0,.2,1)';
      img.style.opacity = 1;
      img.style.transform = 'translateX(15px)';
    }, 80);
  }

  setInterval(() => {
    current = (current + 1) % images.length;
    show(current);
  }, 3500);
});
