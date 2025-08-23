
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
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const container = document.querySelector('.gallery__container');
  if (!container) return;

  if (isMobile) {
    // Mobile: two images for sliding effect
    container.innerHTML = `
      <img class="gallery__img gallery__img--current" src="${images[0]}" alt="${alts[0]}" style="position:absolute;left:0;top:0;width:100%;height:auto;transition:transform 0.7s cubic-bezier(.4,0,.2,1),opacity 0.3s;z-index:2;" />
      <img class="gallery__img gallery__img--next" src="${images[1]}" alt="${alts[1]}" style="position:absolute;left:100vw;top:0;width:100%;height:auto;transition:transform 0.7s cubic-bezier(.4,0,.2,1),opacity 0.3s;z-index:1;" />
    `;
    let idx = 0;
    let nextIdx = 1;
    const imgs = container.querySelectorAll('.gallery__img');
    function slide() {
      const currentImg = container.querySelector('.gallery__img--current');
      const nextImg = container.querySelector('.gallery__img--next');
      nextImg.src = images[nextIdx];
      nextImg.alt = alts[nextIdx];
      nextImg.style.left = '100vw';
      nextImg.style.opacity = '1';
      // trigger reflow
      void nextImg.offsetWidth;
      currentImg.style.transform = 'translateX(-100vw)';
      nextImg.style.transform = 'translateX(-100vw)';
      setTimeout(() => {
        currentImg.classList.remove('gallery__img--current');
        currentImg.classList.add('gallery__img--next');
        currentImg.style.transform = '';
        currentImg.style.left = '100vw';
        nextImg.classList.remove('gallery__img--next');
        nextImg.classList.add('gallery__img--current');
        nextImg.style.transform = '';
        nextImg.style.left = '0';
        idx = nextIdx;
        nextIdx = (nextIdx + 1) % images.length;
      }, 700);
    }
    setInterval(slide, 3500);
  } else {
    // Desktop: fallback to fade/slide
    const img = container.querySelector('.gallery__img');
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
        img.style.transform = 'translateX(0)';
      }, 80);
    }
    setInterval(() => {
      current = (current + 1) % images.length;
      show(current);
    }, 3500);
  }
});
