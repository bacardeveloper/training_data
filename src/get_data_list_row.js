const ExcelJS = require("exceljs");

async function getListOfData(filePath, sheetName) {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filePath);
  const worksheet = workBook.getWorksheet(sheetName);

  if (!worksheet) {
    console.error("La fueille n'existe pas");
    return;
  }

  let rows = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    rows.push(row.values);
  });
  return rows;
}

module.exports = getListOfData;