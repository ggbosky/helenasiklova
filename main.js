// Helena Šiklová – hlavička, menu, jednorázové odhalení, scroll-spy, formulář
const EMAIL = ''; // TODO: Helenin e-mail – pak formulář otevře e-mail s vyplněnou objednávkou

document.documentElement.classList.remove('no-js');

const hdr = document.querySelector('[data-top]');
const onScroll = () => hdr.classList.toggle('is-solid', scrollY > 12);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobilní menu
const menu = document.getElementById('menu');
document.querySelector('[data-menu-open]').addEventListener('click', () => menu.showModal());
document.querySelector('[data-menu-close]').addEventListener('click', () => menu.close());
menu.querySelectorAll('[data-menu-link]').forEach(a => a.addEventListener('click', () => menu.close()));

// jednorázové odhalení (nic se samo nehýbe dokola)
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('[data-reveal], [data-flow], .portrait').forEach(el => io.observe(el));

// scroll-spy
const links = [...document.querySelectorAll('.nav a')];
const spy = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) links.forEach(a => a.classList.toggle('is-active', a.hash === '#' + e.target.id));
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });

// formulář
const form = document.querySelector('[data-form]');
const note = form.querySelector('[data-form-note]');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  for (const el of form.querySelectorAll('[required]')) {
    const bad = el.type === 'checkbox' ? !el.checked : !el.value.trim();
    el.classList.toggle('is-bad', bad);
    if (bad) ok = false;
  }
  note.classList.toggle('is-bad', !ok);
  if (!ok) { note.textContent = 'Vyplňte prosím jméno, telefon a potvrďte souhlas.'; return; }
  const d = new FormData(form);
  const body = `Jméno: ${d.get('jmeno')}\nTelefon: ${d.get('telefon')}\nObec: ${d.get('obec') || '-'}\nPro koho: ${d.get('pro')}\n\n${d.get('zprava') || ''}`;
  if (EMAIL) {
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Objednávka – mobilní fyzioterapie')}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Otevírám e-mail s vaší objednávkou…';
  } else {
    note.textContent = 'Děkuji! (Ukázka webu – odesílání se napojí na e-mail po schválení.)';
    form.reset();
  }
});

// tlačítka u karet předvyplní „Pro koho“ ve formuláři
document.querySelectorAll('[data-pick]').forEach(a => a.addEventListener('click', () => {
  const r = form.querySelector(`input[name="pro"][value="${a.dataset.pick}"]`);
  if (r) r.checked = true;
}));
