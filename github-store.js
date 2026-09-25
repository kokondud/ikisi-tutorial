// =============================================================================
//  SIMPAN GAMBAR KE REPO GITHUB (dipakai admin.html saja)
// =============================================================================
//  Semua gambar dalam satu aksi (misalnya 1 usulan berisi 5 screenshot)
//  dimasukkan dalam SATU commit, jadi GitHub Pages cukup memperbarui situs
//  sekali. Gambar biasanya bisa diakses publik ±1 menit setelah commit.
//
//  Token disimpan di localStorage browser admin, bukan di kode.
// =============================================================================

import { GITHUB } from './github-config.js';

const TOKEN_KEY = 'ikisi_github_token';
const API = 'https://api.github.com';

export function getToken(){ try{ return localStorage.getItem(TOKEN_KEY) || ''; }catch(_){ return ''; } }
export function setToken(t){ localStorage.setItem(TOKEN_KEY, t.trim()); }
export function clearToken(){ localStorage.removeItem(TOKEN_KEY); }
export function hasToken(){ return !!getToken(); }

/** true kalau URL ini sudah tersimpan di repo GitHub kita */
export function isGithubImage(url){
  return typeof url === 'string' && url.startsWith(GITHUB.pagesBaseUrl + GITHUB.imageFolder + '/');
}

async function gh(path, options = {}){
  const token = getToken();
  if(!token) throw new Error('Token GitHub belum diisi di bagian Pengaturan Penyimpanan Gambar.');
  const res = await fetch(API + path, {
    ...options,
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  if(!res.ok){
    let msg = '';
    try{ msg = (await res.json()).message || ''; }catch(_){}
    if(res.status === 401) throw new Error('Token GitHub tidak valid atau sudah kedaluwarsa. Buat token baru lalu simpan ulang.');
    if(res.status === 403 || res.status === 404) throw new Error('Token GitHub tidak punya izin menulis ke repo ' + GITHUB.owner + '/' + GITHUB.repo + '. Cek pengaturan token (Contents: Read and write).');
    throw new Error('GitHub menolak permintaan (' + res.status + ') ' + msg);
  }
  return res.status === 204 ? null : res.json();
}

/** Cek token & izin tulis. Mengembalikan pesan status. */
export async function testConnection(){
  const repo = await gh(`/repos/${GITHUB.owner}/${GITHUB.repo}`);
  if(!repo.permissions || !repo.permissions.push){
    throw new Error('Token bisa membaca repo, tapi belum punya izin menulis (Contents: Read and write).');
  }
  return `Terhubung ke ${repo.full_name}.`;
}

function randomName(ext){
  const d = new Date();
  const ym = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  return `${GITHUB.imageFolder}/${ym}/${id}.${ext}`;
}

/**
 * Commit beberapa gambar sekaligus.
 * files: [{ base64, ext }]  ->  mengembalikan array URL GitHub Pages (urutan sama)
 */
export async function commitImages(files, message = 'Tambah gambar tutorial'){
  if(!files.length) return [];
  const base = `/repos/${GITHUB.owner}/${GITHUB.repo}`;

  const ref = await gh(`${base}/git/ref/heads/${GITHUB.branch}`);
  const parentSha = ref.object.sha;
  const parent = await gh(`${base}/git/commits/${parentSha}`);

  const entries = [];
  const urls = [];
  for(const f of files){
    const blob = await gh(`${base}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: f.base64, encoding: 'base64' })
    });
    const path = randomName(f.ext || 'webp');
    entries.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
    urls.push(GITHUB.pagesBaseUrl + path);
  }

  const tree = await gh(`${base}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: parent.tree.sha, tree: entries })
  });
  const commit = await gh(`${base}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: tree.sha, parents: [parentSha] })
  });
  await gh(`${base}/git/refs/heads/${GITHUB.branch}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha })
  });
  return urls;
}
