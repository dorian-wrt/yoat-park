// Yoat Park — reservation glue script (lives in the Home page "Footer" custom code).
// Wires the native Webflow berth buttons to the reservation card:
// click a pin -> fill the recap, smooth-scroll down, compute total = price x nights.
// Elements are selected by data-yp / data-berth attributes set in the Webflow Designer.
(function () {
  function euro(n) { return (n || 0).toLocaleString('fr-FR') + ' €'; }

  var pins = document.querySelectorAll('[data-berth]');
  var f = {};
  ['name', 'pont', 'len', 'beam', 'draft', 'price', 'total'].forEach(function (k) {
    f[k] = document.querySelector('[data-yp="' + k + '"]');
  });
  var nights = document.querySelector('[data-yp="nights"]');
  var resv = document.querySelector('[data-yp="reservation"]');
  var cta = document.querySelector('[data-yp="cta"]');
  var cur = null;

  function render() {
    if (!cur || !f.total) return;
    var n = Math.max(1, parseInt((nights && nights.value) || '1', 10) || 1);
    f.total.textContent = euro(cur.price * n);
  }

  function select(p) {
    cur = {
      berth: p.getAttribute('data-berth'),
      pont: p.getAttribute('data-pont'),
      len: p.getAttribute('data-len'),
      beam: p.getAttribute('data-beam'),
      draft: p.getAttribute('data-draft'),
      price: parseInt(p.getAttribute('data-price'), 10),
      status: p.getAttribute('data-status')
    };
    if (f.name) f.name.textContent = 'Place ' + cur.berth;
    if (f.pont) f.pont.textContent = cur.pont;
    if (f.len) f.len.textContent = 'Longueur ' + cur.len + ' m';
    if (f.beam) f.beam.textContent = 'Largeur ' + cur.beam + ' m';
    if (f.draft) f.draft.textContent = "Tirant d'eau " + cur.draft + ' m';
    if (f.price) f.price.textContent = euro(cur.price) + ' / nuit';
    var taken = cur.status === 'taken';
    if (cta) {
      cta.textContent = taken ? 'Place déjà réservée' : 'Demander cette place';
      cta.style.opacity = taken ? '0.5' : '1';
      cta.style.pointerEvents = taken ? 'none' : 'auto';
    }
    render();
    if (resv) resv.scrollIntoView({ behavior: 'smooth' });
  }

  pins.forEach(function (p) {
    p.addEventListener('click', function (e) { e.preventDefault(); select(p); });
  });
  if (nights) nights.addEventListener('input', render);
  if (cta) cta.addEventListener('click', function () {
    if (cur && cur.status !== 'taken') {
      cta.textContent = '✓ Demande envoyée';
      cta.style.background = '#1f6f5c';
      cta.style.backgroundImage = 'none';
      cta.style.color = '#d9ffe8';
    }
  });
})();
