// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Starter kit cost calculator
const form = document.getElementById('calc');
const playersInput = document.getElementById('players');
const totalEl = document.getElementById('total');
const perEl = document.getElementById('per');
const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function update() {
  const players = Math.max(1, Math.min(30, parseInt(playersInput.value, 10) || 1));
  let shared = 0;
  let perPlayer = 0;
  form.querySelectorAll('input[type="checkbox"]:checked').forEach((box) => {
    const price = Number(box.dataset.price);
    if (box.hasAttribute('data-shared')) shared += price;
    else perPlayer += price;
  });
  const total = shared + perPlayer * players;
  totalEl.textContent = fmt.format(total);
  perEl.textContent = `${fmt.format(total / players)} per player (${players} player${players === 1 ? '' : 's'})`;
}

form.addEventListener('input', update);
form.addEventListener('submit', (e) => e.preventDefault());
update();
