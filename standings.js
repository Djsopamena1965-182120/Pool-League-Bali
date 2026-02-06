console.log("standings.js v12.13 (fetch version) loaded");

// ====== Config ======
const REQUIRED_SINGLES_PER_DAY = 7;
const REQUIRED_DOUBLES_PER_DAY = 3;
const adminCode = "88888";

// ====== State ======
let teams = [];
let matches = [];
let playerStats = {};
let teamStats = {};
let editingId = null;

// ====== Load/Save ======
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

async function saveAll() {
  // Hier hoort een backend of workflow die teams.json en matches.json bijwerkt.
  console.log("SaveAll → schrijf naar centrale JSON (repo/backend)");
}

// ====== Stats helpers ======
function resetStats() {
  playerStats = {};
  teamStats = {};
}

function addPlayer(team, player) {
  if (!playerStats[player]) {
    playerStats[player] = { team, singles: 0, doubles: 0, points: 0 };
  }
}

function applyMatchToStats(match) {
  if (match.type === "Single") {
    addPlayer(match.teamA, match.playerA1);
    addPlayer(match.teamB, match.playerB1);
    playerStats[match.playerA1].singles++;
    playerStats[match.playerB1].singles++;
  } else if (match.type === "Double") {
    addPlayer(match.teamA, match.playerA1);
    addPlayer(match.teamA, match.playerA2);
    addPlayer(match.teamB, match.playerB1);
    addPlayer(match.teamB, match.playerB2);
    playerStats[match.playerA1].doubles++;
    playerStats[match.playerA2].doubles++;
    playerStats[match.playerB1].doubles++;
    playerStats[match.playerB2].doubles++;
  }
}

function computeDailyTotalsAndCounts() {
  matches.forEach(m => applyMatchToStats(m));
}

function applyDailyBonuses() {
  // bonusregels toepassen
}

// ====== Rendering ======
function renderMatches() {
  const container = document.getElementById("matches");
  container.innerHTML = "";
  matches.forEach(m => {
    const div = document.createElement("div");
    div.textContent = `${m.date} - ${m.teamA} vs ${m.teamB} (${m.type})`;
    container.appendChild(div);
  });
}

function renderPlayerStandings() {
  const container = document.getElementById("player-standings");
  container.innerHTML = "";
  Object.keys(playerStats).forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p} (${playerStats[p].team}) S:${playerStats[p].singles} D:${playerStats[p].doubles}`;
    container.appendChild(div);
  });
}

function renderTeamRanking() {
  const container = document.getElementById("team-ranking");
  container.innerHTML = "";
  teams.forEach(t => {
    const div = document.createElement("div");
    div.textContent = `${t.name}`;
    container.appendChild(div);
  });
}

function buildWeekBreakdownTable(week) {
  // breakdown per week
}

function ensureBreakdownTables() {
  // check en render breakdown tables
}

function renderBreakdownTables() {
  // render alle breakdowns
}

// ====== Editing ======
function editMatch(id) {
  editingId = id;
}

function deleteMatch(id) {
  matches = matches.filter(m => m.id !== id);
  saveAll();
  recalcAllStats();
}

function recalcAllStats() {
  resetStats();
  computeDailyTotalsAndCounts();
  applyDailyBonuses();
  renderPlayerStandings();
  renderTeamRanking();
  renderBreakdownTables();
}

// ====== Init ======
async function init() {
  await loadAll();
  renderWeeks();
  renderNavTeams();
  renderTeamDropdowns();
  ensureBreakdownTables();
  renderMatches();
  recalcAllStats();
}
init();
