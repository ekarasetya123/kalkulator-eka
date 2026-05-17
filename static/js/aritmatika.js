let operasiAktif = 'tambah';

const infoMap = {
  tambah:        'Penjumlahan dua bilangan. Rumus: A + B',
  kurang:        'Pengurangan dua bilangan. Rumus: A − B',
  kali:          'Perkalian dua bilangan. Rumus: A × B',
  bagi:          'Pembagian dua bilangan. Rumus: A ÷ B (B ≠ 0)',
  pangkat:       'A dipangkatkan B. Rumus: Aᴮ',
  akar:          'Akar kuadrat dari A. Rumus: √A',
  modulus:       'Sisa pembagian A dengan B. Rumus: A mod B',
  floor_division:'Pembagian bulat ke bawah. Rumus: A // B',
};

function pilihOperasi(el, operasi) {
  document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  operasiAktif = operasi;

  // Sembunyikan input B untuk akar
  const wrapperB = document.getElementById('inputBWrapper');
  if (operasi === 'akar') {
    wrapperB.style.display = 'none';
    document.getElementById('inputGrid').style.gridTemplateColumns = '1fr';
  } else {
    wrapperB.style.display = 'block';
    document.getElementById('inputGrid').style.gridTemplateColumns = '1fr 1fr';
  }

  // Update info
  document.getElementById('infoOperasi').textContent = infoMap[operasi] || '';

  // Clear result
  document.getElementById('result').innerHTML = '';
}

async function hitung() {
  const a = document.getElementById('inputA').value;
  const b = document.getElementById('inputB').value;

  if (a === '') {
    document.getElementById('result').innerHTML = `
      <div style="background:var(--negative-bg);border-radius:var(--radius-xl);padding:16px 20px;color:#fff;font-size:14px;font-weight:600;">
        ⚠️ Masukkan angka terlebih dahulu!
      </div>`;
    return;
  }

  const btn = document.querySelector('button[onclick="hitung()"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menghitung...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/aritmatika', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operasi: operasiAktif, a, b })
    });
    const data = await res.json();

    tampilkanHasil(data);

    if (!data.error) {
      const opLabel = document.querySelector(`.op-btn.active`)?.textContent?.trim() || operasiAktif;
      saveHistory('aritmatika', `${opLabel}: ${a}${operasiAktif !== 'akar' ? ', ' + b : ''}`, data.hasil);
    }

  } catch(e) {
    document.getElementById('result').innerHTML = `
      <div style="background:var(--negative-bg);border-radius:var(--radius-xl);padding:16px;color:#fff;">
        ❌ Terjadi kesalahan koneksi.
      </div>`;
  } finally {
    btn.innerHTML = '<i class="fas fa-equals"></i> Hitung Sekarang';
    btn.disabled = false;
  }
}

// Enter key support
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') hitung();
});

// Load history on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHistory('aritmatika');
});