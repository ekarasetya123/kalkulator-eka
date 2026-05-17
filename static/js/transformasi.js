// ── STYLE TAB BUTTONS ────────────────────────────────────
const tabStyle = `
  font-size:13px;font-weight:600;color:var(--mute);
  background:none;border:none;cursor:pointer;
  padding:10px 14px;border-radius:var(--radius-lg);
  transition:all 0.15s;display:inline-flex;
  align-items:center;gap:6px;white-space:nowrap;
`;
const tabActiveStyle = `
  font-size:13px;font-weight:700;color:var(--on-primary);
  background:var(--primary);border:none;cursor:pointer;
  padding:10px 14px;border-radius:var(--radius-lg);
  transition:all 0.15s;display:inline-flex;
  align-items:center;gap:6px;white-space:nowrap;
`;

document.addEventListener('DOMContentLoaded', () => {
  // Apply tab styles
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.style.cssText = btn.classList.contains('active') ? tabActiveStyle : tabStyle;
  });
  renderHistory('transformasi');
});

// ── TAB NAVIGATION ───────────────────────────────────────
function gantiTab(el, tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.getElementById(`tab-${tab}`).style.display = 'block';
  document.querySelectorAll('.tab-btn').forEach(b => b.style.cssText = tabStyle);
  el.style.cssText = tabActiveStyle;
}

// ── BASIS ────────────────────────────────────────────────
let basisKe = 2;

