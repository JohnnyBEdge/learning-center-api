const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_URL = process.env.DB_URL

const dbName = "learning_center";
const collName = "vocab";
const settings = {useUnifiedTopology: true};

const getVocab = () => {
    const promise = new Promise((reject, resolve) => {
        MongoClient.connect(DB_URL, settings, function(err,client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connected to DB for GET");
                const db = client.db(dbName);
                const collection = db.collection(collName);
                collection.find({}).toArray(function(err, docs){
                    if(err){
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    }
                })
            }
        })
    });
    return promise;
}

module.exports = {
    getVocab
}