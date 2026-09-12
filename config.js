// File: config.js
// Daftar Seluruh Database Instansi (Tanpa batas jumlah)
window.APP_INSTITUTIONS = [
    {
        id: "kampus_uniqhba",
        nama: "Universitas UNIQHBA",
        password_akses: "uniqhba2026", // Kode unik untuk membuka portal ini
        database_provider: "supabase",
        supabase: {
            url: "URL_SUPABASE_UNIQHBA_DI_SINI",
            key: "KEY_SUPABASE_UNIQHBA_DI_SINI"
        }
    },
    {
        id: "rsud_ntb",
        nama: "Klinik RSUD Provinsi NTB",
        password_akses: "klinikntb123", // Kode unik untuk membuka portal ini
        database_provider: "firebase",
        firebase: {
            url: "URL_FIREBASE_KLINIK_DI_SINI",
            key: "KEY_FIREBASE_KLINIK_DI_SINI"
        }
    }
];
