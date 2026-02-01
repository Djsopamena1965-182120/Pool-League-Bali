const fs = require("fs");

// Correcte destructuring: vanaf argv[2] beginnen
const [,, team, player, handicap, action] = process.argv;

const file = "teams-data.json";
const data = JSON.parse(fs.readFileSync(file));

function save() {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`✅ teams-data.json opgeslagen (${action})`);
}

if (action === "addTeam") {
  // Voeg een nieuw team toe
  data.push({ team, players: [] });
  console.log(`Team toegevoegd: ${team}`);
}
else if (action === "deleteTeam") {
  // Verwijder een team
  const idx = data.findIndex(t => t.team === team);
  if (idx >= 0) {
    data.splice(idx, 1);
    console.log(`Team verwijderd: ${team}`);
  }
}
else if (action === "addPlayer") {
  // Voeg een speler toe aan een team
  const t = data.find(t => t.team === team);
  if (t) {
    t.players.push({ name: player, handicap: parseInt(handicap) || 0 });
    console.log(`Speler toegevoegd: ${player} (${handicap}) in team ${team}`);
  }
}
else if (action === "editPlayer") {
  // Pas handicap van een speler aan
  const t = data.find(t => t.team === team);
  if (t) {
    const p = t.players.find(p => p.name === player);
    if (p) {
      p.handicap = parseInt(handicap) || p.handicap;
      console.log(`Handicap aangepast: ${player} → ${p.handicap}`);
    }
  }
}
else if (action === "deletePlayer") {
  // Verwijder een speler uit een team
  const t = data.find(t => t.team === team);
  if (t) {
    const idx = t.players.findIndex(p => p.name === player);
    if (idx >= 0) {
      t.players.splice(idx, 1);
      console.log(`Speler verwijderd: ${player} uit team ${team}`);
    }
  }
}
else {
  console.log(`⚠️ Onbekende actie: ${action}`);
}

save();

