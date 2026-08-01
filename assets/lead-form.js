(function () {
  'use strict';

  // ==== EDITEZ ICI : votre access key Web3Forms ====
  // 1. Créez votre compte sur https://web3forms.com
  // 2. Copiez votre access key et collez-la ci-dessous
  // 3. Mettez à jour votre email dans votre dashboard Web3Forms
  var ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

  var containers = document.querySelectorAll('#lead-form');
  if (!containers.length) return;

  var css = '' +
    '#lead-form{width:100%}' +
    '#lead-form .lead-form{display:flex;flex-direction:column;gap:12px;width:100%}' +
    '#lead-form input,#lead-form textarea,#lead-form select{padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;font-family:inherit;font-size:1rem;width:100%}' +
    '#lead-form input:focus,#lead-form textarea:focus,#lead-form select:focus{outline:none;border-color:var(--cyan);background:rgba(255,255,255,.08)}' +
    '#lead-form input::placeholder,#lead-form textarea::placeholder{color:#8a93b8}' +
    '#lead-form textarea{resize:vertical;min-height:90px}' +
    '#lead-form .btn-submit{justify-content:center;width:100%;cursor:pointer;font-family:inherit}' +
    '#lead-form .lead-consent{display:flex;gap:8px;align-items:flex-start;text-align:left;font-size:.75rem;color:var(--muted);line-height:1.5}' +
    '#lead-form .lead-consent input{width:auto;margin-top:3px}' +
    '#lead-form .lead-error{display:none;color:#ff6b6b;font-size:.85rem;background:rgba(255,107,107,.12);padding:10px 14px;border-radius:10px}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function buildForm(city) {
    var label = city ? 'Nouveau devis - Salon \u00e0 ' + city : 'Nouveau devis - Luxoria Digital';
    var form = document.createElement('form');
    form.className = 'lead-form';
    form.action = 'https://api.web3forms.com/submit';
    form.method = 'POST';
    form.innerHTML = '' +
      '<input type="hidden" name="access_key" value="' + ACCESS_KEY + '">' +
      '<input type="hidden" name="subject" value="' + label + '">' +
      '<input type="hidden" name="from_name" value="Luxoria Digital">' +
      '<input type="hidden" name="redirect" value="https://luxoriadigital.be/merci.html">' +
      '<input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">' +
      '<input type="text" name="name" required placeholder="Votre nom">' +
      '<input type="email" name="email" required placeholder="Votre email">' +
      '<input type="tel" name="phone" placeholder="Votre t\u00e9l\u00e9phone (optionnel)">' +
      '<select name="service" required>' +
      '<option value="" disabled selected>Service souhait\u00e9</option>' +
      '<option>Cr\u00e9ation de site web</option>' +
      '<option>Refonte de site</option>' +
      '<option>SEO local</option>' +
      '<option>Autre</option>' +
      '</select>' +
      '<textarea name="message" rows="3" placeholder="Parlez-nous de votre salon..."></textarea>' +
      '<div class="lead-error" role="alert">Une erreur est survenue. R\u00e9essayez ou \u00e9crivez-nous directement \u00e0 contact@luxoriadigital.be</div>' +
      '<button type="submit" class="btn-primary btn-submit">Demander mon devis gratuit</button>' +
      '<label class="lead-consent"><input type="checkbox" name="consent" required> En envoyant ce formulaire, j\u2019accepte le traitement de mes donn\u00e9es selon la <a href="/confidentialite.html" style="color:var(--cyan)">politique de confidentialit\u00e9</a>.</label>';

    form.addEventListener('submit', function (e) {
      var error = form.querySelector('.lead-error');
      var consent = form.querySelector('[name="consent"]');
      if (!consent.checked) {
        e.preventDefault();
        error.textContent = 'Veuillez accepter la politique de confidentialit\u00e9 pour continuer.';
        error.style.display = 'block';
        return;
      }
      if (form.action.indexOf('api.web3forms.com') > -1 && ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
        e.preventDefault();
        error.textContent = 'Le formulaire n\u2019est pas encore configur\u00e9 (access key manquante). Contactez-nous \u00e0 contact@luxoriadigital.be';
        error.style.display = 'block';
      }
    });

    return form;
  }

  containers.forEach(function (el) {
    var city = el.getAttribute('data-city') || '';
    el.appendChild(buildForm(city));
  });
})();
