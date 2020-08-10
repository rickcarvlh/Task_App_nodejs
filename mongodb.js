// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionUrl,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // * fetching data from database
    /*
    db.collection('users').findOne(
      { _id: new ObjectID('5f314aee2f2888646cedacee') },
      (error, users) => {
        if (error) {
          console.log('Unable to fetch');
        }

        console.log(users);
      }
    );*/

    db.collection('users')
      .find({ age: 27 })
      .toArray((error, users) => {
        console.log(users);
      });
  }
);
