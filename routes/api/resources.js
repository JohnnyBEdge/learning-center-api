const express = require('express');
const router = express.Router();
const {
    getResources,
    addResource,
    // editResource,
    // deleteResource
} = require('../../data/resources')

router.get('/', async function(req, res){
    try{
        const data = await getResources();
        res.send(data);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error; check logs");
    }
} );

router.post('/', async function(req, res){
    try{
        const data = await addResource(req.body);
        res.send(data);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal server error; check logs");
    }

})

module.exports = router;
