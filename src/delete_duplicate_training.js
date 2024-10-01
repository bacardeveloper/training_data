const ExcelJS = require("exceljs");
const getGroupedTrainingLevels = require("./groupedTrainingLevels");
const { processRomeCode } = require("./process_rome_code");
const updateTrainingLocation = require("./updateTrainingLocation");

const deleteDuplicateTraining = async (filePath) => {
  let dataBrut = await _retrieve_data_lines(filePath);
  let withoutDuplicate = [];
  const seen = new Set();

  console.log(
    "Nombre de lignes avant suppression des doublons :",
    dataBrut.length
  );

  for (let i = 0; i < dataBrut.length; i++) {
    let token =
      dataBrut[i][3] +
      "-" +
      dataBrut[i][6] +
      "-" +
      dataBrut[i][11] +
      "-" +
      dataBrut[i][12];

    // Si le token n'a pas encore été rencontré, on l'ajoute au Set et à withoutDuplicate
    if (!seen.has(token)) {
      seen.add(token);
      if (dataBrut[i][10] !== undefined && dataBrut[i][10] !== null) {
        console.log(dataBrut[i][10].toString().toLowerCase());
      }
      let groupeTraining = getGroupedTrainingLevels(dataBrut[i][10]);
      let groupeDomaine = processRomeCode(dataBrut[i][25]);
      let cityName = dataBrut[i][18];
      let getLocalisation = updateTrainingLocation(cityName);
      dataBrut[i][10] = groupeTraining;
      dataBrut[i][25] = groupeDomaine;
      dataBrut[i][19] = getLocalisation["lon"];
      dataBrut[i][20] = getLocalisation["lat"];

      withoutDuplicate.push(dataBrut[i]);
    }
  }

  console.log(
    "Nombre de lignes après suppression des doublons :",
    withoutDuplicate.length
  );
  //console.log(withoutDuplicate);
  // return withoutDuplicate;
  // ******
  const workbook = new ExcelJS.Workbook();

  // Charger un classeur existant ou créer une nouvelle feuille
  try {
    await workbook.xlsx.readFile(filePath);
  } catch (err) {
    console.log("Fichier non trouvé, création d'un nouveau fichier.");
  }

  let worksheet = workbook.getWorksheet("sans_doublons");
  if (!worksheet) {
    worksheet = workbook.addWorksheet("sans_doublons");
  }

  // Écrire les données dans la feuille
  withoutDuplicate.forEach((row, index) => {
    worksheet.addRow(row);
  });

  // Enregistrer le fichier
  await workbook.xlsx.writeFile(filePath);
  console.log(`Données enregistrées avec succès dans ${filePath}`);
};

async function _retrieve_data_lines(filePath) {
  const workBook = new ExcelJS.Workbook();

  try {
    console.log("Lecture du fichier Excel en cours...");
    await workBook.xlsx.readFile(filePath);
    console.log("Lecture du fichier Excel terminée.");

    const worksheet = workBook.getWorksheet(1);

    if (!worksheet) {
      console.error("La feuille n'existe pas.");
      return;
    }

    console.log("Traitement des lignes...");
    const rows = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      // console.log(`Ligne ${rowNumber}: ${row.values}`);
      let dataToTest = row.values[1];
      let testValuesOfRow = testEmptyData(dataToTest.toString());
      //console.log(row.values);
      if (testValuesOfRow) {
        //console.log(row.values[1].length > 3);
        rows.push(row.values);
      }
    });
    console.log("Traitement des lignes terminé.");
    return rows;
  } catch (err) {
    console.error("Erreur lors du traitement du fichier Excel:", err);
    throw err; // Re-jette l'erreur pour permettre une gestion ultérieure
  } finally {
    console.log("Opérations terminées, libération des ressources.");
  }
}

function testEmptyData(dataTest) {
  let testLength = dataTest.length > 3;
  return testLength;
}

module.exports = deleteDuplicateTraining;
