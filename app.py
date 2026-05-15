from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from calc.aritmatika import tambah, kurang, kali, bagi, pangkat, akar, modulus, floor_division
from calc.logika import and_op, or_op, not_op, xor_op, nand_op, nor_op
from calc.transformasi import konversi_basis, konversi_suhu, konversi_mata_uang, faktorial, fibonacci
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# ── HALAMAN UTAMA ────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

# ── HALAMAN ARITMATIKA ───────────────────────────────────────
@app.route('/aritmatika')
def aritmatika():
    return render_template('aritmatika.html')

@app.route('/api/aritmatika', methods=['POST'])
def api_aritmatika():
    data = request.get_json()
    operasi = data.get('operasi')
    try:
        a = float(data.get('a', 0))
        b = float(data.get('b', 0))
    except:
        return jsonify({"error": "Input harus berupa angka!"})

    if operasi == 'tambah':
        return jsonify(tambah(a, b))
    elif operasi == 'kurang':
        return jsonify(kurang(a, b))
    elif operasi == 'kali':
        return jsonify(kali(a, b))
    elif operasi == 'bagi':
        return jsonify(bagi(a, b))
    elif operasi == 'pangkat':
        return jsonify(pangkat(a, b))
    elif operasi == 'akar':
        return jsonify(akar(a))
    elif operasi == 'modulus':
        return jsonify(modulus(a, b))
    elif operasi == 'floor_division':
        return jsonify(floor_division(a, b))
    else:
        return jsonify({"error": "Operasi tidak dikenali!"})

# ── HALAMAN LOGIKA ───────────────────────────────────────────
@app.route('/logika')
def logika():
    return render_template('logika.html')

@app.route('/api/logika', methods=['POST'])
def api_logika():
    data = request.get_json()
    operasi = data.get('operasi')
    a = data.get('a') == 'true'
    b = data.get('b') == 'true'

    if operasi == 'and':
        return jsonify(and_op(a, b))
    elif operasi == 'or':
        return jsonify(or_op(a, b))
    elif operasi == 'not':
        return jsonify(not_op(a))
    elif operasi == 'xor':
        return jsonify(xor_op(a, b))
    elif operasi == 'nand':
        return jsonify(nand_op(a, b))
    elif operasi == 'nor':
        return jsonify(nor_op(a, b))
    else:
        return jsonify({"error": "Operasi tidak dikenali!"})

# ── HALAMAN TRANSFORMASI ─────────────────────────────────────
@app.route('/transformasi')
def transformasi():
    return render_template('transformasi.html')

@app.route('/api/transformasi/basis', methods=['POST'])
def api_basis():
    data = request.get_json()
    try:
        angka = data.get('angka')
        dari = int(data.get('dari'))
        ke = int(data.get('ke'))
        return jsonify(konversi_basis(angka, dari, ke))
    except:
        return jsonify({"error": "Input tidak valid!"})

@app.route('/api/transformasi/suhu', methods=['POST'])
def api_suhu():
    data = request.get_json()
    try:
        nilai = float(data.get('nilai'))
        dari = data.get('dari')
        ke = data.get('ke')
        return jsonify(konversi_suhu(nilai, dari, ke))
    except:
        return jsonify({"error": "Input tidak valid!"})

@app.route('/api/transformasi/matauang', methods=['POST'])
def api_matauang():
    data = request.get_json()
    try:
        jumlah = float(data.get('jumlah'))
        ke = data.get('ke')
        return jsonify(konversi_mata_uang(jumlah, ke))
    except:
        return jsonify({"error": "Input tidak valid!"})

@app.route('/api/transformasi/faktorial', methods=['POST'])
def api_faktorial():
    data = request.get_json()
    try:
        n = int(data.get('n'))
        return jsonify(faktorial(n))
    except:
        return jsonify({"error": "Input harus bilangan bulat!"})

@app.route('/api/transformasi/fibonacci', methods=['POST'])
def api_fibonacci():
    data = request.get_json()
    try:
        n = int(data.get('n'))
        return jsonify(fibonacci(n))
    except:
        return jsonify({"error": "Input harus bilangan bulat!"})

# ── RUN APP ──────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True)