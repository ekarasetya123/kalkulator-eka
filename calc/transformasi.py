import math

# ── KONVERSI BASIS ──────────────────────────────────────────
def konversi_basis(angka, dari, ke):
    try:
        # Convert to decimal first
        decimal = int(str(angka), dari)
        if ke == 2:
            hasil = bin(decimal)[2:]
            nama = "Binary"
        elif ke == 8:
            hasil = oct(decimal)[2:]
            nama = "Octal"
        elif ke == 16:
            hasil = hex(decimal)[2:].upper()
            nama = "Hexadecimal"
        else:
            hasil = str(decimal)
            nama = "Decimal"

        langkah = [
            f"Input: {angka} (basis {dari})",
            f"Langkah 1: Konversi ke Decimal = {decimal}",
            f"Langkah 2: Konversi Decimal {decimal} ke basis {ke}",
            f"Hasil: {hasil} ({nama})"
        ]
        return {"hasil": hasil, "rumus": f"{angka} (basis {dari}) = {hasil} (basis {ke})", "langkah": langkah}
    except:
        return {"error": "Input tidak valid untuk basis yang dipilih!"}

# ── KONVERSI SUHU ───────────────────────────────────────────
def konversi_suhu(nilai, dari, ke):
    # Convert to Celsius first
    if dari == "celsius":
        celsius = nilai
    elif dari == "fahrenheit":
        celsius = (nilai - 32) * 5/9
    elif dari == "kelvin":
        celsius = nilai - 273.15
    elif dari == "reamur":
        celsius = nilai * 5/4

    # Convert from Celsius to target
    if ke == "celsius":
        hasil = celsius
        rumus = f"{nilai}°{dari[0].upper()} → {hasil:.2f}°C"
    elif ke == "fahrenheit":
        hasil = (celsius * 9/5) + 32
        rumus = f"{nilai}°{dari[0].upper()} → {hasil:.2f}°F"
    elif ke == "kelvin":
        hasil = celsius + 273.15
        rumus = f"{nilai}°{dari[0].upper()} → {hasil:.2f}K"
    elif ke == "reamur":
        hasil = celsius * 4/5
        rumus = f"{nilai}°{dari[0].upper()} → {hasil:.2f}°R"

    langkah = [
        f"Input: {nilai}° {dari.capitalize()}",
        f"Langkah 1: Konversi ke Celsius = {celsius:.2f}°C",
        f"Langkah 2: Konversi {celsius:.2f}°C ke {ke.capitalize()}",
        f"Hasil: {hasil:.2f}° {ke.capitalize()}"
    ]
    return {"hasil": round(hasil, 2), "rumus": rumus, "langkah": langkah}

# ── KONVERSI MATA UANG ──────────────────────────────────────
RATE = {
    "USD": 0.000062,
    "EUR": 0.000057,
    "SGD": 0.000083,
    "MYR": 0.000290,
    "JPY": 0.0094,
    "GBP": 0.000049,
    "AUD": 0.000096,
    "SAR": 0.000233,
}

def konversi_mata_uang(jumlah, ke):
    if ke not in RATE:
        return {"error": "Mata uang tidak tersedia!"}
    hasil = jumlah * RATE[ke]
    langkah = [
        f"Input: Rp {jumlah:,}",
        f"Rate: 1 IDR = {RATE[ke]} {ke}",
        f"Perhitungan: {jumlah:,} × {RATE[ke]}",
        f"Hasil: {hasil:,.4f} {ke}",
        f"(Rate statis, bukan real-time)"
    ]
    return {"hasil": round(hasil, 4), "rumus": f"Rp {jumlah:,} = {hasil:,.4f} {ke}", "langkah": langkah}

# ── FAKTORIAL ───────────────────────────────────────────────
def faktorial(n):
    if n < 0:
        return {"error": "Faktorial tidak bisa untuk bilangan negatif!"}
    if n > 20:
        return {"error": "Maksimal input adalah 20!"}
    hasil = math.factorial(n)
    langkah_perkalian = " × ".join(str(i) for i in range(n, 0, -1)) if n > 0 else "1"
    langkah = [
        f"Operasi: {n}!",
        f"Faktorial = perkalian semua bilangan dari {n} sampai 1",
        f"Perhitungan: {langkah_perkalian} = {hasil}",
        f"Hasil: {n}! = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{n}! = {hasil}", "langkah": langkah}

# ── FIBONACCI ───────────────────────────────────────────────
def fibonacci(n):
    if n <= 0:
        return {"error": "Input harus bilangan positif!"}
    if n > 30:
        return {"error": "Maksimal input adalah 30!"}
    deret = [0, 1]
    for i in range(2, n):
        deret.append(deret[-1] + deret[-2])
    deret = deret[:n]
    langkah = [
        f"Mencari {n} bilangan pertama deret Fibonacci",
        f"Rumus: F(n) = F(n-1) + F(n-2)",
        f"Dimulai dari: 0, 1",
        f"Deret: {', '.join(map(str, deret))}",
        f"Bilangan ke-{n}: {deret[-1]}"
    ]
    return {"hasil": deret[-1], "deret": deret, "rumus": f"F({n}) = {deret[-1]}", "langkah": langkah}