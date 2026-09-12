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
        nama: "uniqhba",
        password_akses: "bagu2026", // Kode unik untuk membuka portal ini
        database_provider: "firebase",
        firebase: {
            url: "https://uniqhba-f2a4e-default-rtdb.asia-southeast1.firebasedatabase.app",
            key: "AIzaSyB6baepb5qABIqJljTOTbN80N_A43SxbT4"
        }
    }
];
