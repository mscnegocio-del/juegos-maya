"""Regenera sw.js con la lista de archivos para usar sin internet y una versión
calculada del contenido (si cambia cualquier archivo, cambia la versión y la caché vieja se borra).

Uso: python3 tools/actualizar-sw.py   (correr siempre antes de hacer commit si cambió algo del sitio)
"""
import hashlib, json, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
INCLUIR = ["index.html", "manifest.webmanifest", "assets", "juegos"]
EXCLUIR_EXT = {".md"}

archivos = []
for entrada in INCLUIR:
    ruta = RAIZ / entrada
    for f in sorted([ruta] if ruta.is_file() else ruta.rglob("*")):
        if f.is_file() and f.suffix not in EXCLUIR_EXT:
            archivos.append(f.relative_to(RAIZ).as_posix())

h = hashlib.sha256()
for a in archivos:
    h.update(a.encode()); h.update((RAIZ / a).read_bytes())
version = h.hexdigest()[:10]

# Las páginas se piden como carpeta ("juegos/globos/"), así que también se guardan con esa URL
urls = ["./"] + [a.removesuffix("index.html") for a in archivos if a.endswith("/index.html")] + archivos

plantilla = (RAIZ / "tools" / "sw.plantilla.js").read_text()
sw = plantilla.replace("__VERSION__", version).replace("__ARCHIVOS__", json.dumps(urls, indent=2, ensure_ascii=False))
(RAIZ / "sw.js").write_text(sw)
print(f"sw.js: versión {version}, {len(urls)} URLs")
