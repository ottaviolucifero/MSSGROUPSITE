/* Contact form handler */

function $(selector, root = document) {
  return root.querySelector(selector);
}

function show(el) {
  el.removeAttribute('hidden');
}

function hide(el) {
  el.setAttribute('hidden', '');
}

function setBusy(button, busy) {
  if (!button) return;
  button.disabled = busy;
  button.classList.toggle('opacity-60', busy);
  button.classList.toggle('pointer-events-none', busy);
}

function serializeForm(form) {
  const data = new FormData(form);
  // Basic honeypot filter: if hp has a value, drop
  if (data.get('_hp')) {
    return null;
  }
  const payload = {};
  for (const [k, v] of data.entries()) {
    if (k === '_hp') continue;
    payload[k] = v;
  }
  return payload;
}

async function submitContactForm(form) {
  const endpoint = form.dataset.endpoint || '/api/contact';
  const submitBtn = $('button[type="submit"]', form);
  const successEl = $('[data-contact-success]', form);
  const errorEl = $('[data-contact-error]', form);

  hide(successEl);
  hide(errorEl);

  const payload = serializeForm(form);
  if (!payload) {
    // honeypot triggered; pretend success
    show(successEl);
    form.reset();
    return;
  }

  setBusy(submitBtn, true);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Request failed');
    show(successEl);
    form.reset();
  } catch (e) {
    show(errorEl);
  } finally {
    setBusy(submitBtn, false);
  }
}

function initContactForms() {
  const forms = document.querySelectorAll('form[data-contact-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      submitContactForm(form);
    });
  });
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initContactForms);

export { initContactForms };
