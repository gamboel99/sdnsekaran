// Simpan data PPDB & Pengaduan ke localStorage
function simpanForm(formId, storageKey) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {};
    new FormData(form).forEach((v, k) => data[k] = v);
    let records = JSON.parse(localStorage.getItem(storageKey)) || [];
    records.push(data);
    localStorage.setItem(storageKey, JSON.stringify(records));
    alert("Data berhasil disimpan!");
    form.reset();
  });
}