const ExcelJS = require("exceljs");

async function getRowCount(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Supposons que nous travaillons sur la première feuille
    return worksheet.rowCount;
  } catch (err) {
    return err;
  }
}

module.exports = getRowCount;