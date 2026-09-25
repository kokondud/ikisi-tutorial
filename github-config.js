// =============================================================================
//  KONFIGURASI GITHUB — tempat menyimpan gambar tutorial
// =============================================================================
//  Gambar tutorial yang sudah disetujui disimpan di folder /images di repo ini,
//  lalu ditampilkan lewat GitHub Pages.
//
//  TOKEN TIDAK DITULIS DI SINI. Token dimasukkan sekali di halaman admin.html
//  dan hanya tersimpan di browser komputer admin. Jangan pernah menempel
//  token ke file mana pun di repo, karena repo ini bisa dilihat publik.
//
//  Kalau nanti repo dipindah (misalnya ke akun organisasi/IT), cukup ubah
//  owner, repo, dan pagesBaseUrl di bawah.
// =============================================================================

export const GITHUB = {
  owner: 'kokondud',
  repo: 'ikisi-tutorial',
  branch: 'main',
  imageFolder: 'images',
  // alamat situs GitHub Pages (harus diakhiri garis miring)
  pagesBaseUrl: 'https://kokondud.github.io/ikisi-tutorial/'
};
