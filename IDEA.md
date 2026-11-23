# IDEA — Briefly: messy notes in, structured brief out

## App
**Briefly** — web app (Chrome, Web platform) yang mengubah catatan mentah
(rapat, kuliah, ide acak, chat log) menjadi **structured brief**: judul,
3–5 poin ringkasan, action items (tugas + pemilik + tenggat), dan tanggal
penting — sebagai JSON terstruktur yang sama persis di kedua jalur inferensi.

## Kenapa ide ini menang (mapping ke kriteria juri)
- **Technological Implementation**: hybrid inference dipakai secara bermakna,
  bukan tempelan. Routing berdasarkan panjang catatan: catatan pendek
  (≤ ~600 kata) → on-device Gemini Nano (privat, instan, gratis, bisa
  offline); catatan panjang → cloud Gemini (konteks lebih besar). Mode bisa
  dipilih manual: Auto / On-device only / Cloud only (tiga mode SDK:
  `PREFER_ON_DEVICE`, `ONLY_ON_DEVICE`, `PREFER_IN_CLOUD`). Structured
  output (JSON schema) dipakai di KEDUA jalur — skema yang sama dikirim
  sebagai `onDeviceParams.promptOptions.responseConstraint` dan
  `inCloudParams.generationConfig.responseSchema`. Badge hasil menunjukkan
  jalur yang benar-benar jalan dari `response.inferenceSource`
  (`on_device` / `in_cloud`) + latensi + jumlah kata. Ini persis yang
  diminta Devpost: Firebase AI Logic "imported and actually called at
  runtime".
- **Design**: produk utuh, bukan PoC: textarea + contoh catatan, progress
  download model on-device, hasil brief yang rapi + tampilan JSON mentah,
  riwayat tersimpan di localStorage, salin/export Markdown.
- **Potential Impact**: audiens nyata — mahasiswa, pekerja, jurnalis yang
  mencatat cepat di HP/laptop. Catatan pribadi TIDAK perlu naik ke cloud
  kalau muat di on-device: privasi + gratis + offline adalah nilai jual
  yang konkret dan mudah dijelaskan juri.
- **Quality of Idea**: routing "pendek = privat di device, panjang = kuat
  di cloud" adalah penggunaan hybrid yang non-obvious dan menunjukkan
  pemahaman trade-off kedua jalur (konteks Nano ~9.216 token vs cloud).

## Yang TIDAK dibangun
- Tanpa login/akun, tanpa backend, tanpa database, tanpa data sensitif.
  Riwayat hanya di localStorage browser user.
- Tanpa image generation (butuh Quota Sprint — tidak perlu untuk ide ini).
- Tanpa biaya: Firebase Spark plan (free tier) cukup untuk text inference.

## Stack
- Static web app, Vite + `firebase@13.4.0` (SDK terverifikasi di VM:
  `getAI`, `GoogleAIBackend`, `getGenerativeModel`, `InferenceMode`,
  `initializeDeviceModel`, `generateContent`, `response.inferenceSource`
  semua ada di typings `@firebase/ai` 3.x).
- App Check: debug provider untuk local dev (debug token diterima di
  submission, sesuai aturan Devpost).
- Config Firebase lewat `src/firebase-config.js` (placeholder, TIDAK
  commit config asli) atau env `VITE_FIREBASE_*` saat build.
- **Demo mode** (`?demo=1`, jelas berlabel "DEMO — simulated"): mensimulasikan
  respons agar alur UI bisa diuji end-to-end di headless Chromium tanpa
  Firebase project. Demo mode BUKAN jalur default; jalur nyata dipakai
  begitu config Firebase ada. Dokumentasikan jujur di README.

## Verifikasi yang harus lolos
1. `npm run build` sukses; `dist/` bisa diserve statis.
2. Headless Chromium (Playwright): halaman load tanpa page error;
   deteksi on-device (Chrome headless tanpa Nano) menampilkan status
   "on-device unavailable" yang benar; demo mode menghasilkan brief
   terstruktur + badge jalur; tanpa config & tanpa demo mode menampilkan
   panduan setup Firebase, tanpa crash.
3. SDK path nyata terverifikasi: `typeof model.initializeDeviceModel ===
   'function'`, `getGenerativeModel` terpanggil; generateContent dengan
   config placeholder gagal bersih dan ditangani UI (bukan crash).

## Repo
`github.com/nmhl21/briefly` (publik, MIT).
