import { useEffect, useRef, useState } from "react";

/**
 * AdMob Banner
 *
 * IDs configurados:
 *   App ID:        ca-app-pub-7898169843659717~1871877683
 *   Banner Unit:   ca-app-pub-7898169843659717/4198658128
 *
 * Estratégia:
 * - Em build nativo (Capacitor + @capacitor-community/admob), exibe o banner
 *   nativo ancorado na parte inferior da tela.
 * - Em web (preview / PWA), renderiza um placeholder elegante com a mesma
 *   reserva de espaço para evitar layout shift e sem sobrepor texto.
 * - Carrega de forma assíncrona após o conteúdo do capítulo renderizar.
 * - Em caso de falha, oculta o banner silenciosamente.
 *
 * Para empacotar nativo:
 *   bun add @capacitor-community/admob
 *   npx cap sync
 *   // configure App ID no AndroidManifest.xml e Info.plist
 */

export const ADMOB_APP_ID = "ca-app-pub-7898169843659717~1871877683";
export const ADMOB_BANNER_ID = "ca-app-pub-7898169843659717/4198658128";

const BANNER_HEIGHT = 50; // dp (banner padrão AdMob)

// Mantém estado global para evitar recarregar excessivamente entre re-renders
let nativeBannerShown = false;

async function tryShowNativeBanner(): Promise<boolean> {
  try {
    // Import dinâmico para não quebrar o build web caso o pacote não esteja instalado
    const mod = await import(
      /* @vite-ignore */ "@capacitor-community/admob"
    ).catch(() => null);
    if (!mod) return false;

    const { AdMob, BannerAdPosition, BannerAdSize } = mod as any;

    if (!nativeBannerShown) {
      await AdMob.initialize({
        initializeForTesting: false,
      });
    }

    await AdMob.showBanner({
      adId: ADMOB_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 64, // espaço acima do BottomNav (~64px)
      isTesting: false,
    });

    nativeBannerShown = true;
    return true;
  } catch (err) {
    console.warn("[AdMob] banner indisponível:", err);
    return false;
  }
}

async function hideNativeBanner() {
  try {
    const mod = await import(
      /* @vite-ignore */ "@capacitor-community/admob"
    ).catch(() => null);
    if (!mod) return;
    const { AdMob } = mod as any;
    await AdMob.hideBanner();
    nativeBannerShown = false;
  } catch {
    /* noop */
  }
}

export function AdBanner() {
  const [failed, setFailed] = useState(false);
  const [nativeOk, setNativeOk] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    // Atrasa para garantir que o conteúdo do capítulo já renderizou
    const t = window.setTimeout(() => {
      tryShowNativeBanner().then((ok) => {
        if (!mounted.current) return;
        if (ok) setNativeOk(true);
      });
    }, 300);

    return () => {
      mounted.current = false;
      window.clearTimeout(t);
      // ao desmontar a tela de leitura, esconde o banner nativo
      hideNativeBanner();
    };
  }, []);

  if (failed) return null;

  // Quando o banner nativo está ativo, ele é sobreposto pelo SO ancorado ao fundo.
  // Mantemos um espaçador para impedir sobreposição com o último versículo.
  if (nativeOk) {
    return (
      <div
        aria-hidden="true"
        style={{ height: BANNER_HEIGHT + 16 }}
        className="w-full"
      />
    );
  }

  // Fallback web: placeholder visualmente separado, adaptado a light/dark
  return (
    <div
      role="complementary"
      aria-label="Espaço publicitário"
      className="mx-auto mt-8 w-full max-w-2xl select-none"
    >
      <div className="mx-4 border-t border-border/60 pt-3">
        <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground/70">
          Publicidade
        </p>
        <div
          onError={() => setFailed(true)}
          style={{ minHeight: BANNER_HEIGHT }}
          className="flex items-center justify-center rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-xs text-muted-foreground"
        >
          <span className="opacity-70">
            Banner AdMob será exibido aqui no aplicativo
          </span>
        </div>
      </div>
    </div>
  );
}
