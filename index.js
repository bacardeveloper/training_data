const { columnNamesToDelete } = require("./src/columns_name");
const { deleteColumnsAndSave } = require("./src/manipulate_excel_file");
const getRowCount = require("./src/get_row_count");
const { deletePastTraining } = require("./src/delete_past_training");
const deleteDuplicateTraining = require("./src/delete_duplicate_training");

async function main() {
  const filePath = "C:\\Users\\bacar\\Downloads\\liste_session.xlsx";

  try {
    console.log("Début des opérations sur le fichier:", filePath);

    let withoutUpdate = await getRowCount(filePath);
    console.log("Nombre de lignes avant suppression : " + withoutUpdate);

    // Suppression des colonnes spécifiées
    const pathUpdateFile = await deleteColumnsAndSave(
      filePath,
      columnNamesToDelete
    );
    console.log(
      "Colonnes supprimées et fichier sauvegardé sous:",
      pathUpdateFile
    );

    // Suppression des sessions passées
    let filePathForDuplicata = await deletePastTraining(pathUpdateFile);
    console.log("Sessions passées supprimées.");

    // Compte des lignes après suppression
    let numberOfLine = await getRowCount(pathUpdateFile);
    console.log("Nombre de lignes après suppression : " + numberOfLine);

    // Suppression des doublons
    if (filePathForDuplicata && filePathForDuplicata.length !== 0) {
      await deleteDuplicateTraining(filePathForDuplicata);
      console.log("Doublons supprimés.");
    }

    console.log("OPERATIONS TERMINÉES");
  } catch (err) {
    console.error("Une erreur s'est produite:", err);
  } finally {
    console.log("Libération des ressources et clôture des opérations.");
  }
}

main();
