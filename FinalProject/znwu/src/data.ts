import * as d3 from "d3";
//@ts-ignore
import datapath from "./datasets/globalterrorismdb_0718dist.csv";
import { eventCountryToGeologyCountry } from "./utils/country_code_translator";

function processData() {
  return d3.csv(datapath).then((csv) => {
    const _data = (csv as unknown) as DataEntry[];
    for (var entry of _data) {
      entry.date = new Date(
        entry.iyear,
        entry.imonth === 0 ? 0 : entry.imonth - 1,
        entry.iday === 0 ? 1 : entry.iday
      );
      entry.geoCountry = eventCountryToGeologyCountry(
        (entry as any).country_txt
      );
      entry.nkill = parseInt(entry.nkill as any) || 0;
      entry.nwound = parseInt(entry.nwound as any) || 0;
    }
    return _data;
  });
}

export const data = processData();

export const attackTypeCode: { [key: string]: string } = {
  "1": "Assassination",
  "2": "Armed Assault",
  "3": "Bombing/Explosion",
  "4": "Hijacking",
  "5": "Barricade Incident",
  "6": "Kidnapping",
  "7": "Facility/Infrastructure Attack",
  "8": "Unarmed Assault",
  "9": "Unknown",
};

export interface DataEntry {
  eventid: number;
  iyear: number;
  imonth: number;
  iday: number;
  date: Date;
  country: number;
  country_txt: string;
  geoCountry: string;
  region: number;
  region_txt: string;
  provstate: string;
  city: string;
  latitude: number;
  longitude: number;
  specificity: number; //5 means coordinate unavailable
  vicinity: 0 | 1;
  // location
  summary: string;
  crit1: 0 | 1; // POLITICAL, ECONOMIC, RELIGIOUS, OR SOCIAL GOAL
  crit2: 0 | 1; // INTENTION TO COERCE, INTIMIDATE OR PUBLICIZE TO LARGER AUDIENCE(S)
  crit3: 0 | 1; //  OUTSIDE INTERNATIONAL HUMANITARIAN LAW
  doubtterr: 0 | 1;
  // alternative
  // alternative_txt
  // multiple
  success: 0 | 1;
  suicide: 0 | 1;
  attacktype1: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  attacktype1_txt: string;
  // attacktype2
  // attacktype2_txt
  // attacktype3
  // attacktype3_txt
  targtype1:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22;
  targtype1_txt: string;
  // targsubtype1
  targsubtype1_txt: string;
  corp1: string;
  target1: string;
  natlty1: number;
  natlty1_txt: string;
  // targtype2
  // targtype2_txt
  // targsubtype2
  // targsubtype2_txt
  // corp2
  // target2
  // natlty2
  // natlty2_txt
  // targtype3
  // targtype3_txt
  // targsubtype3
  // targsubtype3_txt
  // corp3
  // target3
  // natlty3
  // natlty3_txt
  gname: string;
  gsubname: string;
  gname2: string;
  gsubname2: string;
  gname3: string;
  gsubname3: string;
  motive: string;
  guncertain1: 0 | 1;
  guncertain2: 0 | 1;
  guncertain3: 0 | 1;
  // individual
  // nperps
  // nperpcap
  // claimed
  // claimmode
  // claimmode_txt
  // claim2
  // claimmode2
  // claimmode2_txt
  // claim3
  // claimmode3
  // claimmode3_txt
  // compclaim
  // weaptype1
  // weaptype1_txt
  // weapsubtype1
  // weapsubtype1_txt
  // weaptype2
  // weaptype2_txt
  // weapsubtype2
  // weapsubtype2_txt
  // weaptype3
  // weaptype3_txt
  // weapsubtype3
  // weapsubtype3_txt
  // weaptype4
  // weaptype4_txt
  // weapsubtype4
  // weapsubtype4_txt
  // weapdetail
  nkill: number;
  //   nkillus: number;
  //   nkillter: number;
  nwound: number;
  // nwoundus
  // nwoundte
  // property
  // propextent
  propextent_txt: string;
  // propvalue
  // propcomment
  // ishostkid
  // nhostkid
  // nhostkidus
  // nhours
  // ndays
  // divert
  // kidhijcountry
  // ransom
  // ransomamt
  // ransomamtus
  // ransompaid
  // ransompaidus
  // ransomnote
  // hostkidoutcome
  // hostkidoutcome_txt
  // nreleased
  addnotes: string;
  // scite1
  // scite2
  // scite3
  // dbsource
  // INT_LOG
  // INT_IDEO
  // INT_MISC
  // INT_ANY
  // related
}

export const attackType = {
  1: "Assassination",
  2: "Armed Assult",
  3: "Bombing/Explosion",
  4: "Hijacking",
  5: "Hostage Taking (Barricade Incident)",
  6: "Hostage Taking (Kidnapping)",
  7: "Facility/Infrastructure Attack",
  8: "Unarmed Assault",
  9: "Unknown",
};

export const targetType = {
  1: "Business",
  2: "Government (General)",
  3: "Police",
  4: "Military",
  5: "Abortion Related",
  6: "Airports & Aircraft",
  7: "Government (Diplomatic)",
  8: "Educational Institution",
  9: "FOOD OR WATER SUPPLY",
  10: "Journalists & Media",
  11: "Maritime",
  12: "NGO",
  13: "Other",
  14: "Private Citizens & Property",
  15: "Religious Figures/Institutions",
  16: "Telecommunication",
  17: "Terrorists/Non-State Militias",
  18: "Tourists",
  19: "Transportation (Other Than Aviation)",
  20: "Unknown",
  21: "Utilities",
  22: "Violent Political Parties",
};
