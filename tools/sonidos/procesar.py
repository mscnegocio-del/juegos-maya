"""Recorta silencios, iguala volumen (~-17 dB medio), limita a 2.6 s y codifica MP3 mono 80 kbps.
Uso: python3 procesar.py <carpeta_raw> <carpeta_salida> [config.json]
ELEGIDOS mapea nombre final -> archivo en <carpeta_raw> (sin .mp3 si no se indica extensión).
config.json opcional: {"elegidos": {"ronroneo": "purr.oga"}, "max": {"ronroneo": 3.5}} para otros juegos;
sin config se usan los ELEGIDOS de los animales de abajo."""
import subprocess, re, sys, os, json
RAW, OUT = sys.argv[1], sys.argv[2]
CONFIG = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else {}
ELEGIDOS = {"vaca": "vaca", "perro": "perro", "gato": "gato", "chancho": "chancho", "gallina": "gallina",
            "gallo": "gallo", "oveja": "oveja", "pato": "pato", "caballo": "caballo", "leon": "leon",
            "rana": "rana2", "elefante": "elefante"}
def run(args): return subprocess.run(args, capture_output=True, text=True)
def vol(f):
    e = run(["ffmpeg", "-hide_banner", "-i", f, "-af", "volumedetect", "-f", "null", "-"]).stderr
    return float(re.search(r"mean_volume: (-?[\d.]+)", e)[1]), float(re.search(r"max_volume: (-?[\d.]+)", e)[1])
trim = "silenceremove=start_periods=1:start_threshold=-42dB,areverse,silenceremove=start_periods=1:start_threshold=-42dB,areverse"
CRED = {"vaca": (59245, "z-moo01.wav", "Zozzy"), "perro": (163459, "LBS_FX DOG Small Alert Bark001.wav", "LittleBigSounds"),
  "gato": (110011, "cat meow", "tuberatanka"), "chancho": (442906, "Pig Oink", "qubodup"), "gallina": (607245, "Chicken", "D4XX"),
  "gallo": (435508, "Rooster Crow 1", "BenjaminNelan"), "oveja": (171151, "sheep 2.mp3", "esperar"),
  "pato": (515408, "Duck Quack - Sound Effect (HD).mp3", "Tabby+Gus."), "caballo": (269571, "horse neigh shortened.wav", "shadoWisp"),
  "leon": (467762, "lion.wav", "SGAK"), "rana": (536759, "Frog.ogg", "egomassive"), "elefante": (527845, "Elephant Trumpets Growls.flac", "D.jones")}
if CONFIG: ELEGIDOS = CONFIG["elegidos"]
MAX = CONFIG.get("max", {})
ruta = lambda src: f"{RAW}/{src}" if "." in src else f"{RAW}/{src}.mp3"
for nombre, src in ELEGIDOS.items():
    tmp = f"{RAW}/tmp_{nombre}.wav"
    if nombre == "pato":   # un solo "cuac" muy corto: se repite dos veces
        f = (f"[0:a]aformat=channel_layouts=mono,{trim},atrim=0:0.45,asplit[a][b];"
             f"[b]adelay=570[b2];[a][b2]amix=inputs=2:normalize=0")
        run(["ffmpeg", "-y", "-i", ruta(src), "-filter_complex", f, "-ar", "44100", tmp])
    else:
        run(["ffmpeg", "-y", "-i", ruta(src), "-af", f"aformat=channel_layouts=mono,{trim}", "-ar", "44100", tmp])
    dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", tmp]).stdout)
    corte = min(dur, MAX.get(nombre, 2.6))
    mean, peak = vol(tmp)
    gain = min(-17 - mean, -1.0 - peak + 6)   # mismo volumen percibido; el limitador cuida los picos
    af = (f"atrim=0:{corte},afade=t=in:d=0.02,afade=t=out:st={corte-min(0.25,corte*0.08)}:d={min(0.25,corte*0.08)},"
          f"volume={gain}dB,alimiter=limit=0.89:level=false")
    run(["ffmpeg", "-y", "-i", tmp, "-af", af, "-ac", "1", "-ar", "44100", "-codec:a", "libmp3lame", "-b:a", "80k", f"{OUT}/{nombre}.mp3"])
    m2, p2 = vol(f"{OUT}/{nombre}.mp3")
    print(f"{nombre:9} {corte:4.2f}s  antes mean {mean:6.1f} peak {peak:5.1f} | después mean {m2:6.1f} peak {p2:5.1f}")
    os.remove(tmp)
