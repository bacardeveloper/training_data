const ExcelJS = require("exceljs");

exports.deletePastTraining = async (filePath) => {
  const workbook = new ExcelJS.Workbook();

  try {
    console.log("Lecture du fichier Excel en cours...");
    await workbook.xlsx.readFile(filePath);
    console.log("Lecture du fichier Excel terminée.");

    const worksheet = workbook.getWorksheet(1);
    const newWorkBook = new ExcelJS.Workbook();
    const newWorkSheet = newWorkBook.addWorksheet("en_cours_avenir");

    console.log("Traitement des lignes...");
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      let dateOfRow = row.values[12];
      let testDate = _verifyDate(dateOfRow);

      if (testDate) {
        newWorkSheet.addRow(row.values);
      }
    });

    const newFilePath = filePath.replace(".xlsx", "_en_cours_avenir.xlsx");
    console.log("Enregistrement du nouveau fichier...");
    await newWorkBook.xlsx.writeFile(newFilePath);
    console.log("Fichier modifié enregistré sous:", newFilePath);
    return newFilePath;
  } catch (err) {
    console.error("Erreur lors du traitement du fichier Excel:", err);
    throw err;
  } finally {
    console.log("Opérations terminées, libération des ressources.");
  }
};

function _verifyDate(date_time) {
  

  // Vérifiez si la chaîne date_time correspond à la chaîne prédéfinie
  if (date_time === "date_fin") {
    return true;
  }

  try {
    // Convertir la chaîne de caractères en un objet Date
    const currentDate = new Date(date_time);

    // Vérifiez si la date est valide
    if (isNaN(currentDate.getTime())) {
      throw new Error(`Date invalide : ${date_time}`);
    }

    const referenceDate = new Date();

    // Comparer les objets Date directement
    return currentDate >= referenceDate;
  } catch (error) {
    console.error("Erreur lors de la vérification de la date :", error.message);
    return false; // ou gérer l'erreur comme vous le souhaitez
  }
}

