/* ============================================================
   RADHA VAISHNAVI PORTFOLIO — SCRIPT
   ============================================================ */

// ── Nav: scroll glass effect ──────────────────────────────
const header = document.getElementById('site-header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  scheduleNavActiveUpdate();
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Nav: active link on scroll ────────────────────────────
const NAV_SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function getActiveSectionId() {
  const scrollY = window.scrollY + window.innerHeight * 0.35;
  let active = NAV_SECTION_IDS[0];
  for (const id of NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= scrollY) active = id;
  }
  return active;
}

function updateNavActiveState() {
  const activeId = getActiveSectionId();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
}

let navRaf = 0;
function scheduleNavActiveUpdate() {
  if (navRaf) return;
  navRaf = requestAnimationFrame(() => { navRaf = 0; updateNavActiveState(); });
}

window.addEventListener('resize', updateNavActiveState);
window.addEventListener('load', updateNavActiveState);
updateNavActiveState();

// ── Nav: smooth scroll ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', function (e) {
    const sel = this.getAttribute('href');
    if (!sel || sel === '#') return;
    const target = document.querySelector(sel);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile menu if open
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    setTimeout(updateNavActiveState, 500);
  });
});

// ── Mobile hamburger ──────────────────────────────────────
const hamburger = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// ── Typewriter effect ─────────────────────────────────────
const ROLES = ['Engineer', 'Researcher', 'Builder'];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  if (!tw) return;
  const word = ROLES[roleIdx];
  if (!deleting) {
    tw.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      setTimeout(() => { deleting = true; typeLoop(); }, 2000);
      return;
    }
    setTimeout(typeLoop, 100);
  } else {
    tw.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % ROLES.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 55);
  }
}
typeLoop();

// ── Scroll reveal (IntersectionObserver) ─────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Staggered children
const childObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.reveal-child');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('in-view'), i * 90);
      });
      childObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

// Observe parent containers that hold reveal-child elements
document.querySelectorAll(
  '.skills-groups, .projects-grid, .timeline, .certs-grid, .contact-links, .about-edu'
).forEach((el) => childObserver.observe(el));
