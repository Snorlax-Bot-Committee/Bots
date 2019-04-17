const Messenger = require.main.require('./services/messenger.js');
const config = require('../config.json');
//const fs = require('fs');

// let punsList = [];

// const init = () => {
//   console.log('reading puns file');
//   let punsFile = JSON.parse(fs.readFileSync('./assets/puns.json'));
//   punsList = punsFile.puns;
// }

const run = (bot, message, args) => {
    const messenger = new Messenger(bot, message);
    let userId = message.author.id;
    if (userId == config.jdUserId || userId == config.crUserId) {
      if (args.length == 2) {
          messenger.sendText("removing " + args[0] + " points");
          messenger.sendText("With message: " + args[1]);
          console.log(args);
        } else if (args.length == 1) {
          messenger.sendText('Short Wall says "RIGGED", add a message to avoid this....');
        } else {
          messenger.sendText('Help.......');
        }
      }
      else {
        messenger.sendText("No bubbles for you!");
      }
    };


    module.exports.run = run;
    //module.exports.init = init;