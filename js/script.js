import { fetchingTeams } from "./fetch.js";

async function fetchTeams() {
  const teams = await fetchingTeams(113, 2023);
  console.log(teams);

  const teamsList = document.querySelector(".teams-table-body");

  teams.forEach((team) => {
    const singleTeam = document.createElement("tr");
    singleTeam.className = "league-member";
    singleTeam.innerHTML = `<td>${team.position}</td><td><img src=${team.team.logo} alt="logo"></td><td>${team.team.name}</td><td>${team.points}</td><td>${team.games.played}</td><td>${team.games.win.total}</td><td>${team.games.lose.total}</td><td>${team.goals.for}</td><td>${team.goals.against}</td>`;

    teamsList.appendChild(singleTeam);
  });
}

fetchTeams();
