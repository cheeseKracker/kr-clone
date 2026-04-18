#!/bin/bash
# Convert all PNGs in the current directory to WebP

shopt -s nullglob
files=(*.png *.PNG)
shopt -u nullglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No PNG files found in the current directory."
  exit 0
fi

for f in "${files[@]}"; do
  out="${f%.*}.webp"
  echo "Converting: $f -> $out"
  cwebp -q 80 "$f" -o "$out"
done

echo "Done. Converted ${#files[@]} file(s)."
