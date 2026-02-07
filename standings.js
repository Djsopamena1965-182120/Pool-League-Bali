<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  console.log("standings.js v12.14 (Firestore) loaded");

  // ====== Firebase Config ======
  const firebaseConfig = {
    apiKey: "key here",
    authDomain: "JOUW_PROJECT.firebaseapp.com",
    projectId: "JOUW_PROJECT_ID",
    storageBucket: "JOUW_PROJECT.appspot.com",
    messagingSenderId: "JOUW_SENDER_ID",
    appId: "JOUW_APP_ID"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // ====== Config ======
  const REQUIRED_SINGLES_PER_DAY = 7;
  const REQUIRED_DOUBLES_PER_DAY = 3;
  const adminCode = "88888";

  // ====== Baseline teams ======
  const BASELINE_TEAMS = [
    { name: "Black Library", players: ["Achie (Captain)","Danny","STV","Jon","Rose","Pyer","Virgy","Felix","Gary","JP","JC","Philly","BL-13","BL-14","BL-15"] },
    { name: "Litut", players: ["Jesus (Captain)","Ketut","TJ","Dave","Troublemaker","BG John","Kai","Dylan","Judas","Niluh","Tony","Sidd","LT-13","LT-14","LT-15"] },
    { name: "Venus – Samurai Warriors", players: ["Andrew (Captain)","Susanto","Stek","Bill","Hayato","Lance","Vanda","Josh","Terry","Johan","Jeff","Ray","Nima","Tony","VN-15"] },
    { name: "Sixteen Degrees", players: ["Andrew S","Budi","Cahyo","Dewa","Eka","Fajar","Gilang","Hendra","Iwan","Joko","Komang","Made","Nyoman","Oka","Putu"] }
  ];

  // ====== State ======
  let teams = [];
  let matches = [];
  let playerStats = {};
  let teamStats = {};
  let editingId = null;

  // ====== Storage Firestore ======
  async function saveAll(){
    for (const t of teams) {
      await setDoc(doc(db, "teams", t.name), t);
    }
    for (const m of matches) {
      await setDoc(doc(db, "results", m.id || crypto.randomUUID()), m);
    }
  }

  async function loadAll(){
    teams = [];
    matches = [];

    const teamsSnap = await getDocs(collection(db, "teams"));
    teamsSnap.forEach(docSnap => teams.push(docSnap.data()));

    const matchesSnap = await getDocs(collection(db, "results"));
    matchesSnap.forEach(docSnap => matches.push(docSnap.data()));

    if(!Array.isArray(teams) || teams.length===0){
      teams = JSON.parse(JSON.stringify(BASELINE_TEAMS));
    }

    renderTeamDropdowns();
    renderNavTeams();
    renderMatches();
    recalcAllStats();
  }

  // ====== Admin login ======
  function checkAdminCode() {
    const input = document.getElementById("adminPw").value;
    if (input === adminCode) {
      document.getElementById("adminPanel").style.display = "block";
    } else {
      alert("Wrong password");
    }
  }
  window.checkAdminCode = checkAdminCode;

  // ====== Init ======
  function init(){
    loadAll();
    renderWeeks();
    renderNavTeams();
    renderTeamDropdowns();
    ensureBreakdownTables();
    renderMatches();
    recalcAllStats();
  }
  init();

  // Expose
  window.editMatch=editMatch;
  window.deleteMatch=deleteMatch;
</script>

