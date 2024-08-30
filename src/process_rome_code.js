exports.processRomeCode = (data) => {
  if (!data || data.length === 0 || data === undefined || data === null) {
    return "non renseigné";
  }

  let codeRomeFirstLetter = a.toLowerCase().split("")[0];
  return romeCategory[codeRomeFirstLetter];
};

const romeCategory = {
  a: "Agriculture et pêche, espaces naturels et espaces verts, soins aux animaux",
  b: "Arts et façonnage d’ouvrage d’art",
  c: "Banque, assurance, immobilier",
  d: "Commerce, vente et grande distribution",
  e: "Communication, média et multimédia",
  f: "Construction, bâtiment et travaux publics",
  g: "Hôtellerie-Restauration, Tourisme, Loisirs et Animation",
  h: "Industrie",
  i: "Installation et maintenance",
  j: "Santé",
  k: "Service à la personne et à la collectivité",
  l: " Spectacle",
  m: "Support à l’entreprise",
  n: "Transport et logistique",
};
