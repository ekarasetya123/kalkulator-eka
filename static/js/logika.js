let operasiAktif = 'and';
let nilaiA = true;
let nilaiB = true;

const infoMap = {
  and:  'AND: True hanya jika KEDUA nilai True.\nA AND B → T,T=T | T,F=F | F,T=F | F,F=F',
  or:   'OR: True jika SALAH SATU nilai True.\nA OR B → T,T=T | T,F=T | F,T=T | F,F=F',
  not:  'NOT: Membalik nilai boolean.\nNOT True = False | NOT False = True',
  xor:  'XOR: True jika KEDUA nilai BERBEDA.\nA XOR B → T,T=F | T,F=T | F,T=T | F,F=F',
  nand: 'NAND: Kebalikan AND.\nNAND → T,T=F | T,F=T | F,T=T | F,F=T',
  nor:  'NOR: Kebalikan OR.\nNOR → T,T=F | T,F=F | F,T=F | F,F=T',
};

const tabelMap = {
  and:  [['T','T','T'],['T','F','F'],['F','T','F'],['F','F','F']],
  or:   [['T','T','T'],['T','F','T'],['F','T','T'],['F','F','F']],
  not:  [['T','-','F'],['F','-','T']],
  xor:  [['T','T','F'],['T','F','T'],['F','T','T'],['F','F','F']],
  nand: [['T','T','F'],['T','F','T'],['F','T','T'],['F','F','T']],
  nor:  [['T','T','F'],['T','F','F'],['F','T','F'],['F','F','T']],
};

function setNilai(ab, val, el) {
  if (ab === 'a') {
    nilaiA = val;
    document.getElementById('btnA_true').className  = val ? 'btn-wise-primary' : 'btn-wise-secondary';
    document.getElementById('btnA_false').className = val ? 'btn-wise-secondary' : 'btn-wise-primary';
    document.getElementById('labelA').textContent   = `A = ${val ? 'TRUE' : 'FALSE'}`;
    document.getElementById('labelA').style.color   = val ? 'var(--positive-deep)' : 'var(--negative)';
  } else {
    nilaiB = val;
    document.getElementById('btnB_true').className  = val ? 'btn-wise-primary' : 'btn-wise-secondary';
    document.getElementById('btnB_false').className = val ? 'btn-wise-secondary' : 'btn-wise-primary';
    document.getElementById('labelB').textContent   = `B = ${val ? 'TRUE' : 'FALSE'}`;
    document.getElementById('labelB').style.color   = val ? 'var(--positive-deep)' : 'var(--negative)';
  }
}

function pilihOperasi(el, operasi) {
  document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  operasiAktif = operasi;

  // Sembunyikan input B untuk NOT
  const wrapperB = document.getElementById('inputBWrapper');
  const grid     = document.getElementById('inputGrid');
  if (operasi === 'not') {
    wrapperB.style.display = 'none';
    grid.style.gridTemplateColumns = '1fr';
  } else {
    wrapperB.style.display = 'block';
    grid.style.gridTemplateColumns = '1fr 1fr';
  }

  document.getElementById('infoOperasi').innerHTML =
    (infoMap[operasi] || '').replace(/\n/g, '<br/>');

  renderTabel(operasi);
  document.getElementById('result').innerHTML = '';
}

function renderTabel(op) {
  const rows = tabelMap[op] || [];
  const isNot = op === 'not';
  let html = `
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr>
          <th style="padding:8px 12px;background:var(--canvas-soft);border-radius:var(--radius-sm);text-align:center;font-weight:700;color:var(--ink);">A</th>
          ${!isNot ? `<th style="padding:8px 12px;background:var(--canvas-soft);text-align:center;font-weight:700;color:var(--ink);">B</th>` : ''}
          <th style="padding:8px 12px;background:var(--primary);border-radius:var(--radius-sm);text-align:center;font-weight:700;color:var(--on-primary);">${op.toUpperCase()}</th>
        </tr>
      </thead>
      <tbody>`;

  rows.forEach(row => {
    const hasil = row[2];
    const warna = hasil === 'T' ? 'var(--positive-deep)' : 'var(--negative)';
    html += `<tr>
      <td style="padding:8px 12px;text-align:center;font-weight:600;border-bottom:1px solid var(--canvas-soft);">${row[0]}</td>
      ${!isNot ? `<td style="padding:8px 12px;text-align:center;font-weight:600;border-bottom:1px solid var(--canvas-soft);">${row[1]}</td>` : ''}
      <td style="padding:8px 12px;text-align:center;font-weight:900;color:${warna};border-bottom:1px solid var(--canvas-soft);">${hasil}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('tabelKebenaran').innerHTML = html;
}

async function hitung() {
  const btn = document.querySelector('button[onclick="hitung()"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menghitung...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/logika', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operasi: operasiAktif,
        a: String(nilaiA),
        b: String(nilaiB)
      })
    });
    const data = await res.json();
    tampilkanHasil(data);

    if (!data.error) {
      const label = operasiAktif === 'not'
        ? `NOT ${nilaiA}`
        : `${nilaiA} ${operasiAktif.toUpperCase()} ${nilaiB}`;
      saveHistory('logika', label, data.hasil);
    }
  } catch(e) {
    document.getElementById('result').innerHTML = `
      <div style="background:var(--negative-bg);border-radius:var(--radius-xl);padding:16px;color:#fff;">
        ❌ Terjadi kesalahan koneksi.
      </div>`;
  } finally {
    btn.innerHTML = '<i class="fas fa-code-branch"></i> Hitung Logika';
    btn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHistory('logika');
  pilihOperasi(document.querySelector('.op-btn.active'), 'and');
});