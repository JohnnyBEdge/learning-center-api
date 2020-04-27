const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_URL = process.env.DB_URL

const dbName = "learning_center";
const collName = "vocab";
const settings = {useUnifiedTopology: true};

const getVocab = () => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, async function(err,client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connected to DB for GET");
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.find({}).toArray(function(err, docs){
                    if(err){
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return promise;
};

const addVocab = (card) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, async function(err, client) {
            if(err){
                reject(err);
            } else {
                console.log('Connected to DB Server for POST');
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.insertOne(card, (err, result) => {
                    if(err){
                        reject(err);
                    } else{
                        resolve(result.ops[0]);
                        client.close();
                    };
                });
            };
        });
    });
    return promise;
};

const deleteVocab = (id) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for DELETE");
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.deleteOne({_id: ObjectID(id)}, function(err, result){
                    if(err){
                        reject(err);
                    } else {
                        resolve({deleted_id: id});
                        client.close();
                    }
                })
            }
        })
    });
    return promise;
};

const editVocab = (id, card) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for PUT");
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.replaceOne({_id:ObjectID(id)},
                    card,
                    {upsert: true},
                    (err, result) => {
                        if(err){
                            reject(err);
                        } else {
                            resolve({updated_id: id});
                            client.close();
                        }
                    })
            }
        })
    });
    return promise;
};

module.exports = {
    getVocab,
    addVocab,
    editVocab,
    deleteVocab
}