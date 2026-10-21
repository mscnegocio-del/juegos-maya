"""Busca sonidos CC0 de 0.4-10 s en Freesound, ordenados por descargas.
Uso: python3 buscar.py "cow moo" "dog bark" ..."""
import re, sys, urllib.parse, subprocess, html
UA = "juegos-maya/1.0 (https://github.com/mscnegocio-del/juegos-maya) curl"
def buscar(q):
    f = 'license:"Creative Commons 0" duration:[0.4 TO 10]'
    url = "https://freesound.org/search/?" + urllib.parse.urlencode({"q": q, "f": f, "s": "Downloads (most first)"})
    page = subprocess.run(["curl", "-sSL", "-A", UA, url], capture_output=True, text=True).stdout
    out = []
    for blk in page.split('class="bw-player"')[1:]:
        g = lambda k: (re.search(k + r'="([^"]*)"', blk) or [None, ""])[1]
        out.append((g("data-sound-id"), html.unescape(g("data-title")), float(g("data-duration") or 0), int(g("data-num-downloads") or 0), g("data-username"), g("data-mp3").replace("-lq.mp3", "-hq.mp3")))
    return out
for q in sys.argv[1:]:
    print("##", q)
    for r in buscar(q)[:7]:
        print(f"  {r[0]:>7} {r[2]:5.1f}s {r[3]:>6}dl  {r[1][:55]}  ({r[4]})")
