import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BOOKS } from "@/lib/bible-data";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/biblia/")({
  head: () => ({
    meta: [
      { title: "Bíblia — Lumen" },
      { name: "description", content: "Escolha um livro da Bíblia para ler." },
    ],
  }),
  component: BiblePage,
});

function BiblePage() {
  const [tab, setTab] = useState<"AT" | "NT">("AT");
  const books = BOOKS.filter((b) => b.category === tab);

  return (
    <>
      <TopBar title="Bíblia Sagrada" subtitle="Almeida Corrigida Fiel" />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <div className="mb-4 inline-flex rounded-full border border-border bg-card p-1">
          {(["AT", "NT"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "AT" ? "Antigo Testamento" : "Novo Testamento"}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 gap-2">
          {books.map((b) => (
            <li key={b.id}>
              <Link
                to="/biblia/$bookId"
                params={{ bookId: b.id }}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                    {b.short}
                  </span>
                  <span className="font-display text-base">{b.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{b.chapters} cap.</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
