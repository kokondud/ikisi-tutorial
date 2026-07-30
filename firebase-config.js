// =============================================================================
//  KONFIGURASI FIREBASE — EDIT DI SINI SAJA
// =============================================================================
//  1. Buka https://console.firebase.google.com -> buat project baru (gratis).
//  2. Di dashboard project: klik ikon "</>" (Add app -> Web) untuk daftarkan
//     web app baru. Kasih nama bebas, TIDAK perlu centang Firebase Hosting.
//  3. Firebase akan menampilkan blok "firebaseConfig" seperti di bawah ini.
//     Copy semua nilainya (apiKey, authDomain, dst) dan tempel menggantikan
//     nilai "GANTI_..." di bawah.
//  4. Aktifkan juga:
//       - Firestore Database (Build -> Firestore Database -> Create database)
//       - Authentication -> Sign-in method -> aktifkan "Email/Password"
//       - Authentication -> Users -> Add user (email + password kamu sendiri,
//         ini akan jadi akun admin untuk buka admin.html)
//  5. Di Firestore Database -> Rules, tempel isi file firestore.rules yang
//     sudah disediakan satu folder dengan file ini, lalu klik Publish.
// =============================================================================

export const firebaseConfig = {
  apiKey: "AIzaSyChQMtGdWaSPN9OzQum59gh_zneV1u6tq4",
  authDomain: "ikisi-tutorial.firebaseapp.com",
  projectId: "ikisi-tutorial",
  storageBucket: "ikisi-tutorial.firebasestorage.app",
  messagingSenderId: "815764586088",
  appId: "1:815764586088:web:3fe7efce364169efe645dd"
};

// Catatan: versi SDK Firebase (12.16.0) ditulis langsung di baris "import" pada
// index.html, submit.html, dan admin.html (bukan di sini) — karena aturan
// JavaScript module mengharuskan alamat import berupa teks tetap, tidak bisa
// pakai variabel. Kalau suatu saat mau update versi, cari & ganti angka
// "12.16.0" di ketiga file itu. Cek versi terbaru di:
// https://firebase.google.com/docs/web/setup
