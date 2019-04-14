const Messenger = require.main.require('./services/messenger.js');
const fs = require('fs');

let punsList = [];

const init = () => {
  console.log('reading puns file');
  let punsFile = JSON.parse(fs.readFileSync('./assets/puns.json'));
  punsList = punsFile.puns;
}

const run = (bot, message, args) => {
  let index = Math.floor(Math.random() * (punsList.length + 1));
  const messenger = new Messenger(bot, message);
  messenger.sendText(punsList[index]);
};

module.exports.run = run;
module.exports.init = init;