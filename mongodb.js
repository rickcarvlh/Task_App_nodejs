// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID;

const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionUrl,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);
    /*
    db.collection('users').insertOne(
      {
        
        name: 'Vikram',
        age: '26',
      },
      (error, result) => {
        if (error) {
          return console.log('Unable to insert user');
        }

        console.log(result.ops);
      }
    );
  }*/

    /*
    db.collection('users').insertMany(
      [
        {
          name: 'Jane',
          age: 28,
        },
        { name: 'Gunther', age: 27 },
      ],
      (error, result) => {
        if (error) {
          return console.log('Unable inser documents');
        }

        console.log(result.ops);
      }
    );*/
    /* db.collection('tasks').insertMany(
      [
        {
          description: 'Clean the house',
          completed: true,
        },
        {
          description: 'Renew Inspection',
          completed: false,
        },
        {
          description: 'Pot plants',
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log('Unable to insert tasks');
        }

        console.log(result.ops);
      }
    );*/
  }
);
