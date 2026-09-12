// ═══════════════════════════════════════════════════════════
// SERVICE WORKER - Sistem Monitoring Universal (PWA)
// Fungsi: membuat aplikasi bisa di-install di HP & dibuka offline.
// CATATAN: Tidak mengubah logika aplikasi di index.html.
// Naikkan CACHE_VERSION setiap kali Anda mengubah file aplikasi,
// agar pengguna otomatis mendapat versi terbaru.
// ═══════════════════════════════════════════════════════════

const CACHE_VERSION = 'sms-pwa-v1';

// File inti aplikasi yang disimpan permanen di HP pengguna
const APP_SHELL = [
    './',
    './index.html',
    './config.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './icon-180.png',
    './favicon-16.png',
    './favicon-32.png'
];

// Domain database & API yang TIDAK BOLEH di-cache (selalu ambil data terbaru)
const DOMAIN_API = [
    'supabase.co',
    'supabase.in',
    'firebaseio.com',
    'firebasedatabase.app',
    'googleapis.com',
    'firebase.google.com',
    'firestore.googleapis.com'
];

// ── INSTALL: simpan file inti ke cache ──
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_VERSION).then(async (cache) => {
            // Simpan satu per satu: jika ada ikon yang belum di-upload, install tidak gagal
            await Promise.allSettled(APP_SHELL.map((file) => cache.add(file)));
        })
    );
});

// ── ACTIVATE: bersihkan cache versi lama ──
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((daftarCache) =>
            Promise.all(
                daftarCache
                    .filter((nama) => nama !== CACHE_VERSION)
                    .map((nama) => caches.delete(nama))
            )
        ).then(() => self.clients.claim())
    );
});

// ── FETCH: aturan pengambilan file/data ──
self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return; // Jangan sentuh POST/PUT/dll (sinkronisasi database)

    const url = new URL(req.url);
    if (!url.protocol.startsWith('http')) return;

    // 1. Panggilan database (Supabase/Firebase) → SELALU langsung ke internet, tanpa cache
    if (DOMAIN_API.some((domain) => url.hostname.includes(domain))) {
        return; // biarkan browser menangani normal
    }

    // 2. Navigasi halaman (buka aplikasi) → internet dulu, kalau offline pakai cache
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const salinan = res.clone();
                    caches.open(CACHE_VERSION).then((cache) => cache.put('./index.html', salinan));
                    return res;
                })
                .catch(() => caches.match('./index.html').then((res) => res || caches.match('./')))
        );
        return;
    }

    // 3. File aplikasi sendiri (satu domain) → cache dulu, sambil diperbarui diam-diam
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(req).then((dariCache) => {
                const ambilBaru = fetch(req)
                    .then((res) => {
                        if (res && res.status === 200) {
                            const salinan = res.clone();
                            caches.open(CACHE_VERSION).then((cache) => cache.put(req, salinan));
                        }
                        return res;
                    })
                    .catch(() => dariCache);
                return dariCache || ambilBaru;
            })
        );
        return;
    }

    // 4. Aset CDN pihak ketiga (Font Awesome, gambar, dll) → cache dulu, fallback internet
    event.respondWith(
        caches.match(req).then((dariCache) => {
            if (dariCache) return dariCache;
            return fetch(req)
                .then((res) => {
                    if (res && (res.status === 200 || res.type === 'opaque')) {
                        const salinan = res.clone();
                        caches.open(CACHE_VERSION).then((cache) => cache.put(req, salinan));
                    }
                    return res;
                })
                .catch(() => dariCache);
        })
    );
});
