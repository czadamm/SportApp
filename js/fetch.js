export async function fetchingTeams(league, season) {
  const url = `https://api-volleyball.p.rapidapi.com/standings?league=${league}&season=${season}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7f024114ddmsh515f91750a87728p119f18jsn1be261bcb2f7",
      "X-RapidAPI-Host": "api-volleyball.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  const resData = await res.json();

  return resData.response[0];
}
