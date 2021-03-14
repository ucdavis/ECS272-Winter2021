export function eventCountryToGeologyCountry(eventCountry: string) {
  return a[eventCountry] || eventCountry;
}

const a: { [eventCountry: string]: string | undefined } = {
  // Barbados: "",
  "Bosnia and Herzegovina": "Bosnia and Herz.",
  // "Cabo Verde": "",
  "Central African Republic": "Central African Rep.",
  // "Cote d'Ivoire": "",
  "Dominican Republic": "Dominican Rep.",
  Eswatini: "eSwatini",
  "Iran (Islamic Republic of)": "Iran",
  "Korea, South": "South Korea",
  // Maldives: "",
  // Malta: "",
  // Mauritius: "",
  "North Macedonia": "Macedonia",
  "Russian Federation": "Russia",
  // "Saint Vincent and the Grenadines": "",
  // "Sao Tome and Principe": "",
  "United Republic of Tanzania": "Tanzania",
  "Venezuela (Bolivarian Republic of)": "Venezuela",
};
