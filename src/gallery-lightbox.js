// Gallery lightbox logic

document.addEventListener('DOMContentLoaded', function () {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('galleryLightboxImg');
  const lightboxClose = document.getElementById('galleryLightboxClose');
  let lastActiveThumb = null;

  function openLightbox(src, alt, thumb) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.style.display = 'flex';
    lightbox.focus();
    lastActiveThumb = thumb;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastActiveThumb) lastActiveThumb.focus();
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      openLightbox(thumb.src, thumb.alt, thumb);
    });
    thumb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(thumb.src, thumb.alt, thumb);
      }
    });
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('aria-label', 'Powiększ zdjęcie');
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeLightbox();
    }
  });
});
