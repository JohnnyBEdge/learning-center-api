const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_URL = process.env.DB_URL;

const dbName = "learning_center";
const collName = "resources";
const settings = {useUnifiedTopology: true};

const getResources = () => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for GET.");
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.find({}).toArray(function(err, docs){
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
};

module.exports = {
    getResources,
    // addResource,
    // editResource,
    // deleteResource
}