// File: config.js
// Daftar Seluruh Database Instansi (Tanpa batas jumlah)
const APP_INSTITUTIONS = [
    {
        id: "kampus_uniqhba",
        nama: "Universitas UNIQHBA",
        password_akses: "uniqhba2026", // Kode unik untuk membuka portal ini
        database_provider: "firebase",
        firebase: {
            url: "https://uniqhba-f2a4e-default-rtdb.asia-southeast1.firebasedatabase.app",
            key: "AIzaSyB6baepb5qABIqJljTOTbN80N_A43SxbT4"
        }
    },
    {
        id: "rsud_ntb",
        nama: "Klinik RSUD Provinsi N,
        password_akses: "klinikntb123", // Kode unik untuk membuka portal ini
        database_provider: "firebase",
        firebase: {
            url: "URL_FIREBASE_KLINIK_DI_SINI",
            key: "KEY_FIREBASE_KLINIK_DI_SINI"
        }
    }
    // Anda bisa menambahkan instansi lain di bawah ini di masa depan
];