function pilihBasisKe(el, ke) {
  document.querySelectorAll('#tab-basis .op-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  basisKe = ke;
}

async function hitungBasis() {
  const angka = document.getElementById('basisInput').value.trim();
  const dari  = parseInt(document.getElementById('basisDari').value);
  if (!angka) { showError('result', 'Masukkan angka terlebih dahulu!'); return; }

  const data = await callAPI('/api/transformasi/basis', { angka, dari, ke: basisKe });
  tampilkanHasilCustom('result', data);
  if (!data.error) saveHistory('transformasi', `Basis: ${angka} (${dari}) → basis ${basisKe}`, data.hasil);
}

// ── SUHU ─────────────────────────────────────────────────
async function hitungSuhu() {
  const nilai = document.getElementById('suhuInput').value;
  const dari  = document.getElementById('suhuDari').value;
  const ke    = document.getElementById('suhuKe').value;
  if (nilai === '') { showError('result-suhu', 'Masukkan nilai suhu!'); return; }

  const data = await callAPI('/api/transformasi/suhu', { nilai, dari, ke });
  tampilkanHasilCustom('result-suhu', data);
  if (!data.error) saveHistory('transformasi', `Suhu: ${nilai}° ${dari} → ${ke}`, data.hasil);
}

// ── MATA UANG ────────────────────────────────────────────
async function hitungUang() {
  const jumlah = document.getElementById('uangInput').value;
  const ke     = document.getElementById('uangKe').value;
  if (!jumlah) { showError('result-uang', 'Masukkan jumlah IDR!'); return; }

  const data = await callAPI('/api/transformasi/matauang', { jumlah, ke });
  tampilkanHasilCustom('result-uang', data);
  if (!data.error) saveHistory('transformasi', `IDR ${parseInt(jumlah).toLocaleString()} → ${ke}`, data.hasil);
}

// ── FAKTORIAL ────────────────────────────────────────────
async function hitungFaktorial() {
  const n = document.getElementById('faktorialInput').value;
  if (n === '') { showError('result-faktorial', 'Masukkan nilai N!'); return; }

  const data = await callAPI('/api/transformasi/faktorial', { n });
  tampilkanHasilCustom('result-faktorial', data);
  if (!data.error) saveHistory('transformasi', `${n}!`, data.hasil);
}

// ── FIBONACCI ────────────────────────────────────────────
async function hitungFibonacci() {
  const n = document.getElementById('fibonacciInput').value;
  if (n === '') { showError('result-fibonacci', 'Masukkan jumlah suku!'); return; }

  const data = await callAPI('/api/transformasi/fibonacci', { n });
  if (data.error) { showError('result-fibonacci', data.error); return; }

  // Tampilkan deret fibonacci dengan animasi
  const deretHTML = data.deret.map((num, i) => `
    <span style="
      display:inline-flex;align-items:center;justify-content:center;
      background:${i === data.deret.length-1 ? 'var(--primary)' : 'var(--canvas-soft)'};
      color:${i === data.deret.length-1 ? 'var(--on-primary)' : 'var(--ink)'};
      border-radius:var(--radius-lg);
      padding:8px 12px;font-family:'JetBrains Mono',monospace;
      font-weight:${i === data.deret.length-1 ? '900' : '600'};
      font-size:14px;
      animation:fadeInUp 0.3s ease ${i * 0.03}s both;
    ">${num}</span>
  `).join('');

  const langkahHTML = data.langkah.map((l, i) => `
    <div class="step-item" style="animation-delay:${i*0.05}s;margin-bottom:8px;">${l}</div>
  `).join('');

  document.getElementById('result-fibonacci').innerHTML = `
    <div class="result-box fade-in-up">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--canvas-soft);">
        <div style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></div>
        <span style="font-size:12px;font-weight:600;letter-spacing:0.5px;color:var(--mute);">HASIL FIBONACCI</span>
      </div>

      <div style="background:var(--canvas-soft);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:12px;">DERET</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">${deretHTML}</div>
      </div>

      <div style="background:var(--canvas-soft);border-radius:var(--radius-lg);padding:12px 16px;margin-bottom:16px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;color:var(--positive-deep);">
        ${data.rumus}
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:10px;">LANGKAH-LANGKAH</div>
        <div style="display:flex;flex-direction:column;gap:4px;">${langkahHTML}</div>
      </div>
    </div>`;

  saveHistory('transformasi', `Fibonacci ke-${n}`, data.hasil);
}

// ── HELPERS ──────────────────────────────────────────────
async function callAPI(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch(e) {
    return { error: 'Terjadi kesalahan koneksi.' };
  }
}

function showError(targetId, msg) {
  document.getElementById(targetId).innerHTML = `
    <div style="background:var(--negative-bg);border-radius:var(--radius-xl);padding:16px 20px;display:flex;align-items:center;gap:12px;">
      <i class="fas fa-exclamation-circle" style="color:var(--warning);font-size:18px;flex-shrink:0;"></i>
      <span style="font-size:14px;font-weight:600;color:#fff;">${msg}</span>
    </div>`;
}

function tampilkanHasilCustom(targetId, data) {
  if (data.error) { showError(targetId, data.error); return; }

  const langkahHTML = data.langkah.map((l, i) => `
    <div class="step-item" style="animation-delay:${i*0.05}s;margin-bottom:8px;">${l}</div>
  `).join('');

  document.getElementById(targetId).innerHTML = `
    <div class="result-box fade-in-up">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--canvas-soft);">
        <div style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></div>
        <span style="font-size:12px;font-weight:600;letter-spacing:0.5px;color:var(--mute);">HASIL KONVERSI</span>
      </div>

      <div style="background:var(--canvas-soft);border-radius:var(--radius-lg);padding:20px;text-align:center;margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:8px;">HASIL</div>
        <div style="font-size:2.2rem;font-weight:900;color:var(--ink);letter-spacing:-1px;font-family:'JetBrains Mono',monospace;">${data.hasil}</div>
      </div>

      <div style="background:var(--canvas-soft);border-radius:var(--radius-lg);padding:12px 16px;margin-bottom:16px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;color:var(--positive-deep);border:1px solid var(--primary-neutral);">
        ${data.rumus}
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;color:var(--mute);letter-spacing:0.5px;margin-bottom:10px;">LANGKAH-LANGKAH</div>
        <div style="display:flex;flex-direction:column;gap:4px;">${langkahHTML}</div>
      </div>
    </div>`;
}