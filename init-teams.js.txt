<script>
const initialTeams = [
  {
    teamName: "Black Library",
    players: [
      {name:"Speler 1", handicap:"1"},
      {name:"Speler 2", handicap:"2"}
      // ... tot 15 spelers
    ]
  },
  {
    teamName: "Litut",
    players: [
      {name:"Speler 1", handicap:"1"},
      // ...
    ]
  },
  {
    teamName: "Venus",
    players: [
      {name:"Speler 1", handicap:"1"},
      // ...
    ]
  },
  {
    teamName: "Sixteen Degrees",
    players: [
      {name:"Speler 1", handicap:"1"},
      // ...
    ]
  }
];

// Zet alleen bij eerste keer in localStorage
if(!localStorage.getItem("teams_data")){
  localStorage.setItem("teams_data", JSON.stringify(initialTeams));
}
</script>
