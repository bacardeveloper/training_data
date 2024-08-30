function getGroupedTrainingLevels(data) {
  if (!data || data.length === 0 || data === undefined || data === null) {
    return "non renseigné";
  }

  if (data === "niveau_sortie") {
    return "niveau_sortie";
  }

  let dataLowerCase = data.toLowerCase();
  if (dataLowerCase.includes("bac") || dataLowerCase.includes("baccalauréat")) {
    return "4";
  } else if (dataLowerCase.includes("cap") || dataLowerCase.includes("bep")) {
    return "3";
  } else if (dataLowerCase.includes("bts") || dataLowerCase.includes("deug")) {
    return "5";
  } else if (dataLowerCase.includes("licence")) {
    return "6";
  } else if (dataLowerCase.includes("master")) {
    return "7";
  }
  return "non renseigné";
}

module.exports = getGroupedTrainingLevels;
