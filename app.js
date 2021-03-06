const Discord = require('discord.js');
const config = require('./config.json');
//const db = require('./dbConnection.js');
const Commander = require('./services/commander.js');
const Messenger = require('./services/messenger.js');


const bot = new Discord.Client();
const commander = new Commander();

bot.on('ready', () => {
  console.log('Connected as ' + bot.user.tag);

  // register all commands in the commands dir
  commander.register();

  //db.connectToDB();
});

bot.on('message', message => {
  const messenger = new Messenger(bot, message);

  // ignore messages from bots
  if (message.author.bot) return;

  // ignore messages from itself
  if (message.author == bot.user) return;

  if (!message.content.startsWith(config.prefix)) return;

  const format = RegExp(/(\w+)\s*(.*)?/);

  if (format.test(message.content.trim())) {
    const regexArray = format.exec(message.content.trim());
    const args = regexArray[2] ? regexArray[2] : '';

    // grab command from commander list
    const cmd = commander.get(regexArray[1].toLowerCase());

    if (cmd) {
      // make sure run() is exported in [cmd].js
      cmd.run(bot, message, args);
    } else {
      messenger.sendText('move oolong, nothing to tea here...');
    }
  } else {
    messenger.sendText('ah yes, ET\'s beloved ligature');
  }

  return;
});

bot.login(config.token);