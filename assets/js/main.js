
// Basic helpers
function qs(sel){return document.querySelector(sel)}
function qsa(sel){return document.querySelectorAll(sel)}

// Load profile
async function loadProfile(){
  try{
    const res = await fetch('data/profil.json'); const p = await res.json();
    document.querySelectorAll('.school-name').forEach(e=> e.textContent = p.nama_sekolah);
    document.querySelectorAll('.school-address').forEach(e=> e.textContent = p.alamat);
    document.querySelectorAll('.school-email').forEach(e=> e.textContent = p.email);
    document.querySelectorAll('.school-phone').forEach(e=> e.textContent = p.telepon);
    document.querySelectorAll('.kepsek').forEach(e=> e.textContent = p.kepala_sekolah);
    const misi = qs('#misiList'); if(misi){ p.misi.forEach(m=>{ const li=document.createElement('li'); li.textContent=m; misi.appendChild(li)}) }
  }catch(e){ console.warn(e) }
}

// LocalStorage form save utility
function setupFormSave(formId, storageKey, successMsg='Data tersimpan di perangkat'){
  const form = qs('#'+formId); if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = {}; new FormData(form).forEach((v,k)=> data[k]=v);
    const arr = JSON.parse(localStorage.getItem(storageKey)||'[]');
    data._time = new Date().toISOString();
    arr.unshift(data); localStorage.setItem(storageKey, JSON.stringify(arr));
    alert(successMsg); form.reset();
    if(storageKey==='ppdb') renderPPDBList();
    if(storageKey==='pengaduan') renderPengaduanList();
  });
}

// Render ppdb list (for admin view)
function renderPPDBList(){
  const wrap = qs('#ppdbList'); if(!wrap) return;
  const arr = JSON.parse(localStorage.getItem('ppdb')||'[]');
  wrap.innerHTML = ''; arr.forEach((it,idx)=>{
    const div = document.createElement('div'); div.className='card'; div.style.marginBottom='8px';
    div.innerHTML = `<strong>${it.nama||'--'}</strong><div class="small">${it._time}</div><div>${it.alamat||''}</div>`;
    wrap.appendChild(div);
  });
}

// Pengaduan list
function renderPengaduanList(){
  const wrap = qs('#pengaduanList'); if(!wrap) return;
  const arr = JSON.parse(localStorage.getItem('pengaduan')||'[]');
  wrap.innerHTML = ''; arr.forEach(it=>{
    const d = document.createElement('div'); d.className='card'; d.style.marginBottom='8px';
    d.innerHTML = `<strong>${it.judul}</strong><div class="small">${it._time}</div><p>${it.isi}</p>`;
    wrap.appendChild(d);
  });
}

// Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', ()=>{
  loadProfile();
  setupFormSave('ppdbForm','ppdb','Pendaftaran berhasil tersimpan');
  setupFormSave('pengaduanForm','pengaduan','Pengaduan tersimpan');
  renderPPDBList();
  renderPengaduanList();
});
