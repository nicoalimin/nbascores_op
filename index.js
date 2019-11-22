const axios = require("axios");
const moment = require("moment");
const { ux } = require("@cto.ai/sdk");

const getDateNba = () => {
  const date = moment()
    .subtract(8, "hours")
    .format("YYYYMMDD");
  return date;
};

const getDateFormatted = () => {
  const date = moment()
    .subtract(8, "hours")
    .format("DD-MM-YYYY");
  return date;
};

async function main() {
  const date = getDateNba();
  const teamsToday = await axios.get(
    `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`
  );
  if (!teamsToday) return;
  const games = teamsToday.data.games;

  if (!games) {
    console.log(`No games for ${getDateFormatted()}`);
    return;
  }

  const { blue, red } = ux.colors;
  console.log(red(`Games for ${getDateFormatted()}\n`));
  games.forEach(game => {
    console.log(
      `${blue(game.vTeam.triCode)} ${game.vTeam.score} - ${
        game.hTeam.score
      } ${blue(game.hTeam.triCode)}`
    );
  });
}

main();
