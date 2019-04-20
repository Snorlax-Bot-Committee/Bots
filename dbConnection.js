const MongoClient = require('mongodb').MongoClient
const config = require('./config.json')
const url = config.mongoDb;

class Connection {
    static connectToDB() {
        if ( this.database ) return Promise.resolve(this.database)
        return MongoClient.connect(this.url, {useNewUrlParser: true}, (err, db) => {
            if (err) console.log(err);
            else {
                this.db = db;
                console.log('MongoDB connected');
            }
        })
    }
}

Connection.db = null
Connection.url = url
Connection.options = {
    bufferMaxEntries:   0,
    reconnectTries:     5000,
}

module.exports = Connection;