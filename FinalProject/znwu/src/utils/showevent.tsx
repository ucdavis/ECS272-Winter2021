import { DataEntry } from "../data";

export function showEvent(event: DataEntry): string {
  return `
    <table>
    <tr>
        <td>Date: </td>
        <td>${event.iyear}/${event.imonth || "??"}/${event.iday || "??"} </td>
    </tr>
    <tr>
        <td>Location: </td>
        <td>${[event.city, event.provstate, event.country_txt]
          .filter(Boolean)
          .join(", ")} </td>
    </tr>
    <tr>
        <td>Attacker:</td>
        <td>${event.gname} </td>
    </tr>
    <tr>
        <td>Target:</td>
        <td>${event.target1} </td>
    </tr>
    <tr>
        <td>Attack Type:</td>
        <td>${event.attacktype1_txt} </td>
    </tr>
    <tr>
        <td>Suicidal: </td>
        <td>${event.suicide ? "Suicidal" : "Non-suicidal"} </td>
    </tr>
    <tr>
        <td>Result:</td>
        <td>${event.success ? "Success" : "Failed"} </td>
    </tr>
    <tr>
        <td>Death:</td>
        <td>${event.nkill} </td>
    </tr>
    <tr>
        <td>Wounded:</td>
        <td>${event.nwound} </td>
    </tr>
    <tr>
        <td>Motive/Notes:</td>
        <td>${[event.motive, event.addnotes].filter(Boolean).join('\n')} </td>
    </tr>
    
    </table>
    `;
}
