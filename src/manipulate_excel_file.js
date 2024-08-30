const ExcelJS = require("exceljs");

exports.deleteColumnsAndSave = async (filePath, columnNamesToDelete) => {
  const workbook = new ExcelJS.Workbook();

  try {
    console.log("Lecture du fichier Excel en cours...");
    await workbook.xlsx.readFile(filePath);
    console.log("Lecture du fichier Excel terminée.");

    const worksheet = workbook.getWorksheet(1); // Supposons que nous travaillons sur la première feuille

    // Trouver et supprimer les colonnes
    console.log("Suppression des colonnes spécifiées...");
    const columnsToDelete = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      if (columnNamesToDelete.includes(cell.value)) {
        columnsToDelete.unshift(colNumber); // Ajouter au début pour supprimer de droite à gauche
      }
    });

    columnsToDelete.forEach((colNumber) => {
      worksheet.spliceColumns(colNumber, 1);
    });
    console.log("Colonnes supprimées.");

    // Réinitialisation des styles
    console.log("Réinitialisation des styles...");
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = {}; // Réinitialise le style de la cellule
      });
    });
    console.log("Réinitialisation des styles terminée.");

    // Enregistrer le fichier modifié
    const newFilePath = filePath.replace(".xlsx", "_modifie.xlsx");
    console.log("Enregistrement du fichier modifié...");
    await workbook.xlsx.writeFile(newFilePath);
    console.log("Fichier modifié enregistré sous:", newFilePath);

    return newFilePath;
  } catch (err) {
    console.log("Erreur lors du traitement du fichier Excel:", err);
    throw err;
  } finally {
    // Ceci garantit que les ressources sont libérées même en cas d'erreur
    console.log("Opérations terminées, libération des ressources.");
  }
};
