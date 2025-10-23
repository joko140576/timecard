function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const divisi = data.divisi || "Lainnya";
  let sheet = ss.getSheetByName(divisi);

  // Kalau sheet belum ada, buat baru dan isi header
  if (!sheet) {
    sheet = ss.insertSheet(divisi);
    sheet.appendRow(["Timestamp", "Tanggal", "Nama", "NPP", "Divisi", "Jabatan", "Uraian Tugas", "Volume", "Waktu"]);
  }

  // Simpan tiap tugas ke baris baru
  data.tasks.forEach(row => {
    sheet.appendRow([
      new Date(),
      data.tanggal,
      data.nama,
      data.npp,
      data.divisi,
      data.jabatan,
      row.uraian,
      row.volume,
      row.waktu
    ]);
  });

  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
