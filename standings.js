// standings.js v12.13 (code 888) - compleet werkend
// Leest en schrijft naar teams.json en matches.json

// ====== DATA LADEN ======
async function loadTeams() {
  const response = await fetch('/teams.json');
  return await response.json();
}

async function loadMatches() {
  const response = await fetch('/matches.json');
  return await response.json();
}

// ====== DATA OPSLAAN ======
async function saveTeam(teamData) {
  await fetch('/teams.json', {
    method: 'POST', // of PUT afhankelijk van je server setup
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teamData)
  });
  await renderStandings();
}

async function saveMatch(matchData) {
  await fetch('/matches.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(matchData)
  });
  await renderStandings();
}

// ====== RENDER FUNCTIE ======
async function renderStandings() {
  const teams = await loadTeams();
  const matches = await loadMatches();

  // render teams
  const teamTable = document.getElementById('team-table');
  teamTable.innerHTML = '';
  teams.forEach(team => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${team.name}</td><td>${team.captain}</td>`;
    teamTable.appendChild(row);
  });

  // render matches
  const matchTable = document.getElementById('match-table');
  matchTable.innerHTML = '';
  matches.forEach(match => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${match.date}</td><td>${match.teamA}</td><td>${match.teamB}</td><td>${match.score}</td>`;
    matchTable.appendChild(row);
  });

  // bereken standings
  computeStandings(teams, matches);
}

// ====== STANDINGS BEREKENEN ======
function computeStandings(teams, matches) {
  const standingsTable = document.getElementById('standings-table');
  standingsTable.innerHTML = '';

  const stats = {};
  teams.forEach(team => {
    stats[team.name] = { wins: 0, losses: 0, points: 0 };
  });

  matches.forEach(match => {
    if (match.scoreA > match.scoreB) {
      stats[match.teamA].wins++;
      stats[match.teamB].losses++;
      stats[match.teamA].points += 3;
    } else if (match.scoreB > match.scoreA) {
      stats[match.teamB].wins++;
      stats[match.teamA].losses++;
      stats[match.teamB].points += 3;
    } else {
      stats[match.teamA].points++;
      stats[match.teamB].points++;
    }
  });

  Object.keys(stats).forEach(team => {
    const row = document.createElement('tr');
    const s = stats[team];
    row.innerHTML = `<td>${team}</td><td>${s.wins}</td><td>${s.losses}</td><td>${s.points}</td>`;
    standingsTable.appendChild(row);
  });
}

// ====== INIT ======
document.addEventListener('DOMContentLoaded', () => {
  renderStandings();

  // voorbeeld: form submit voor nieuwe match
  document.getElementById('match-form').addEventListener('submit', async e => {
    e.preventDefault();
    const matchData = {
      date: e.target.date.value,
      teamA: e.target.teamA.value,
      teamB: e.target.teamB.value,
      scoreA: parseInt(e.target.scoreA.value),
      scoreB: parseInt(e.target.scoreB.value)
    };
    await saveMatch(matchData);
    e.target.reset();
  });

  // voorbeeld: form submit voor nieuw team
  document.getElementById('team-form').addEventListener('submit', async e => {
    e.preventDefault();
    const teamData = {
      name: e.target.name.value,
      captain: e.target.captain.value
    };
    await saveTeam(teamData);
    e.target.reset();
  });
});
