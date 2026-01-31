// Data
const teams = [];
const players = [];
const matches = [];

// Team Standings
function renderTeamStandings() {
  const tbody = document.querySelector("#team-ranking-table tbody");
  tbody.innerHTML = "";
  teams.forEach(team => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${team.name}</td>
      <td>${team.played}</td>
      <td>${team.wins}</td>
      <td>${team.draws}</td>
      <td>${team.losses}</td>
      <td>${team.points}</td>
    `;
    tbody.appendChild(row);
  });
}

// Player Standings
function renderPlayerStandings() {
  const tbody = document.querySelector("#player-standings-table tbody");
  tbody.innerHTML = "";
  players.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.played}</td>
      <td>${player.wins}</td>
      <td>${player.losses}</td>
      <td>${player.points}</td>
      <td>${player.handicap}</td>
    `;
    tbody.appendChild(row);
  });
}

// Matches
function renderMatches() {
  const tbody = document.querySelector("#matches-table tbody");
  tbody.innerHTML = "";
  matches.forEach(match => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${match.id}</td>
      <td>${match.teamA}</td>
      <td>${match.teamB}</td>
      <td>${match.pointsA}</td>
      <td>${match.pointsB}</td>
      <td>${match.bonusA}</td>
      <td>${match.bonusB}</td>
    `;
    tbody.appendChild(row);
  });
}
// Login / Logout
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const loginSection = document.querySelector("#admin-login");
const matchForm = document.querySelector("#match-form");

// Startstatus bij laden
function setStartStatus() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    matchForm.classList.remove("hidden");
    loginSection.classList.add("hidden");
  } else {
    matchForm.classList.add("hidden");
    loginSection.classList.remove("hidden");
  }
}
setStartStatus();

// Login
loginBtn.addEventListener("click", () => {
  const pw = document.querySelector("#admin-password").value.trim();
  if (pw === "888") {
    localStorage.setItem("isLoggedIn", "true");
    setStartStatus();
    document.querySelector("#admin-password").value = "";
  } else {
    alert("Incorrect password");
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  setStartStatus();
});
// Admin Controls
document.querySelector("#add-team").addEventListener("click", () => {
  const name = prompt("Enter new team name:");
  if (name) {
    teams.push({ name, played: 0, wins: 0, draws: 0, losses: 0, points: 0 });
    renderTeamStandings();
  }
});

document.querySelector("#add-player").addEventListener("click", () => {
  const name = prompt("Enter new player name:");
  if (name) {
    players.push({ name, played: 0, wins: 0, losses: 0, points: 0, handicap: 0 });
    renderPlayerStandings();
  }
});

document.querySelector("#delete-team").addEventListener("click", () => {
  const name = prompt("Enter team name to delete:");
  const index = teams.findIndex(t => t.name === name);
  if (index !== -1) {
    teams.splice(index, 1);
    renderTeamStandings();
  }
});

document.querySelector("#delete-player").addEventListener("click", () => {
  const name = prompt("Enter player name to delete:");
  const index = players.findIndex(p => p.name === name);
  if (index !== -1) {
    players.splice(index, 1);
    renderPlayerStandings();
  }
});
// Init rendering
renderTeamStandings();
renderPlayerStandings();
renderMatches();
