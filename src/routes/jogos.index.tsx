import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Search as SearchIcon, Trophy, Flame } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/jogos/")({
  head: () => ({ meta: [{ title: "Jogos Bíblicos — Lumen" }] }),
  component: GamesHome,
});

function GamesHome() {
  const { state } = useAppState();
  return (
    <>
      <TopBar title="Jogos Bíblicos" subtitle="Aprenda enquanto se diverte" />
      <main className="mx-auto max-w-2xl px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex items-center justify-between rounded-2xl bg-gradient-divine p-5 text-primary-foreground shadow-gold">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Sua pontuação</p>
              <p className="font-display text-3xl font-semibold">{state.quizScore}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-xs">
              <Flame className="h-3.5 w-3.5" /> {state.streak.count} dias
            </div>
          </div>

          <Link to="/jogos/quiz" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent">
            <Brain className="mb-3 h-6 w-6 text-primary" />
            <p className="font-display text-lg">Quiz Bíblico</p>
            <p className="mt-1 text-xs text-muted-foreground">Teste seu conhecimento das Escrituras</p>
          </Link>

          <Link to="/jogos/cacapalavras" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent">
            <SearchIcon className="mb-3 h-6 w-6 text-primary" />
            <p className="font-display text-lg">Caça-Palavras</p>
            <p className="mt-1 text-xs text-muted-foreground">Encontre palavras temáticas</p>
          </Link>

          <div className="col-span-2 rounded-2xl border border-border bg-card p-5">
            <Trophy className="mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-base">Sequência de leitura</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Leia ao menos um capítulo por dia para manter sua sequência. Recompensas a cada 7, 30 e 100 dias.
            </p>
            <div className="mt-4 flex gap-2">
              {[7, 30, 100].map((m) => {
                const ok = state.streak.count >= m;
                return (
                  <div key={m} className={`flex-1 rounded-xl border p-3 text-center ${ok ? "border-primary bg-primary/10" : "border-border opacity-60"}`}>
                    <p className="font-display text-lg">{m}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">dias</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
