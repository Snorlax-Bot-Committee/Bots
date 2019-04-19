const Messenger = require.main.require('./services/messenger.js');
const config = require('../config.json');

const run = (bot, message, args) => {
  const messenger = new Messenger(bot, message);
  const userId = message.author.id;

  if (userId === config.jsUserId || userId === config.crUserId) {
    const format = RegExp(/^(\d+)(?:\s*$|\s+(.*))/);

    if (format.test(args)) {
      const regexArray = format.exec(args);
      const points = (regexArray[1] ? regexArray[1] : null);
      const reason = (regexArray[2] ? regexArray[2] : null);

      if (reason) {
        messenger.sendText(`${points} points removed - "${reason}"`);
      } else {
        messenger.sendText('Short Wall says "RIGGED", add a message to avoid her glare...');
      }
    } else {
      if (args.startsWith('+')) {
        messenger.sendText('`&add [integer] [message]`');
      } else {
        messenger.sendText('`&remove [integer] [message]`');
      }
    }
  }
  else {
    messenger.sendText('No bubbles for you!');
  }
};

module.exports.run = run;