import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { TopBar } from "@/components/TopBar";

interface Hit { reference: string; text: string; bookId?: string; chapter?: number; verse?: number }

export const Route = createFileRoute("/buscar")({
  head: () => ({ meta: [{ title: "Buscar — Lumen" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      // bible-api.com aceita referências; para palavras usamos uma busca simples
      // sobre uma seleção de versículos populares por enquanto.
      const POPULAR = ["joão 3:16","salmos 23","romanos 8:28","filipenses 4:13","jeremias 29:11","provérbios 3:5-6","mateus 11:28","isaías 41:10","1coríntios 13:4-7","salmos 91:1-2","gênesis 1:1","apocalipse 21:4"];
      const lower = q.toLowerCase();
      const results: Hit[] = [];
      // Direct reference attempt
      try {
        const r = await fetch(`https://bible-api.com/${encodeURIComponent(q)}?translation=almeida`);
        if (r.ok) {
          const d = await r.json();
          if (d.verses?.length) results.push({ reference: d.reference, text: d.text.trim() });
        }
      } catch {/* ignore */}
      // Keyword scan over popular passages
      const scans = await Promise.all(POPULAR.map(async (ref) => {
        try {
          const r = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=almeida`);
          if (!r.ok) return null;
          const d = await r.json();
          return d.verses
            .filter((v: { text: string }) => v.text.toLowerCase().includes(lower))
            .map((v: { book_name: string; chapter: number; verse: number; text: string }) => ({
              reference: `${v.book_name} ${v.chapter}:${v.verse}`,
              text: v.text.trim(),
            }));
        } catch { return null; }
      }));
      scans.forEach((arr) => arr && results.push(...arr));
      setHits(results.slice(0, 30));
    } finally { setLoading(false); }
  }

  return (
    <>
      <TopBar title="Buscar" subtitle="Versículos, passagens, palavras" />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <form onSubmit={run} className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Ex: "amor", "João 3:16", "Salmos 23"'
            className="w-full rounded-full border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </form>

        {loading && <p className="mt-6 text-center text-sm text-muted-foreground">Buscando…</p>}
        {!loading && searched && hits.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">Nenhum resultado. Tente outra palavra ou referência.</p>
        )}
        <ul className="mt-6 space-y-3">
          {hits.map((h, i) => (
            <li key={i} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">{h.reference}</p>
              <p className="mt-1 font-display text-base leading-relaxed">{h.text}</p>
            </li>
          ))}
        </ul>

        {!searched && (
          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <p className="font-display text-base">Sugestões</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["amor", "fé", "paz", "João 3:16", "Salmos 23", "esperança"].map((s) => (
                <button
                  key={s}
                  onClick={() => { setQ(s); }}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:border-primary"
                >{s}</button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Dica: também aceita referências como <Link to="/biblia" className="text-primary">livros</Link> diretamente.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
