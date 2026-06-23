/* ── Navbar ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateActive();
}, { passive: true });

function updateActive() {
  const ids = ['hero','about','works','services','contact'];
  const y = window.scrollY + 90;
  ids.forEach(id => {
    const el  = document.getElementById(id);
    const lnk = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!el || !lnk) return;
    lnk.classList.toggle('active', y >= el.offsetTop && y < el.offsetTop + el.offsetHeight);
  });
}

/* ── Burger ───────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1,,s3] = burger.querySelectorAll('span');
  burger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
  s1.style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
  s3.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
});

document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  })
);

/* ── Dot grid ─────────────────────────────────────── */
const grid = document.getElementById('dot-grid');
if (grid) for (let i = 0; i < 36; i++) { const d = document.createElement('span'); grid.appendChild(d); }

/* ── Scroll reveal ────────────────────────────────── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseFloat(e.target.style.animationDelay) || 0;
    setTimeout(() => e.target.classList.add('visible'), delay * 1000);
    obs.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── Smooth scroll ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id);
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 74, behavior: 'smooth' }); }
  });
});

/* ── Contact form ─────────────────────────────────── */
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn  = e.target.querySelector('button[type="submit"]');
  const name = e.target.querySelector('[name="name"]').value;
  const mail = e.target.querySelector('[name="email"]').value;
  const subj = e.target.querySelector('[name="subject"]').value || 'Contact portfolio';
  const msg  = e.target.querySelector('[name="message"]').value;

  window.location.href = `mailto:abdeladimkaoukab@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${mail}\n\n${msg}`)}`;
  btn.textContent = '✓ Message préparé !';
  btn.style.background = '#059669';
  setTimeout(() => { btn.textContent = 'Envoyer'; btn.style.background = ''; }, 3000);
});
