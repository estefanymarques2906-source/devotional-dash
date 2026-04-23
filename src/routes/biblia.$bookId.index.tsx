import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BOOKS_BY_ID } from "@/lib/bible-data";
import { useAppState } from "@/hooks/use-app-state";
import { TopBar } from "@/components/TopBar";
import { Check } from "lucide-react";

export const Route = createFileRoute("/biblia/$bookId/")({
  component: BookPage,
  notFoundComponent: () => (
    <div className="p-8 text-center">Livro não encontrado. <Link to="/biblia" className="text-primary">Voltar</Link></div>
  ),
  loader: ({ params }) => {
    const book = BOOKS_BY_ID[params.bookId];
    if (!book) throw notFound();
    return { book };
  },
});

function BookPage() {
  const { book } = Route.useLoaderData();
  const { state } = useAppState();

  return (
    <>
      <TopBar title={book.name} subtitle={`${book.chapters} capítulos`} back="/biblia" />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => {
            const isRead = state.readChapters.includes(`${book.id}-${c}`);
            return (
              <Link
                key={c}
                to="/biblia/$bookId/$chapter"
                params={{ bookId: book.id, chapter: String(c) }}
                className={`relative flex aspect-square items-center justify-center rounded-xl border font-display text-lg transition-all hover:scale-105 ${
                  isRead
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {c}
                {isRead && (
                  <Check className="absolute right-1 top-1 h-3 w-3 text-primary" strokeWidth={3} />
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
