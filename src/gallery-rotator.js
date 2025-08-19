// Minimalist image rotator for static gallery
// Cycles through all images in /carousel/ every 4 seconds, keeping proportions

document.addEventListener('DOMContentLoaded', function () {
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
  let current = 0;
  const img = document.getElementById('gallery-img');
  function showNext() {
    current = (current + 1) % images.length;
    img.src = images[current];
  }
  setInterval(showNext, 4000);
});
