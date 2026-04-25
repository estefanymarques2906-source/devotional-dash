import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.lumen.bible",
  appName: "Lumen — Bíblia Devocional",
  webDir: "dist/client",
  server: {
    androidScheme: "https",
  },
  plugins: {
    AdMob: {
      // App ID AdMob (Android)
      applicationId: "ca-app-pub-7898169843659717~1871877683",
    },
  },
};

export default config;
