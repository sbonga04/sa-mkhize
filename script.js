

  const toggle = document.getElementById('modeToggle');

  // Apply saved theme on load
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ===== Page pager =====
(function () {
  const pages = [
    ['index.html',    'Home'],
    ['about.html',    'About'],
    ['skills.html',   'Skills'],
    ['projects.html', 'Projects'],
    ['contact.html',  'Contact']
  ];

  const file = location.pathname.split('/').pop() || 'index.html';
  const i = pages.findIndex(p => p[0] === file);
  if (i === -1) return;

  const go = (n) => {
    if (n < 0 || n >= pages.length) return;
    document.documentElement.classList.add('leaving');
    setTimeout(() => (location.href = pages[n][0]), 200);
  };

  // on-screen buttons
  const pager = document.createElement('div');
  pager.className = 'pager';
  if (i > 0) pager.insertAdjacentHTML('beforeend', `<a href="${pages[i-1][0]}" class="prev">← ${pages[i-1][1]}</a>`);
  if (i < pages.length - 1) pager.insertAdjacentHTML('beforeend', `<a href="${pages[i+1][0]}" class="next">${pages[i+1][1]} →</a>`);
  document.body.appendChild(pager);
  pager.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    go(a.classList.contains('next') ? i + 1 : i - 1);
  });

  // arrow keys (ignored while typing)
  document.addEventListener('keydown', e => {
    if (/input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') go(i + 1);
    if (e.key === 'ArrowLeft') go(i - 1);
  });

  // swipe (horizontal only)
  let sx = 0, sy = 0;
  document.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    go(dx < 0 ? i + 1 : i - 1);
  }, { passive: true });
})();