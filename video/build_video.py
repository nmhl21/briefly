#!/usr/bin/env python3
"""Assemble Chimera demo video: 7 frames (3 PIL slides + 4 real dashboard
screenshots) + 7 narration tracks, xfade 0.6s. Adapted from Sentinel."""
import subprocess, os, json

D = "/home/hatch/workspace/hybridai/video"
FRAMES = [
    "slide-01-title.png",
    "shots/shot-01-idle.png",
    "shots/shot-03-short-result.png",
    "shots/shot-04-long-result.png",
    "slide-05-hybrid.png",
    "slide-06-built.png",
    "slide-07-close.png",
]
N = len(FRAMES)
PAD = 1.2
XF = 0.6

def dur(path):
    r = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries",
                        "format=duration", "-of", "json", path],
                       capture_output=True, text=True)
    return float(json.loads(r.stdout)["format"]["duration"])

NARR = [dur(f"{D}/narr/n{i}.mp3") for i in range(1, N + 1)]
durs = [n + PAD for n in NARR]
total = sum(durs) - (N - 1) * XF
print("narr durations:", [round(x, 2) for x in NARR])
print("slide durs:", [round(x, 2) for x in durs], "video len:", round(total, 2))

inputs, filters = [], []
for i in range(N):
    inputs += ["-loop", "1", "-t", str(round(durs[i], 2)), "-i",
               f"{D}/{FRAMES[i]}"]
for i in range(N):
    inputs += ["-i", f"{D}/narr/n{i + 1}.mp3"]
a0 = N

filters.append(f"[0:v]fade=t=in:st=0:d=0.5,format=yuv420p[v0]")
cur = "v0"
offset = durs[0] - XF
for k in range(1, N):
    filters.append(
        f"[{cur}][{k}:v]xfade=transition=fade:duration={XF}:offset={offset:.2f}[x{k}]")
    cur = f"x{k}"
    offset += durs[k] - XF

adelays = []
off = 0.0
for i in range(N):
    start = off + 0.3
    adelays.append(f"[{a0 + i}:a]adelay={int(start * 1000)}:all=1[a{i}]")
    off += durs[i] - XF
filters += adelays
mix = "".join(f"[a{i}]" for i in range(N))
filters.append(f"{mix}amix=inputs={N}:normalize=0,afade=t=out:st={total - 2:.2f}:d=2.0,"
               f"apad=whole_dur={total:.2f}[aout]")

out = f"{D}/briefly-demo.mp4"
cmd = (["ffmpeg", "-y"] + inputs +
       ["-filter_complex", ";".join(filters),
        "-map", f"[{cur}]", "-map", "[aout]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-b:a", "128k", "-shortest",
        "-movflags", "+faststart", out])
r = subprocess.run(cmd, capture_output=True, text=True)
print(r.stdout[-800:])
print(r.stderr[-1500:])
print("exit", r.returncode)
if r.returncode == 0:
    print("size", os.path.getsize(out))
