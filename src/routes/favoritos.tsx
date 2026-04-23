import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Trash2 } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — Lumen" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { state, toggleBookmark } = useAppState();

  return (
    <>
      <TopBar title="Favoritos" subtitle={`${state.bookmarks.length} versículos salvos`} />
      <main className="mx-auto max-w-2xl px-4 py-4">
        {state.bookmarks.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center">
            <Bookmark className="mx-auto mb-4 h-10 w-10 text-muted-foreground/60" />
            <p className="font-display text-lg">Nenhum favorito ainda</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Toque em um versículo durante a leitura para salvar aqui.
            </p>
            <Link to="/biblia" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
              Abrir a Bíblia
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {state.bookmarks.map((b) => (
              <li key={`${b.bookId}-${b.chapter}-${b.verse}`} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    to="/biblia/$bookId/$chapter"
                    params={{ bookId: b.bookId, chapter: String(b.chapter) }}
                    className="min-w-0 flex-1"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">
                      {b.bookName} {b.chapter}:{b.verse}
                    </p>
                    <p className="mt-1 font-display text-base leading-relaxed">{b.text}</p>
                  </Link>
                  <button
                    onClick={() => toggleBookmark(b)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remover"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
