const root = document.documentElement;
const THEME_KEY = 'theme';

function applyThemeLabel() {
  const toggle = document.getElementById('theme-toggle');
  if (!(toggle instanceof HTMLButtonElement)) return;
  const isDark = root.dataset.theme !== 'light';
  const label = isDark ? toggle.dataset.labelDark : toggle.dataset.labelLight;
  if (label) {
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
  }
}

applyThemeLabel();

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const themeToggle = target.closest('#theme-toggle');
  if (!themeToggle) return;

  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (error) {
    void error;
  }
  applyThemeLabel();
});

const menuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open: boolean) {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  if (open) mobileMenu.querySelector('a')?.focus({ preventScroll: true });
}

menuToggle?.addEventListener('click', () => setMenu(Boolean(mobileMenu?.hidden)));

mobileMenu?.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof Element && target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

const header = document.getElementById('site-header');

function onScroll() {
  header?.classList.toggle('is-scrolled', window.scrollY > 4);
}

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const contactForm = document.getElementById('contact-form');

if (contactForm instanceof HTMLFormElement) {
  const status = document.getElementById('contact-status');
  const submitButton = contactForm.querySelector<HTMLButtonElement>('button[type="submit"]');

  const setStatus = (message: string, tone: 'ok' | 'error') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
    status.hidden = false;
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const endpoint = (contactForm.dataset.endpoint ?? '').trim();
    const mailto = contactForm.dataset.mailto ?? '';
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    if (!endpoint) {
      const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
      setStatus(contactForm.dataset.labelSuccess ?? '', 'ok');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.label ??= submitButton.textContent ?? '';
      submitButton.textContent = contactForm.dataset.labelSending ?? '';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('request failed');

      contactForm.reset();
      setStatus(contactForm.dataset.labelSuccess ?? '', 'ok');
    } catch (error) {
      void error;
      setStatus(contactForm.dataset.labelError ?? '', 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        if (submitButton.dataset.label) submitButton.textContent = submitButton.dataset.label;
      }
    }
  });
}

const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  try {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } catch (error) {
    void error;
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}
