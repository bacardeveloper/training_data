const gps_localisation = require("./data/gps_localisation");

function updateTrainingLocation(location) {

  if (location.length === 0 || location === "") {
    return { lat: -12.0, lon: 45.0 };
  }

  try {
    let locationLower = location.toLowerCase();
    console.log("Nom de la commune", locationLower);
    console.log(
      "L'information sur la localisation",
      gps_localisation[locationLower]
    );
    return gps_localisation[locationLower];
  } catch (err) {
    console.log(err);
    return { lat: -12.0, lon: 45.0 };
  }
}

module.exports = updateTrainingLocation;
