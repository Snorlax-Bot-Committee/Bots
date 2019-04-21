const Messenger = require.main.require('./services/messenger.js');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');
//let Connection = require('../dbConnection.js');

const run = (bot, message, args) => {
  const messenger = new Messenger(bot, message);
  const userId = message.author.id;
  const client = MongoClient(config.mongoDb);
  const dbName = 'To-Tally-Tea';


  if (userId === config.jdUserId || userId === config.crUserId) {
    const format = RegExp(/^(\d+)(?:\s*$|\s+(.*))/);

    if (format.test(args)) {
      const regexArray = format.exec(args);
      const points = (regexArray[1] ? regexArray[1] : null);
      const reason = (regexArray[2] ? regexArray[2] : null);
      let collectionName;
      let total;
      let docs;
      if (reason) {
        client.connect(function (err) {
          console.log("connected to DB")
          const db = client.db(dbName);
          messenger.sendText(`${points} points removed - "${reason}"`);
          if (userId === config.jdUserId) {
            collectionName = 'moonDad';
            db.collection(collectionName).find().limit(1).sort({$natural:-1}).toArray(function(err, docs){
              console.log("retrieved records:");
              console.log(docs);
            });
            if(typeof docs !== "undefined") {
              total = docs[0].previousTotal;
            } else {
              total = 0;
            }
            db.collection(collectionName).insertOne({
              "name": message.author.username,
              "previousTotal": total,
              "command": "remove points",
              "message": reason,
              "points": parseInt(points),
              "newTotal": parseInt(total - points)
            });
            console.log('added to db');
          } else if (userId === config.crUserId) {
            collectionName = 'misterMeter';
            db.collection(collectionName).find().limit(1).sort({$natural:-1}).toArray(function(err, docs){
              console.log("retrieved records:");
              console.log(docs);
            });
            if(typeof docs !== "undefined") {
              total = docs[2];
            } else {
              total = 0;
            }
            db.collection(collectionName).insertOne({
              "name": message.author.username,
              "previousTotal": total,
              "command": "remove points",
              "message": reason,
              "points": points.parseInt(),
              "newTotal": (total + points).parseInt()
            });
            console.log('added to db');
          }
          client.close();
        });
      } else {
        messenger.sendText('Short Wall says "RIGGED", add a message to avoid her glare...');
      }
    } else {
      if (args.startsWith('-')) {
        messenger.sendText('`&remove [integer] [message]`');
      } else {
        messenger.sendText('`&add [integer] [message]`');
      }
    }
  } else {
    messenger.sendText('No bubbles for you!');
  }
  client.close();
  console.log("db connection closed");
};

module.exports.run = run;