const Discord = require('discord.js');

class Messenger {
  
  constructor(bot, message) {
    this.bot = bot;
    this.message = message;
  }

  sendText(text) {
    this.message.channel.send(text);
  }

  sendAttachment(url) {
    this.message.channel.send(new Discord.Attachment(url));
  }
}

module.exports = Messenger;