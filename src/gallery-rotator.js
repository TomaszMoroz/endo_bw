
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
  const img = document.querySelector('.carousel__img');
  const left = document.querySelector('.carousel__arrow--left');
  const right = document.querySelector('.carousel__arrow--right');
  if (!img || !left || !right) return;

  function show(idx) {
    img.classList.add('carousel__img--fadeout');
    setTimeout(() => {
      img.src = images[idx];
      img.alt = alts[idx];
      img.classList.remove('carousel__img--fadeout');
    }, 250);
  }
  function next() {
    current = (current + 1) % images.length;
    show(current);
  }
  function prev() {
    current = (current - 1 + images.length) % images.length;
    show(current);
  }
  right.addEventListener('click', next);
  left.addEventListener('click', prev);
  let timer = setInterval(next, 5000);
  [img, left, right].forEach(el => el.addEventListener('mouseenter', () => clearInterval(timer)));
  [img, left, right].forEach(el => el.addEventListener('mouseleave', () => { timer = setInterval(next, 5000); }));
});
