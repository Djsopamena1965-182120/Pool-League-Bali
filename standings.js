let teams = [];
let matches = [];
let playerStats = {};
let teamStats = {};
let editingId = null;

async function loadAll() {
  try {
    const resTeams = await fetch("teams.json");
    teams = await resTeams.json();
  } catch (e) {
    teams = [];
  }

  try {
    const resMatches = await fetch("matches.json");
    matches = await resMatches.json();
  } catch (e) {
    matches = [];
  }
}

// voorbeeld renderfunctie voor teams.html
function renderTeamsPage() {
  const grid = document.querySelector(".team-grid");
  if (!grid) return;
  grid.innerHTML = "";
  teams.forEach(team => {
    const article = document.createElement("article");
    article.className = "team";
    article.innerHTML = `
      <h3>${team.name}</h3>
      <table class="players-table standings-table">
        <thead><tr><th>#</th><th>Players</th><th>Handicap</th></tr></thead>
        <tbody>
          ${team.players.map((p,i)=>`<tr><td>${i+1}</td><td>${p}</td><td>0</td></tr>`).join("")}
        </tbody>
      </table>`;
    grid.appendChild(article);
  });
}

function init() {
  loadAll().then(() => {
    renderTeamsPage();
    renderMatches();
    recalcAllStats();
  });
}

document.addEventListener("DOMContentLoaded", init);
