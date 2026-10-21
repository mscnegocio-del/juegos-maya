"""Descarga la vista previa HQ (mp3) de sonidos de Freesound y verifica su licencia en la página.
Uso: python3 bajar.py <carpeta_raw> vaca=59245 perro=163459 ...
Guarda meta.json (id, título, autor, licencia) en la carpeta."""
import re, sys, subprocess, html, json, time, os
UA = "juegos-maya/1.0 (https://github.com/mscnegocio-del/juegos-maya) curl"
ids = dict(a.split("=") for a in sys.argv[2:])
outdir = sys.argv[1]
meta = {}
prev = json.load(open(f"{outdir}/meta.json")) if os.path.exists(f"{outdir}/meta.json") else {}
for nombre, sid in ids.items():
    if os.path.exists(f"{outdir}/{nombre}.mp3") and nombre in prev:
        meta[nombre] = prev[nombre]; continue
    for intento in range(5):
        r = subprocess.run(["curl", "-sSL", "-A", UA, "-w", "\n%{url_effective}", f"https://freesound.org/s/{sid}/"], capture_output=True, text=True).stdout
        page, final = r.rsplit("\n", 1)
        if 'data-mp3=' in page: break
        time.sleep(5 * (intento + 1))
    time.sleep(2)
    mp3 = re.search(r'data-mp3="([^"]+)"', page)[1].replace("-lq.mp3", "-hq.mp3")
    lic = re.search(r'href="(https?://creativecommons\.org/[^"]+)"', page)
    title = html.unescape(re.search(r'data-title="([^"]*)"', page)[1])
    user = re.search(r'/people/([^/]+)/', final)[1]
    subprocess.run(["curl", "-sSL", "-A", UA, "-o", f"{outdir}/{nombre}.mp3", mp3], check=True)
    meta[nombre] = dict(id=sid, title=title, user=user, license=lic[1] if lic else "?", url=f"https://freesound.org/s/{sid}/")
    print(f"{nombre:10} {sid:>7} {meta[nombre]['license']:55} {title} ({user})")
json.dump(meta, open(f"{outdir}/meta.json", "w"), ensure_ascii=False, indent=1)
