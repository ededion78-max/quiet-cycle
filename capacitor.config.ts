import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor configuration for "My Cycle" — Period Tracker
 * Created by DS Interactive
 *
 * NOTE: Ky projekt aktualisht përdor TanStack Start me SSR (Cloudflare Workers).
 * Capacitor kërkon një build STATIK (folder me index.html). Para se të ndërtosh
 * APK-në, duhet ose:
 *   (a) ta konvertosh projektin në SPA (Vite + React-only), ose
 *   (b) të shërbesh app-in nga URL-ja e publikuar duke vendosur `server.url`
 *       më poshtë (komento atë rresht për ta përdorur).
 *
 * Komandat lokale (NË KOMPJUTERIN TËND, jo në Lovable):
 *   npm install
 *   npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
 *   npm run build              # prodhon dist/ (kur të jetë SPA)
 *   npx cap add android
 *   npx cap sync android
 *   npx cap open android       # hap Android Studio
 */
const config: CapacitorConfig = {
  appId: 'com.dsinteractive.mycycle',
  appName: 'My Cycle',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
  },
  ios: {
    contentInset: 'always',
  },
  // Opsion (b): ngarkon app-in nga URL e publikuar (më e shpejtë për testim).
  // Hiqe komentin për ta aktivizuar:
  // server: {
  //   url: 'https://quiet-cycle.lovable.app',
  //   cleartext: false,
  // },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#fdf2f8',
      showSpinner: false,
    },
  },
};

export default config;
