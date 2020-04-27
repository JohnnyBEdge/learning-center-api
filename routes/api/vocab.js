const express = require('express');
const router = express.Router();
const {
    getVocab,
    addVocab,
    // editVocab,
    // deleteVocab
} = require('../../data/vocab')

/* GET home page. */
router.get('/', async function(req, res, next) {
    try{
        const data = await getVocab();
        res.send(data);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal server error; check logs");
    }
});

// POST
router.post('/', async function(req, res, next){
    try{
        const data = await addVocab(req.body);
        res.send(data);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal server error; check logs");
    }
})

module.exports = router;
