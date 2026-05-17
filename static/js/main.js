// ── THEME TOGGLE ─────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');
  const btn  = document.getElementById('themeBtn');
  const current = html.getAttribute('data-theme');
  if (current === 'light') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (icon) { icon.className = 'fas fa-sun'; icon.style.color = '#9fe870'; }
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (icon) { icon.className = 'fas fa-moon'; icon.style.color = ''; }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = document.getElementById('themeIcon');
  if (icon && saved === 'dark') { icon.className = 'fas fa-sun'; icon.style.color = '#9fe870'; }
});

// ── HISTORY ──────────────────────────────────────────────
function saveHistory(kategori, operasi, hasil) {
  const key = `history_${kategori}`;
  let history = JSON.parse(localStorage.getItem(key) || '[]');
  history.unshift({ operasi, hasil, waktu: new Date().toLocaleTimeString('id-ID') });
  if (history.length > 10) history = history.slice(0, 10);
  localStorage.setItem(key, JSON.stringify(history));
  renderHistory(kategori);
}

function renderHistory(kategori) {
  const container = document.getElementById('historyList');
  if (!container) return;
  const history = JSON.parse(localStorage.getItem(`history_${kategori}`) || '[]');
  if (history.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px;color:var(--mute);">
        <i class="fas fa-clock" style="font-size:20px;margin-bottom:8px;display:block;color:var(--primary-neutral);"></i>
        <span style="font-size:13px;">Belum ada riwayat</span>
      </div>`;
    return;
  }
  container.innerHTML = history.map(item => `
    <div class="history-item" style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:13px;font-weight:600;color:var(--ink);">${item.operasi}</span>
        <span style="font-size:11px;color:var(--mute);">${item.waktu}</span>
      </div>
      <div style="font-size:15px;font-weight:900;color:var(--positive-deep);font-family:'JetBrains Mono',monospace;letter-spacing:-0.5px;">= ${item.hasil}</div>
    </div>
  `).join('');
}

function clearHistory(kategori) {
  localStorage.removeItem(`history_${kategori}`);
  renderHistory(kategori);
}

// ── TAMPILKAN HASIL ───────────────────────────────────────
function tampilkanHasil(data, operasiText) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;

  if (data.error) {
    resultDiv.innerHTML = `
      <div style="background:var(--negative-bg);border-radius:var(--radius-xl);padding:16px 20px;display:flex;align-items:center;gap:12px;" class="fade-in">
        <i class="fas fa-exclamation-circle" style="color:var(--warning);font-size:18px;flex-shrink:0;"></i>
        <span style="font-size:14px;font-weight:600;color:#fff;">${data.error}</span>
      </div>`;
    return;
  }

  const langkahHTML = data.langkah.map((l, i) => `
    <div class="step-item" style="animation-delay:${i * 0.05}s;margin-bottom:8px;">${l}</div>
  `).join('');

  resultDiv.innerHTML = `
    <div class="result-box fade-in-up">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--canvas-soft);">
        <div style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></div>
        <span style="font-size:12px;font-weight:600;letter-spacing:0.5px;color:var(--mute);">HASIL PERHITUNGAN</span>
      </div>

      <div style="background:var(--canvas-soft);border-radius:var(--radius-lg);padding:20px;text-align:center;margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:8px;">HASIL</div>
        <div class="result-number">${data.hasil}</div>
      </div>

      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:8px;">RUMUS</div>
        <div class="result-formula">${data.rumus}</div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:10px;">LANGKAH-LANGKAH</div>
        <div style="display:flex;flex-direction:column;gap:6px;">${langkahHTML}</div>
      </div>
    </div>`;
}