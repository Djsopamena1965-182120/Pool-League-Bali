// standings.js v1.0

// Load JSON data
async function loadData() {
  const teamsResponse = await fetch('teams.json');
  const matchesResponse = await fetch('match.json');
  const teams = await teamsResponse.json();
  const matches = await matchesResponse.json();
  computeStandings(teams, matches);
}

// Compute standings
function computeStandings(teams, matches) {
  const standings = {};

  // Initialize teams
  teams.forEach(team => {
    standings[team.name] = {
      played: 0,
      won: 0,
      lost: 0,
      setsFor: 0,
      setsAgainst: 0,
      points: 0
    };
  });

  // Process matches
  matches.forEach(match => {
    const teamA = standings[match.teamA];
    const teamB = standings[match.teamB];

    // Count sets
    const sets = [match.set1, match.set2, match.set3, match.set4].filter(Boolean);
    let setsA = 0, setsB = 0;
    sets.forEach(set => {
      const [a, b] = set.split('-').map(Number);
      setsA += a;
      setsB += b;
    });

    // Update stats
    teamA.played++;
    teamB.played++;
    teamA.setsFor += setsA;
    teamA.setsAgainst += setsB;
    teamB.setsFor += setsB;
    teamB.setsAgainst += setsA;

    if (setsA > setsB) {
      teamA.won++;
      teamB.lost++;
      teamA.points += 3;
    } else {
      teamB.won++;
      teamA.lost++;
      teamB.points += 3;
    }
  });

  renderStandings(standings);
}

// Render standings into HTML table
function renderStandings(standings) {
  const table = document.getElementById('standings-table');
  table.innerHTML = '';

  Object.keys(standings).forEach(team => {
    const row = document.createElement('tr');
    const stats = standings[team];
    row.innerHTML = `
      <td>${team}</td>
      <td>${stats.played}</td>
      <td>${stats.won}</td>
      <td>${stats.lost}</td>
      <td>${stats.setsFor}</td>
      <td>${stats.setsAgainst}</td>
      <td>${stats.points}</td>
    `;
    table.appendChild(row);
  });
}

// Recompute button
document.getElementById('recompute-btn').addEventListener('click', loadData);

// Initial load
loadData();
