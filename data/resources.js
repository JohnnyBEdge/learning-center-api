const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_URL = process.env.DB_URL;

const dbName = "learning_center";
const collName = "resources";
const settings = {useUnifiedTopology: true};

const invalidArticle = (resource) => {
    let result;
    if(!resource.title){
        result=("Article requires a title");
    } else if(!resource.url){
        result=("Article requires a url.");
    } else if(!validURL(resource.url)){
        result=("Not a valid URL.");
    };
    return result;
};

const validURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

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

const addResource =(resource) => {
    const promise = new Promise((resolve, reject) => {
        const check = invalidArticle(resource);
        if(check){
            resource.invalid = check;
        }
         resource.invalid;
        MongoClient.connect(DB_URL, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connecr to DB for POST.");
                const db = client.db(dbName);
                const collection = db.collection(collName);
                resource.date_added = new Date(Date.now()).toUTCString();
                collection.insertOne(resource, (err, result) =>{
                    if(err){
                        console.log(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    }
                })
            }
        })
        
    });
    return promise;
};

const deleteResource = (id) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for DELETE.");
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
}

const editResource = (id, resource) => {
    const promise = new Promise((resolve, reject) =>{
            MongoClient.connect(DB_URL, settings, async function(err, client){
                if(err){
                    console.log(err);
                } else {
                    console.log("Successfully connect to DB for PUT.");
                    const db = client.db(dbName);
                    const collection = db.collection(collName);
                    collection.replaceOne({_id:ObjectID(id)},
                    resource,
                    {upsert:true},
                    (err, result)=>{
                        if(err){
                            console.log(err);
                        } else {
                            resolve({updated_id:id})
                            client.close()
                        }
                    })
                }
            })
    });
    return promise;
};

module.exports = {
    getResources,
    addResource,
    deleteResource,
    editResource,

}