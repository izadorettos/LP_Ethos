/* ── HAMBURGUER MOBILE ── */
const hamburger  = document.getElementById('hamburger');
const navMobile  = document.getElementById('navMobile');

function closeMenu() {
  hamburger.classList.remove('open');
  navMobile.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navMobile.setAttribute('aria-hidden', 'true');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('open');
      navMobile.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      navMobile.setAttribute('aria-hidden', 'false');
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
      closeMenu();
    }
  });

  // Fechar ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

/* ── FADE-UP SCROLL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── MARQUEE INFINITO ── */
['trackPhrases', 'trackLogos'].forEach(id => {
  const marqTrack = document.getElementById(id);
  if (marqTrack && marqTrack.children.length > 0) {
    if (!marqTrack.dataset.cloned) {
      Array.from(marqTrack.children).forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        marqTrack.appendChild(clone);
      });
      marqTrack.dataset.cloned = 'true';
    }
  }
});

/* ── HOVER CARDS ── */
document.querySelectorAll('.era-card:not(.featured), .metric-card, .depoimento').forEach(card => {
  card.style.transition = 'transform 0.28s ease, box-shadow 0.28s ease';
  card.addEventListener('mouseenter', () => {
    card.style.transform  = 'translateY(-4px)';
    card.style.boxShadow  = '0 10px 32px rgba(95,87,58,0.18)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.boxShadow  = '';
  });
});

/* ── ACCORDION ── */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item   = header.parentElement;
    const isOpen = item.classList.contains('active');

    // Fecha todos
    document.querySelectorAll('.accordion-item').forEach(other => {
      other.classList.remove('active');
    });

    // Abre o clicado (se estava fechado)
    if (!isOpen) item.classList.add('active');
  });

  // Hover na seta
  header.addEventListener('mouseenter', () => {
    const item  = header.parentElement;
    const arrow = header.querySelector('.js-arrow');
    if (arrow && !item.classList.contains('active')) {
      arrow.style.transform = 'translateX(5px)';
    }
  });
  header.addEventListener('mouseleave', () => {
    const item  = header.parentElement;
    const arrow = header.querySelector('.js-arrow');
    if (arrow && !item.classList.contains('active')) {
      arrow.style.transform = '';
    }
  });
});

/* ── SETAS EM LINKS COM JS-ARROW (exceto accordion) ── */
document.querySelectorAll('a').forEach(link => {
  const arrow = link.querySelector('.js-arrow');
  if (!arrow) return;
  // Não interfere nos accordions
  if (link.closest('.accordion-header')) return;

  arrow.style.display    = 'inline-block';
  arrow.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';

  link.addEventListener('mouseenter', () => { arrow.style.transform = 'translateX(6px)'; });
  link.addEventListener('mouseleave', () => { arrow.style.transform = ''; });
});

/* ── SUBMIT FORM (se existir) ── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  if (!btn) return;
  btn.textContent    = 'Enviado com sucesso ✓';
  btn.style.background = '#5F573A';
  btn.style.color    = '#F5F0E8';
  btn.disabled       = true;
  setTimeout(() => {
    window.open('https://form.typeform.com/to/mz4uF0W0?typeform-source=app.clickup.com', '_blank');
  }, 1000);
}

/* ── CONTADOR ANIMADO ── */
const countEls = document.querySelectorAll('.count-num');
if (countEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target  = parseInt(entry.target.dataset.target);
        const prefix  = entry.target.dataset.prefix  || '';
        const suffix  = entry.target.dataset.suffix  || '';
        const duration = 1800;
        const steps    = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          // Easing: começa rápido, desacelera no fim
          const ease = 1 - Math.pow(1 - step / steps, 3);
          current = Math.round(target * ease);
          entry.target.textContent = prefix + current + suffix;
          if (step >= steps) {
            clearInterval(timer);
            entry.target.textContent = prefix + target + suffix;
          }
        }, duration / steps);
      }
    });
  }, { threshold: 0.4 });

  countEls.forEach(el => countObserver.observe(el));
}
