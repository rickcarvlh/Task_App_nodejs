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

    // * update documents on db

    // promisse for update database
    db.collection('tasks').updateMany({
      completed: false
    }, {
      $set: { completed: true }
    },
    ).then((result) => {
      console.log(result.modifiedCount);
    }).catch((error) => {
      console.log("Error: ", error);
    })
  }
);
