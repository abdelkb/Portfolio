/* ── Navigation ──────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const burger    = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// Burger toggle
burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileMenu.classList.toggle('hidden', !open);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link, #mobile-menu .btn-primary').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.add('hidden');
  });
});

// Active nav link based on scroll
function updateActiveNav() {
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
  const scrollY = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

/* ── Scroll-triggered animations ─────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.animationDelay || '0ms';
        const ms = parseInt(delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, ms);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

/* ── Hero dot grid (decorative) ──────────────────────────────── */
const heroSection = document.getElementById('hero');
if (heroSection) {
  const dotContainer = document.createElement('div');
  dotContainer.className = 'absolute top-32 right-12 lg:right-20 grid gap-2.5 opacity-30 pointer-events-none';
  dotContainer.style.gridTemplateColumns = 'repeat(6, 1fr)';
  for (let i = 0; i < 36; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = 'width:5px;height:5px;border-radius:50%;background:#8b5cf6';
    dotContainer.appendChild(dot);
  }
  heroSection.appendChild(dotContainer);
}

/* ── Contact form ─────────────────────────────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const name    = form.querySelector('[name="name"]').value;
    const email   = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value || 'Contact depuis le portfolio';
    const message = form.querySelector('[name="message"]').value;

    const mailto = `mailto:abdeladimkaoukab@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;

    btn.textContent = 'Message préparé !';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
      btn.innerHTML = 'Envoyer le message <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>';
      btn.style.background = '';
    }, 3000);
  });
}

/* ── Smooth scroll for anchor links ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Typing animation for hero subtitle ──────────────────────── */
const titles = [
  'Administrateur Système',
  'Expert Azure & M365',
  'Architecte PowerShell',
  'Intégrateur IA & API',
];
let titleIdx = 0;
let charIdx  = 0;
let deleting = false;
const titleEl = document.querySelector('h2 .typing-target');

if (titleEl) {
  function typeTitle() {
    const current = titles[titleIdx];
    if (!deleting) {
      titleEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeTitle, 2200);
        return;
      }
    } else {
      titleEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
      }
    }
    setTimeout(typeTitle, deleting ? 45 : 80);
  }
  setTimeout(typeTitle, 1000);
}
