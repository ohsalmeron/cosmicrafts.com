#!/usr/bin/env bash
# Puts every playable build into Astro public/.
# - DAO Unity WebGL builds (copied, ~145MB, gitignored)
# - Rush static Nuxt build (generated, committed)
# - Star-Drifter + Adventures-Bevy WASM (trunk release, see below)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DAO="/home/bizkit/Github/cosmicrafts-dao/src/frontend/public"
OUT="$ROOT/public/games"

echo "== DAO Unity builds =="
mkdir -p "$OUT/adventures-3d" "$OUT/cosmicrafts-2d" "$OUT/alpha-2021" "$OUT/beta-2022"
cp -r "$DAO/Cosmicrafts/." "$OUT/adventures-3d/" 2>/dev/null || echo "missing DAO Cosmicrafts/"
cp -r "$DAO/Cosmicrafts2D/." "$OUT/cosmicrafts-2d/" 2>/dev/null || echo "missing DAO Cosmicrafts2D/"
cp -r "$DAO/Cosmicrafts2021/." "$OUT/alpha-2021/" 2>/dev/null || echo "missing DAO Cosmicrafts2021/"
cp -r "$DAO/Cosmicrafts2022/." "$OUT/beta-2022/" 2>/dev/null || echo "missing DAO Cosmicrafts2022/"

echo "== Rush static (Nuxt generate from cosmicrafts/Rush) =="
if [ -d /tmp/opencode/Rush/.output/public ]; then
  mkdir -p "$ROOT/public/rush"
  cp -r /tmp/opencode/Rush/.output/public/. "$ROOT/public/rush/"
else
  echo "regenerate: (cd /tmp/opencode/Rush && npx nuxi generate) then rerun"
fi

echo "== Star-Drifter WASM (trunk release in the game repo) =="
if [ -d /tmp/opencode/Star-Drifter/dist ]; then
  mkdir -p "$OUT/stardrifter"
  cp -r /tmp/opencode/Star-Drifter/dist/. "$OUT/stardrifter/"
else
  echo "rebuild: (cd /tmp/opencode/Star-Drifter && trunk build --release) then rerun"
fi

echo "== Adventures-Bevy WASM (trunk release in the game repo) =="
if [ -d /home/bizkit/Github/Adventures-Bevy/dist ]; then
  mkdir -p "$OUT/adventures-bevy"
  cp -r /home/bizkit/Github/Adventures-Bevy/dist/. "$OUT/adventures-bevy/"
else
  echo "rebuild: (cd ~/Github/Adventures-Bevy && trunk build --release) then rerun"
fi

echo "done:"; du -sh "$OUT"/* "$ROOT/public/rush" 2>/dev/null
