const Messenger = require.main.require('./services/messenger.js');

const run = (bot, message, args) => {
  const messenger = new Messenger(bot, message);
  const menu = '```&add [integer] [message]\n&remove [integer] [message]\n&punny```';
  messenger.sendText(menu);
};

module.exports.run = run;