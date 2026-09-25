# Pusat Tutorial iKISI

Halaman tutorial aplikasi iKISI. Data tutorial disimpan di Firebase Firestore, gambar disimpan di folder `images/` repo ini, dan situs dihosting di GitHub Pages.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman tutorial untuk nasabah |
| `submit.html` | Form usulan tutorial (khusus tim KISI, perlu login) |
| `admin.html` | Review usulan & kelola tutorial (perlu login) |
| `image-utils.js` | Mengecilkan gambar sebelum dikirim |
| `github-store.js` | Menyimpan gambar ke repo (dipakai admin) |
| `github-config.js` | Nama akun, repo, dan alamat GitHub Pages |
| `firebase-config.js` | Konfigurasi Firebase |
| `firestore.rules` | Aturan keamanan database, **dipasang manual di Firebase Console** |

## Cara pasang

1. **Upload semua file** ke repo, menimpa file lama. **Hapus `imgbb-config.js`** dari repo karena sudah tidak dipakai.
2. **Pasang aturan keamanan:**
   - Firebase Console → Authentication → Users → salin **User UID** akun admin.
   - Buka `firestore.rules`, ganti `GANTI_DENGAN_UID_ADMIN` dengan UID tersebut.
   - Firestore Database → Rules → hapus isi lama, tempel isi `firestore.rules`, klik **Publish**.
3. **Buat token GitHub** (cara lengkap juga ada di halaman admin, bagian "Cara membuat token"):
   - GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
   - Repository access: **Only select repositories** → `ikisi-tutorial`.
   - Permissions: **Contents: Read and write**.
   - Tempel token di `admin.html`, bagian **Penyimpanan Gambar**, klik **Simpan & Tes**.
4. **Pindahkan gambar lama:** di admin, klik **Pindahkan** pada kotak "Pindahkan gambar lama ke GitHub".
5. **Tes:** kirim satu usulan bergambar lewat `submit.html`, setujui di admin, tunggu ±1 menit, cek di `index.html`.

## Akun tim KISI (untuk mengirim usulan)

Form usulan (`submit.html`) hanya bisa dipakai tim KISI yang punya akun. Halaman tutorial untuk nasabah tidak lagi punya tombol usulan. Bagikan link `https://kokondud.github.io/ikisi-tutorial/submit.html` hanya ke tim internal.

- **Menambah anggota tim:** Firebase Console → Authentication → Users → **Add user** → isi email kantor dan password awal. Kirim password lewat jalur pribadi. Anggota bisa mengganti password lewat tombol "Lupa password?" di form.
- **Anggota keluar:** hapus akunnya di Authentication → Users.
- **Wajib: matikan pendaftaran mandiri** supaya orang luar tidak bisa membuat akun sendiri: Authentication → Settings → **User actions** → hilangkan centang **Enable create (sign-up)** → Save. Kalau opsi ini tidak ada di project kamu, pakai versi daftar UID yang sudah disiapkan (dalam komentar) di fungsi `isTeam()` di `firestore.rules`.
- Anggota tim **bukan** admin. Mereka hanya bisa mengirim usulan, tidak bisa menyetujui atau mengubah tutorial. Admin tetap ditentukan oleh daftar UID di `isAdmin()`.

## Alur gambar

1. Pengusul memilih screenshot → gambar dikecilkan di HP-nya (maks lebar 1080px, WebP).
2. Saat usulan dikirim, screenshot disimpan **tertutup** di Firestore (koleksi `pending_images`). Hanya admin yang bisa melihat, publik tidak bisa.
3. Admin menyetujui → semua screenshot usulan itu disimpan ke `images/` di repo dalam satu commit, lalu data sementaranya dihapus.
4. Admin menolak → usulan dan screenshot-nya langsung dihapus. Gambar tidak pernah sempat tampil publik.

Setelah disetujui, GitHub Pages butuh ±1 menit untuk memperbarui situs. Selama itu, halaman tutorial menampilkan "Gambar sedang disiapkan" dan mencoba memuat ulang otomatis.

## Soal token GitHub

- Token **tidak pernah** ditulis di file mana pun di repo. Token hanya tersimpan di browser komputer admin.
- Token fine-grained punya masa berlaku. Kalau habis, admin akan melihat pesan "Token tidak valid". Buat token baru lalu simpan ulang.
- Kalau laptop admin hilang atau ganti orang, hapus token di GitHub (Settings → Developer settings → Fine-grained tokens → Revoke).

## Kalau repo pindah ke akun lain / IT

Ubah `owner`, `repo`, dan `pagesBaseUrl` di `github-config.js`. Gambar lama yang sudah tersimpan tetap memakai alamat lama. Untuk memindahkannya, salin folder `images/` ke repo baru, lalu ganti awalan alamatnya di data (bisa dibantu nanti).

## Link langsung ke tutorial

Buka tutorialnya, lalu tekan **Bagikan** di kanan atas. Formatnya:

```
https://kokondud.github.io/ikisi-tutorial/#/k/<id-kategori>/<id-topik>/1
```
