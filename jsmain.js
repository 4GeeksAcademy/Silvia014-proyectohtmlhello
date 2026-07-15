
  // Sticky nav background
  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 40);
  });

  // Mobile menu
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Motivo toggle (reserva / consulta) — also triggered from any CTA with data-motivo
  const motivoBtns = document.querySelectorAll('.motivo-btn');
  let motivoActual = 'reserva';
  function setMotivo(valor){
    motivoActual = valor;
    motivoBtns.forEach(b => b.classList.toggle('active', b.dataset.motivo === valor));
  }
  motivoBtns.forEach(btn => btn.addEventListener('click', () => setMotivo(btn.dataset.motivo)));
  document.querySelectorAll('[data-motivo]').forEach(el => {
    if (!el.classList.contains('motivo-btn')) {
      el.addEventListener('click', () => setMotivo(el.dataset.motivo));
    }
  });

  // Booking form -> WhatsApp deep link with prefilled message
  const form = document.getElementById('bookingForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const estilo = document.getElementById('estilo').value;
    const zona = document.getElementById('zona').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const tipo = motivoActual === 'reserva' ? 'Quiero reservar una cita' : 'Tengo una consulta general';
    let texto = `Hola, soy ${nombre}. ${tipo} en Veneno Tattoo.%0A` +
                `Teléfono: ${telefono}%0A` +
                `Estilo de interés: ${estilo}%0A`;
    if (zona) texto += `Zona del cuerpo: ${zona}%0A`;
    if (mensaje) texto += `Idea: ${mensaje}`;

    const url = `https://wa.me/34640134968?text=${texto}`;
    formMsg.classList.add('show');
    window.open(url, '_blank');
  });

  // Lightbox for gallery images
  document.querySelectorAll('.estilo-photo-wrap img').forEach(img => {
    img.addEventListener('click', () => {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  document.getElementById('lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('active');
  });

  
// Carrusel para estilos-grid
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('estilos-track');
  const prevBtn = document.getElementById('estilos-prev');
  const nextBtn = document.getElementById('estilos-next');

  function scrollAmount() {
    const card = track.querySelector('.estilo-card');
    return card ? card.offsetWidth + 20 : 300;
  }

  nextBtn.addEventListener('click', () => {
    // Si está al final, volver al principio
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      track.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      track.scrollBy({
        left: scrollAmount(),
        behavior: 'smooth'
      });
    }
  });

  prevBtn.addEventListener('click', () => {
    // Si está al principio, ir al final
    if (track.scrollLeft <= 5) {
      track.scrollTo({
        left: track.scrollWidth,
        behavior: 'smooth'
      });
    } else {
      track.scrollBy({
        left: -scrollAmount(),
        behavior: 'smooth'
      });
    }
  });
});

 // Carrusel para galeria-grid
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('galeria-track');
  const prevBtn = document.getElementById('galeria-prev');
  const nextBtn = document.getElementById('galeria-next');

  function scrollAmount() {
    const item = track.querySelector('.galeria-item');
    return item ? item.offsetWidth + 14 : 250;
  }

  nextBtn.addEventListener('click', () => {
    const paso = scrollAmount();

    // Si ya está al final, volver al principio
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      track.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      track.scrollBy({
        left: paso,
        behavior: 'smooth'
      });
    }
  });

  prevBtn.addEventListener('click', () => {
    const paso = scrollAmount();

    // Si está al principio, ir al final
    if (track.scrollLeft <= 5) {
      track.scrollTo({
        left: track.scrollWidth,
        behavior: 'smooth'
      });
    } else {
      track.scrollBy({
        left: -paso,
        behavior: 'smooth'
      });
    }
  });
});