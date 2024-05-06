import { fetchingTeams } from "./fetch.js";
import { LEAGUES } from "./utils.js";

async function fetchTeams(league, season) {
  const teams = await fetchingTeams(league, season);

  const teamsList = document.querySelector(".teams-table-body");
  teamsList.innerHTML = "";

  teams.forEach((team) => {
    const singleTeam = document.createElement("tr");
    singleTeam.className = "league-member";
    singleTeam.innerHTML = `<td>${team.position}</td><td><img src=${team.team.logo} alt="logo"></td><td>${team.team.name}</td><td>${team.points}</td><td>${team.games.played}</td><td>${team.games.win.total}</td><td>${team.games.lose.total}</td><td>${team.goals.for}</td><td>${team.goals.against}</td>`;

    teamsList.appendChild(singleTeam);
  });
}

fetchTeams(113, 2023);

function reloadFilters() {
  /* Look for any elements with the class "custom-select": */
  const inputsList = document.getElementsByClassName("input");

  for (let i = 0; i < inputsList.length; i++) {
    const hiddenSelect = inputsList[i].getElementsByTagName("select")[0];

    //removing old selects if exists
    const existSelection = inputsList[i].querySelector(".select-selected");
    const existList = inputsList[i].querySelector(".select-items.select-hide");

    if (existSelection) {
      existSelection.parentNode.removeChild(existSelection);
    }

    if (existList) {
      existList.parentNode.removeChild(existList);
    }

    /* For each element, create a new DIV that will act as the selected item: */
    const customSelectedElement = document.createElement("DIV");
    customSelectedElement.setAttribute("class", "select-selected");
    customSelectedElement.innerHTML =
      hiddenSelect.options[hiddenSelect.selectedIndex].innerHTML;
    inputsList[i].appendChild(customSelectedElement);
    /* For each element, create a new DIV that will contain the option list: */
    const customList = document.createElement("DIV");
    customList.setAttribute("class", "select-items select-hide");

    for (let j = 1; j < hiddenSelect.length; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      const customListElement = document.createElement("DIV");
      customListElement.innerHTML = hiddenSelect.options[j].innerHTML;
      customListElement.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        const originalSelect =
          this.parentNode.parentNode.getElementsByTagName("select")[0];
        const selectBox = this.parentNode.previousSibling;
        for (let i = 0; i < originalSelect.length; i++) {
          if (originalSelect.options[i].innerHTML == this.innerHTML) {
            originalSelect.selectedIndex = i;
            selectBox.innerHTML = this.innerHTML;
            const selection =
              this.parentNode.getElementsByClassName("same-as-selected");
            for (let k = 0; k < selection.length; k++) {
              selection[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        selectBox.click();
        originalSelect.dispatchEvent(new Event("change"));
      });
      customList.appendChild(customListElement);
    }
    inputsList[i].appendChild(customList);
    customSelectedElement.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */

      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(element) {
    /* A function that will close all select boxes in the document,
  except the current select box: */
    const arrNo = [];
    const customOptions = document.getElementsByClassName("select-items");
    const customSelects = document.getElementsByClassName("select-selected");

    for (let i = 0; i < customSelects.length; i++) {
      if (element == customSelects[i]) {
        arrNo.push(i);
      } else {
        customSelects[i].classList.remove("select-arrow-active");
      }
    }
    for (let i = 0; i < customOptions.length; i++) {
      if (arrNo.indexOf(i)) {
        customOptions[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
}

reloadFilters();

const firstSelect = document.getElementById("country-select");
const secondSelect = document.getElementById("league-select");

function onChangeSelect() {
  secondSelect.innerHTML = "<option value='0'>League</option>";
  const choice = firstSelect.value;

  const filteredLeagues = LEAGUES.filter(
    (league) => league.country.toString() === choice
  );

  filteredLeagues.forEach((league) => {
    const option = document.createElement("option");
    option.setAttribute("value", league.id);
    option.innerHTML = league.name;

    secondSelect.appendChild(option);
  });
  reloadFilters();
}

firstSelect.addEventListener("change", onChangeSelect);

const thirdSelect = document.getElementById("season-select");
const formSubmit = document.getElementById("filters-form");
const errorMessage = document.getElementById("error-message");

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    firstSelect.value === "0" ||
    secondSelect.value === "0" ||
    thirdSelect.value === "0"
  ) {
    errorMessage.setAttribute("class", "visible");
    return;
  } else {
    errorMessage.removeAttribute("class");
    fetchTeams(secondSelect.value, thirdSelect.value);
  }
});
