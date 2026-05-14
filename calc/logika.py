def and_op(a, b):
    hasil = a and b
    langkah = [
        f"Operasi: {a} AND {b}",
        f"AND bernilai True hanya jika KEDUA nilai True",
        f"Nilai A: {a}, Nilai B: {b}",
        f"Hasil: {a} AND {b} = {hasil}"
    ]
    return {"hasil": str(hasil), "rumus": f"{a} AND {b} = {hasil}", "langkah": langkah}

def or_op(a, b):
    hasil = a or b
    langkah = [
        f"Operasi: {a} OR {b}",
        f"OR bernilai True jika SALAH SATU nilai True",
        f"Nilai A: {a}, Nilai B: {b}",
        f"Hasil: {a} OR {b} = {hasil}"
    ]
    return {"hasil": str(hasil), "rumus": f"{a} OR {b} = {hasil}", "langkah": langkah}

def not_op(a):
    hasil = not a
    langkah = [
        f"Operasi: NOT {a}",
        f"NOT membalik nilai boolean",
        f"Nilai A: {a}",
        f"Hasil: NOT {a} = {hasil}"
    ]
    return {"hasil": str(hasil), "rumus": f"NOT {a} = {hasil}", "langkah": langkah}

def xor_op(a, b):
    hasil = a ^ b
    langkah = [
        f"Operasi: {a} XOR {b}",
        f"XOR bernilai True jika KEDUA nilai BERBEDA",
        f"Nilai A: {a}, Nilai B: {b}",
        f"Hasil: {a} XOR {b} = {bool(hasil)}"
    ]
    return {"hasil": str(bool(hasil)), "rumus": f"{a} XOR {b} = {bool(hasil)}", "langkah": langkah}

def nand_op(a, b):
    hasil = not (a and b)
    langkah = [
        f"Operasi: {a} NAND {b}",
        f"NAND adalah kebalikan dari AND",
        f"Pertama hitung AND: {a} AND {b} = {a and b}",
        f"Lalu dibalik dengan NOT",
        f"Hasil: NOT({a} AND {b}) = {hasil}"
    ]
    return {"hasil": str(hasil), "rumus": f"NOT({a} AND {b}) = {hasil}", "langkah": langkah}

def nor_op(a, b):
    hasil = not (a or b)
    langkah = [
        f"Operasi: {a} NOR {b}",
        f"NOR adalah kebalikan dari OR",
        f"Pertama hitung OR: {a} OR {b} = {a or b}",
        f"Lalu dibalik dengan NOT",
        f"Hasil: NOT({a} OR {b}) = {hasil}"
    ]
    return {"hasil": str(hasil), "rumus": f"NOT({a} OR {b}) = {hasil}", "langkah": langkah}