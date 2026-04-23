import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKS_BY_ID, fetchChapter, type ChapterData } from "@/lib/bible-data";
import { useAppState } from "@/hooks/use-app-state";
import { TopBar } from "@/components/TopBar";
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Type, X } from "lucide-react";
import type { HighlightColor } from "@/lib/storage";
import { AdBanner } from "@/components/AdBanner";

export const Route = createFileRoute("/biblia/$bookId/$chapter")({
  component: ChapterPage,
  loader: ({ params }) => {
    const book = BOOKS_BY_ID[params.bookId];
    const ch = parseInt(params.chapter, 10);
    if (!book || isNaN(ch) || ch < 1 || ch > book.chapters) throw notFound();
    return { book, ch };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center">Capítulo não encontrado. <Link to="/biblia" className="text-primary">Voltar</Link></div>
  ),
});

const COLORS: { id: HighlightColor; cls: string; label: string }[] = [
  { id: "yellow", cls: "bg-[var(--highlight-yellow)]", label: "Amarelo" },
  { id: "green", cls: "bg-[var(--highlight-green)]", label: "Verde" },
  { id: "blue", cls: "bg-[var(--highlight-blue)]", label: "Azul" },
  { id: "pink", cls: "bg-[var(--highlight-pink)]", label: "Rosa" },
];

function ChapterPage() {
  const { book, ch } = Route.useLoaderData();
  const { state, markRead, toggleBookmark, setHighlight, setFontSize } = useAppState();
  const [data, setData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFontMenu, setShowFontMenu] = useState(false);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setError(null);
    setData(null);
    fetchChapter(book.id, ch)
      .then((d) => {
        if (cancel) return;
        setData(d);
        setLoading(false);
        markRead(book.id, ch);
      })
      .catch((e) => {
        if (cancel) return;
        setError(e.message);
        setLoading(false);
      });
    return () => { cancel = true; };
  }, [book.id, ch, markRead]);

  const prevCh = ch > 1 ? ch - 1 : null;
  const nextCh = ch < book.chapters ? ch + 1 : null;

  return (
    <>
      <TopBar
        title={`${book.name} ${ch}`}
        subtitle="Almeida Corrigida Fiel"
        back={`/biblia/${book.id}`}
        right={
          <button
            onClick={() => setShowFontMenu((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
            aria-label="Tamanho da fonte"
          >
            <Type className="h-4 w-4" />
          </button>
        }
      />
      {showFontMenu && (
        <div className="sticky top-[57px] z-20 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <span className="text-xs text-muted-foreground">Aa</span>
            <input
              type="range" min={14} max={26} step={1}
              value={state.fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              className="flex-1 accent-[var(--gold)]"
            />
            <span className="font-display text-lg">Aa</span>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-2xl px-5 py-6">
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-muted" style={{ width: `${70 + Math.random() * 25}%` }} />
            ))}
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error} — verifique sua conexão.
          </div>
        )}
        {data && (
          <article
            className="font-display leading-relaxed text-foreground"
            style={{ fontSize: `${state.fontSize}px`, lineHeight: 1.75 }}
          >
            {data.verses.map((v) => {
              const isBookmarked = state.bookmarks.some(
                (b) => b.bookId === book.id && b.chapter === ch && b.verse === v.verse,
              );
              const highlight = state.highlights.find(
                (h) => h.bookId === book.id && h.chapter === ch && h.verse === v.verse,
              );
              const hlClass = highlight
                ? COLORS.find((c) => c.id === highlight.color)?.cls ?? ""
                : "";
              return (
                <span
                  key={v.verse}
                  onClick={() => setSelected(v.verse === selected ? null : v.verse)}
                  className={`cursor-pointer rounded-md px-0.5 transition-colors ${hlClass} ${selected === v.verse ? "ring-1 ring-primary/60" : ""}`}
                >
                  <span className="verse-num">{v.verse}</span>
                  {v.text}{" "}
                  {isBookmarked && <BookmarkCheck className="-mt-1 inline h-3.5 w-3.5 text-primary" />}
                </span>
              );
            })}
          </article>
        )}

        {/* Chapter nav */}
        <div className="mt-10 flex items-center justify-between gap-3">
          {prevCh ? (
            <Link
              to="/biblia/$bookId/$chapter"
              params={{ bookId: book.id, chapter: String(prevCh) }}
              className="flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" /> {prevCh}
            </Link>
          ) : <span />}
          {nextCh ? (
            <Link
              to="/biblia/$bookId/$chapter"
              params={{ bookId: book.id, chapter: String(nextCh) }}
              className="ml-auto flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-gold"
            >
              {nextCh} <ChevronRight className="h-4 w-4" />
            </Link>
          ) : <span />}
        </div>
      </main>

      {/* Verse action sheet */}
      <AnimatePresence>
        {selected !== null && data && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-x-0 bottom-16 z-40 mx-auto max-w-2xl rounded-t-3xl border-t border-border bg-card p-5 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-base text-primary">{book.name} {ch}:{selected}</p>
              <button onClick={() => setSelected(null)} className="text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {data.verses.find((v) => v.verse === selected)?.text}
            </p>

            <div className="mb-4 flex items-center gap-2">
              {COLORS.map((c) => {
                const v = selected;
                const active = state.highlights.some(
                  (h) => h.bookId === book.id && h.chapter === ch && h.verse === v && h.color === c.id,
                );
                return (
                  <button
                    key={c.id}
                    onClick={() => setHighlight(book.id, ch, v, active ? null : c.id)}
                    className={`h-9 w-9 rounded-full border transition-all ${c.cls} ${active ? "scale-110 border-primary" : "border-border"}`}
                    aria-label={c.label}
                  />
                );
              })}
              <button
                onClick={() => setHighlight(book.id, ch, selected, null)}
                className="ml-1 h-9 rounded-full border border-border px-3 text-xs text-muted-foreground"
              >Limpar</button>
            </div>

            <button
              onClick={() => {
                const v = data.verses.find((x) => x.verse === selected)!;
                toggleBookmark({
                  bookId: book.id, chapter: ch, verse: selected,
                  text: v.text, bookName: book.name, createdAt: Date.now(),
                });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              <Bookmark className="h-4 w-4" /> Salvar nos favoritos
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
