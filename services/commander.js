const fs = require('fs');

class Commander {

  constructor() {
    this.commands = new Map();
  }

  register() {
    fs.readdir('./commands/', (err, files) => {
      if (err) {
        return console.error(err);
      }

      // make sure file name is the command name
      files.forEach(file => {
        if (!file.endsWith('.js')) return;
        // MAGIC but actually require() returns module.export
        // which gets saved as a value into a map...so when I do 
        // a get on the key (command), I have the module.export 
        // object returned to call on exposed methods from [command].js
        let props = require(`../commands/${file}`);
        let command = file.split('.')[0];
        console.log(`Loading command: ${command}`);
        this.commands.set(command, props);

        if (props.init) {
          props.init();
        }
      });
    });
  }

  get(commandText) {
    return this.commands.get(commandText.toLowerCase());
  }
}

module.exports = Commander;
