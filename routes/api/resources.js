const express = require('express');
const router = express.Router();
const {
    getResources,
    addResource,
    deleteResource,
    editResource
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
});

router.delete('/:id', async function(req, res, next){
    try{
        const data = await deleteResource(req.params.id);
        res.send(data);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal server error; check logs.");
    };
});

router.patch('/:id', async function(req, res){
    console.log(req.body, req.params.id)
    try{
        const data = await editResource(req.params.id, req.body);
        res.send(data);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal server error; check logs.");
    };
});

module.exports = router;
