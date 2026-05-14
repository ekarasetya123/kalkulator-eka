import math

def tambah(a, b):
    hasil = a + b
    langkah = [
        f"Operasi: {a} + {b}",
        f"Hasil: {a} + {b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a} + {b} = {hasil}", "langkah": langkah}

def kurang(a, b):
    hasil = a - b
    langkah = [
        f"Operasi: {a} - {b}",
        f"Hasil: {a} - {b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a} - {b} = {hasil}", "langkah": langkah}

def kali(a, b):
    hasil = a * b
    langkah = [
        f"Operasi: {a} × {b}",
        f"Hasil: {a} × {b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a} × {b} = {hasil}", "langkah": langkah}

def bagi(a, b):
    if b == 0:
        return {"error": "Tidak bisa membagi dengan angka 0!"}
    hasil = a / b
    langkah = [
        f"Operasi: {a} ÷ {b}",
        f"Hasil: {a} ÷ {b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a} ÷ {b} = {hasil}", "langkah": langkah}

def pangkat(a, b):
    hasil = a ** b
    langkah = [
        f"Operasi: {a} pangkat {b}",
        f"Artinya: {a} dikali dengan dirinya sendiri sebanyak {b} kali",
        f"Hasil: {a}^{b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a}^{b} = {hasil}", "langkah": langkah}

def akar(a):
    if a < 0:
        return {"error": "Tidak bisa menghitung akar dari bilangan negatif!"}
    hasil = math.sqrt(a)
    langkah = [
        f"Operasi: √{a}",
        f"Mencari bilangan yang jika dikuadratkan menghasilkan {a}",
        f"Hasil: √{a} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"√{a} = {hasil}", "langkah": langkah}

def modulus(a, b):
    if b == 0:
        return {"error": "Tidak bisa modulus dengan angka 0!"}
    hasil = a % b
    langkah = [
        f"Operasi: {a} mod {b}",
        f"Bagi {a} dengan {b}: {a} ÷ {b} = {a // b} sisa {hasil}",
        f"Modulus mengambil sisa bagi",
        f"Hasil: {a} mod {b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a} mod {b} = {hasil}", "langkah": langkah}

def floor_division(a, b):
    if b == 0:
        return {"error": "Tidak bisa floor division dengan angka 0!"}
    hasil = a // b
    langkah = [
        f"Operasi: {a} // {b}",
        f"Bagi {a} dengan {b} = {a / b}",
        f"Floor division membulatkan ke bawah",
        f"Hasil: {a} // {b} = {hasil}"
    ]
    return {"hasil": hasil, "rumus": f"{a} // {b} = {hasil}", "langkah": langkah}