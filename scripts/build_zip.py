import os, zipfile, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
out = root / "seoscribe-pro-worker-aligned.zip"
if out.exists(): out.unlink()
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
  for p in root.rglob("*"):
    if "node_modules" in p.parts or p.name.endswith(".zip"): continue
    z.write(p, p.relative_to(root))
print("Zipped:", out)
