// Yoat Park — Home page "Footer" custom code (unified cinematic sequence).
//
// Sequence:
//  1) The hero background video plays ONCE (loop attribute removed in Webflow).
//  2) The serif headline types itself in, then eyebrow / subtitle / cue reveal.
//  3) When the video ends (or the user clicks the cue to skip), the video freezes
//     on its last frame, the headline block retracts (.yp-hideup), and the berth
//     pins fade in over the frozen port (.yp-berthwrap -> .show).
//  4) Clicking a berth pin fills the reservation recap, smooth-scrolls to it, and
//     keeps the total = price x nights in sync.
//
// Hooks are data-yp / data-berth attributes + yp-* classes on native Webflow
// elements. Caret blink, reveal and retract transitions live in the page <head>.
(function () {
  var video = document.querySelector('.yp-vhero-video');
  var content = document.querySelector('.yp-vhero-content');
  var overlay = document.querySelector('.yp-vhero-overlay');
  var wrap = document.querySelector('.yp-berthwrap');
  var title = document.querySelector('[data-yp="vtitle"]');
  var eyebrow = document.querySelector('[data-yp="eyebrow"]');
  var vsub = document.querySelector('[data-yp="vsub"]');
  var cue = document.querySelector('[data-yp="scrollcue"]');
  if (cue) cue.textContent = 'Choisir ma place maintenant ↓';

  /* ---- Typewriter headline ---- */
  if (title) {
    var full = title.getAttribute('data-type') || title.textContent || '';
    title.textContent = '';
    var txt = document.createTextNode('');
    var caret = document.createElement('span');
    caret.className = 'yp-caret';
    caret.textContent = '|';
    title.appendChild(txt);
    title.appendChild(caret);
    var i = 0;
    function type() {
      if (i < full.length) {
        txt.textContent += full.charAt(i);
        var p = full.charAt(i) === ' ' ? 70 : 44;
        i++;
        setTimeout(type, p);
      } else {
        if (vsub) vsub.classList.add('show');
        if (cue) cue.classList.add('show');
        setTimeout(function () { caret.style.display = 'none'; }, 1400);
      }
    }
    if (eyebrow) setTimeout(function () { eyebrow.classList.add('show'); }, 250);
    setTimeout(type, 700);
  }

  /* ---- Video ends -> freeze, retract title, reveal berths ---- */
  var revealed = false;
  function revealBerths() {
    if (revealed) return;
    revealed = true;
    if (video) {
      try {
        video.pause();
        if (isFinite(video.duration) && video.duration) video.currentTime = Math.max(0, video.duration - 0.05);
      } catch (e) {}
    }
    if (content) content.classList.add('yp-hideup');
    if (cue) cue.classList.add('yp-hideup');
    if (overlay) overlay.style.opacity = '0.3';
    if (wrap) wrap.classList.add('show');
  }
  if (video) {
    video.addEventListener('ended', revealBerths);
    video.addEventListener('loadedmetadata', function () {
      if (isFinite(video.duration) && video.duration > 0) {
        setTimeout(function () { revealBerths(); }, (video.duration * 1000) + 1500);
      }
    });
    var pr = video.play && video.play();
    if (pr && pr.catch) pr.catch(function () {});
  }
  if (cue) cue.addEventListener('click', function (e) { e.preventDefault(); revealBerths(); });

  /* ---- Reservation glue ---- */
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
