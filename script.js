const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 8);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('open');
  nav?.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.classList.remove('open');
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}

document.querySelectorAll('.js-year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// EmailJS configuration reused from the uploaded Urban Plus Care website.
// If Freedom Pro Services later gets its own EmailJS service/template, replace these three values only.
const EMAILJS_CONFIG = {
  publicKey: 'BlPTxiPfD9Fg0YW07',
  serviceId: 'service_ffn3avr',
  templateId: 'template_1egrq4k'
};

if (window.emailjs && document.querySelector('.emailjs-form')) {
  window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

function valueFrom(form, name) {
  return form.elements[name]?.value?.trim?.() || '';
}

function setFormStatus(form, message, type = '') {
  const status = form.querySelector('.form-status');
  if (!status) return;
  status.textContent = message;
  status.classList.remove('success', 'error');
  if (type) status.classList.add(type);
}

document.querySelectorAll('.emailjs-form').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!window.emailjs) {
      setFormStatus(form, 'The contact service could not load. Please email hello@freedomproservices.com directly.', 'error');
      return;
    }

    const button = form.querySelector('.form-submit');
    const originalText = button?.textContent || 'Send Message';
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    setFormStatus(form, '');

    const consent = Boolean(form.elements.sms_consent?.checked);
    const templateParams = {
      from_name: valueFrom(form, 'name'),
      phone_number: valueFrom(form, 'phone'),
      email: valueFrom(form, 'email'),
      subject: valueFrom(form, 'subject') || 'Freedom Pro Services Project Inquiry',
      message: [
        valueFrom(form, 'company') ? `Company: ${valueFrom(form, 'company')}` : '',
        valueFrom(form, 'location') ? `Project Location: ${valueFrom(form, 'location')}` : '',
        valueFrom(form, 'message')
      ].filter(Boolean).join('\n\n'),
      checked: consent ? 'Yes' : 'No'
    };

    try {
      await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      setFormStatus(form, 'Message sent successfully. Thank you — we received your inquiry.', 'success');
      form.reset();
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setFormStatus(form, 'Message failed to send. Please try again or email hello@freedomproservices.com directly.', 'error');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
});
