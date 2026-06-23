/* ── Navbar scroll ───────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = ['hero','about','works','services','contact'];
  const scrollY = window.scrollY + 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!el || !link) return;
    link.classList.toggle('active', scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight);
  });
}

/* ── Burger menu ─────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const open = mobileMenu.classList.contains('open');
  burger.querySelectorAll('span')[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
  burger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
  burger.querySelectorAll('span')[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── Dot grid ────────────────────────────────────── */
const dotGrid = document.getElementById('dot-grid');
if (dotGrid) {
  for (let i = 0; i < 36; i++) {
    const dot = document.createElement('span');
    dotGrid.appendChild(dot);
  }
}

/* ── Scroll reveal ───────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.style.animationDelay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Smooth scroll ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ── Hero form ───────────────────────────────────── */
document.getElementById('hero-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  window.location.href = `mailto:abdeladimkaoukab@gmail.com?subject=Contact depuis le portfolio&body=Email: ${encodeURIComponent(email)}`;
});

/* ── Contact form ────────────────────────────────── */
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const name    = e.target.querySelector('[name="name"]').value;
  const email   = e.target.querySelector('[name="email"]').value;
  const subject = e.target.querySelector('[name="subject"]').value || 'Contact depuis le portfolio';
  const message = e.target.querySelector('[name="message"]').value;

  window.location.href = `mailto:abdeladimkaoukab@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)}`;

  btn.textContent = '✓ Message préparé !';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.innerHTML = 'Envoyer le message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:18px;height:18px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>';
    btn.style.background = '';
  }, 3000);
});
