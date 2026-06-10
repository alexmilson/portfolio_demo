/* ============================================================
   RADHA VAISHNAVI — SCRIPT
   ============================================================ */

// ── Nav scroll glow ───────────────────────────────────────
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  scheduleNavUpdate();
}, { passive: true });
header.classList.toggle('scrolled', window.scrollY > 10);

// ── Nav active link ───────────────────────────────────────
const SECTION_IDS = ['about','skills','projects','experience','certifications','contact'];
const navLinks    = document.querySelectorAll('.nav-links a[href^="#"]');

function getActiveId() {
  const threshold = window.scrollY + window.innerHeight * 0.38;
  let active = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= threshold) active = id;
  }
  return active;
}
function updateNav() {
  const id = getActiveId();
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
}
let raf = 0;
function scheduleNavUpdate() {
  if (raf) return;
  raf = requestAnimationFrame(() => { raf = 0; updateNav(); });
}
window.addEventListener('resize', updateNav);
updateNav();

// ── Smooth scroll + close mobile menu ─────────────────────
const hamburger  = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const sel = a.getAttribute('href');
    if (!sel || sel === '#') return;
    const target = document.querySelector(sel);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    setTimeout(updateNav, 600);
  });
});

// ── Hamburger ─────────────────────────────────────────────
hamburger.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// ── Typewriter ────────────────────────────────────────────
const ROLES = ['Engineer', 'Researcher', 'Builder'];
let rIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  if (!tw) return;
  const word = ROLES[rIdx];
  tw.textContent = deleting ? word.slice(0, cIdx - 1) : word.slice(0, cIdx + 1);
  deleting ? cIdx-- : cIdx++;
  if (!deleting && cIdx === word.length) {
    setTimeout(() => { deleting = true; type(); }, 1800);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % ROLES.length;
    setTimeout(type, 350);
    return;
  }
  setTimeout(type, deleting ? 50 : 95);
}
type();

// ── Scroll reveal with IntersectionObserver ───────────────
// Elements get the animation class ONLY when they enter the viewport.
// Before that they are fully visible (no opacity:0 hiding on load).
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('reveal-ready');
    revealObs.unobserve(el);
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

// Observe section headings, labels, text blocks
document.querySelectorAll(
  '.eyebrow, .h2, .about-text p, .contact-sub, .hero-stats'
).forEach(el => revealObs.observe(el));

// Staggered children observer
const childObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const children = entry.target.querySelectorAll(
      '.skill-group, .project-card, .timeline-item, .cert-card, .contact-card, .edu-item'
    );
    children.forEach((child, i) => {
      const cls = ['reveal-ready','reveal-ready-d1','reveal-ready-d2','reveal-ready-d3','reveal-ready-d4','reveal-ready-d5'];
      setTimeout(() => child.classList.add(cls[Math.min(i, cls.length - 1)]), i * 80);
    });
    childObs.unobserve(entry.target);
  });
}, { threshold: 0.05 });

document.querySelectorAll(
  '.skills-groups, .projects-grid, .timeline, .certs-grid, .contact-links, .about-edu'
).forEach(el => childObs.observe(el));
