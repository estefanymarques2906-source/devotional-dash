import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { WORD_SEARCH_WORDS } from "@/lib/quiz-data";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/jogos/cacapalavras")({
  head: () => ({ meta: [{ title: "Caça-Palavras Bíblico — Lumen" }] }),
  component: WordSearchPage,
});

const SIZE = 10;
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Dir = [number, number];
const DIRS: Dir[] = [[0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]];

interface Placement { word: string; cells: [number, number][] }

function buildGrid(seed: number): { grid: string[][]; placements: Placement[] } {
  // simple seeded random
  let s = seed || 1;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

  const grid: string[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
  const placements: Placement[] = [];
  const words = [...WORD_SEARCH_WORDS].sort(() => rand() - 0.5).slice(0, 6);

  for (const w of words) {
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const dir = DIRS[Math.floor(rand() * DIRS.length)];
      const r = Math.floor(rand() * SIZE);
      const c = Math.floor(rand() * SIZE);
      const cells: [number, number][] = [];
      let ok = true;
      for (let i = 0; i < w.word.length; i++) {
        const nr = r + dir[0] * i;
        const nc = c + dir[1] * i;
        if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) { ok = false; break; }
        const existing = grid[nr][nc];
        if (existing && existing !== w.word[i]) { ok = false; break; }
        cells.push([nr, nc]);
      }
      if (ok) {
        cells.forEach(([nr, nc], i) => { grid[nr][nc] = w.word[i]; });
        placements.push({ word: w.word, cells });
        placed = true;
      }
    }
  }

  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    if (!grid[r][c]) grid[r][c] = ALPHA[Math.floor(rand() * 26)];
  }
  return { grid, placements };
}

function WordSearchPage() {
  const [seed, setSeed] = useState(() => Date.now());
  const { grid, placements } = useMemo(() => buildGrid(seed), [seed]);
  const [found, setFound] = useState<string[]>([]);
  const [drag, setDrag] = useState<[number, number][]>([]);
  const dragging = useRef(false);

  const wordsToFind = placements.map((p) => p.word);

  function cellKey(r: number, c: number) { return `${r}-${c}`; }
  const inDrag = (r: number, c: number) => drag.some(([a, b]) => a === r && b === c);

  function startCell(r: number, c: number) {
    dragging.current = true;
    setDrag([[r, c]]);
  }
  function enterCell(r: number, c: number) {
    if (!dragging.current) return;
    setDrag((cur) => {
      if (cur.some(([a, b]) => a === r && b === c)) return cur;
      return [...cur, [r, c]];
    });
  }
  function endDrag() {
    dragging.current = false;
    if (drag.length < 2) { setDrag([]); return; }
    const word = drag.map(([r, c]) => grid[r][c]).join("");
    const reversed = [...drag].reverse().map(([r, c]) => grid[r][c]).join("");
    const hit = placements.find((p) =>
      (p.word === word || p.word === reversed) &&
      p.cells.length === drag.length &&
      (
        p.cells.every(([a, b], i) => a === drag[i][0] && b === drag[i][1]) ||
        p.cells.every(([a, b], i) => a === drag[drag.length - 1 - i][0] && b === drag[drag.length - 1 - i][1])
      )
    );
    if (hit && !found.includes(hit.word)) setFound((f) => [...f, hit.word]);
    setDrag([]);
  }

  const allFound = found.length === wordsToFind.length;

  return (
    <>
      <TopBar title="Caça-Palavras" back="/jogos" right={
        <button onClick={() => { setSeed(Date.now()); setFound([]); }} className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent" aria-label="Novo jogo">
          <RotateCcw className="h-4 w-4" />
        </button>
      } />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <div
          className="mx-auto grid touch-none select-none gap-1 rounded-2xl border border-border bg-card p-3"
          style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`, maxWidth: 420 }}
          onPointerLeave={endDrag}
          onPointerUp={endDrag}
        >
          {grid.map((row, r) =>
            row.map((ch, c) => {
              const isFound = placements.some((p) => found.includes(p.word) && p.cells.some(([a, b]) => a === r && b === c));
              const isDragging = inDrag(r, c);
              return (
                <button
                  key={cellKey(r, c)}
                  onPointerDown={(e) => { e.preventDefault(); startCell(r, c); }}
                  onPointerEnter={() => enterCell(r, c)}
                  className={`aspect-square rounded-md text-center font-display text-sm font-semibold transition-colors ${
                    isFound ? "bg-primary/30 text-primary" :
                    isDragging ? "bg-primary text-primary-foreground" :
                    "bg-background text-foreground"
                  }`}
                >{ch}</button>
              );
            })
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {placements.map((p) => {
            const ok = found.includes(p.word);
            const meta = WORD_SEARCH_WORDS.find((w) => w.word === p.word);
            return (
              <div key={p.word} className={`rounded-xl border p-3 text-xs transition-all ${ok ? "border-primary/50 bg-primary/10 text-primary line-through" : "border-border bg-card"}`}>
                <p className="font-display text-sm">{p.word}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{meta?.hint}</p>
              </div>
            );
          })}
        </div>

        {allFound && (
          <div className="mt-6 rounded-2xl bg-gradient-divine p-5 text-center text-primary-foreground shadow-gold">
            <p className="font-display text-2xl">Parabéns!</p>
            <p className="mt-1 text-sm opacity-90">Você encontrou todas as palavras.</p>
            <button onClick={() => { setSeed(Date.now()); setFound([]); }} className="mt-4 rounded-full bg-black/20 px-4 py-2 text-xs font-medium">Jogar novamente</button>
          </div>
        )}
      </main>
    </>
  );
}
