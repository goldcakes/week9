const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);
const colName = 'products';

var queryAdd = require('./add')
var queryDelete = require('./remove');
var queryUpdate = require('./update');
var queryRead = require('./read');
var queryDrop = require('./drop.js');

const docArray = [{id: 1, name: "P1", description: "D1", price: 20.00, units: 5}, {id: 2, name: "P2", description: "D2", price: 12.00, units: 12}, {id: 2, name: "P1", description: "D2", price: 1.0, units: 2}]

client.connect(function(err) {
  if (err) {return console.log(err)}
  const dbName = 'mydb';
  const db = client.db(dbName);
  doQueries(db);
  
});

async function doQueries(db) {
  await drop(db);
  await addItem(db);
  // await readItems(db);
  // await updateItems(db);
  await remove(db);
}

async function addItem(db) {
  const collection = db.collection(colName);
  collection.insertMany(docArray, (err, res) => {
    if (err) throw err;
    console.log('Number of items inserted = ' + res.insertedCount);
  })
}

async function readItems(db) {
  const collection = db.collection(colName);
  collection.find({}).toArray(function(err, obj) {
    if (err) throw err;
    console.log(obj);
  })
}

async function drop(db) {
  const collection = db.collection(colName);
  collection.drop((err, res) => {
    if (err) throw err;
    if (res) {
      console.log('Collection deleted');
    } else {
      console.log('Collection not deleted');
    }
  });
}

async function remove(db) {
  const collection = db.collection(colName);
  var query = {'name': 'P2'};
  collection.deleteMany(query, function(err, res) {
    if (err) throw err;
    console.log(res.deletedCount + ' documents deleted');
  });
}