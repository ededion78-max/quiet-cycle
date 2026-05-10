# 📱 Si ta ndërtosh My Cycle si APK Android

## ⚠️ E rëndësishme: Lovable nuk gjeneron folder `android/`

Folderi `android/` krijohet vetëm kur ekzekuton komandat e Capacitor **në kompjuterin tënd lokal**, jo në Lovable. Lovable nuk ka Android SDK / Java të instaluar.

---

## Hapat (në kompjuterin tënd)

### 1. Instalo paraprakisht
- [Node.js 20+](https://nodejs.org)
- [Android Studio](https://developer.android.com/studio) (përfshin Android SDK)
- Java JDK 17+

### 2. Shkarko kodin
Nga Lovable: **GitHub → Connect** ose **Download codebase** (ZIP).

```bash
cd my-cycle-project
npm install
```

### 3. Përgatit web build-in
> ⚠️ Aktualisht projekti është **SSR** (Cloudflare Workers). Capacitor kërkon `dist/index.html` statik. 
> Zgjidhja më e shpejtë pa konvertim: përdor `server.url` te `capacitor.config.ts` për të ngarkuar nga `https://quiet-cycle.lovable.app`.

**Opsioni A — server.url (më i lehtë, kërkon internet):**
1. Hap `capacitor.config.ts`
2. Hiq komentet te blloku `server: { url: '...' }`
3. Kalo te hapi 4

**Opsioni B — build offline (kërkon konvertim në SPA, do bëhet në një hap të ardhshëm)**

### 4. Shto Android
```bash
npx cap add android
npx cap sync android
npx cap open android
```

### 5. Në Android Studio
- Prit indeksimin (mund të zgjasë disa minuta herën e parë)
- Klik **Run ▶** për të testuar në emulator/telefon
- Për APK: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

APK-ja del në: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## Probleme të zakonshme

| Error | Zgjidhja |
|---|---|
| `dist not found` | Vendos `server.url` te capacitor.config.ts ose kryej build statik |
| Ekran i bardhë në telefon | `allowMixedContent: true` ose kontrollo URL |
| Gradle sync failed | Përditëso Android Studio + Java JDK 17 |
| `index.html` mungon në dist | Projekti është SSR — përdor `server.url` |

---

## App ID dhe emri
- **Package**: `com.dsinteractive.mycycle`
- **App name**: My Cycle
- **Krijuar nga**: DS Interactive
