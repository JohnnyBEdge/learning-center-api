const express = require('express');
const router = express.Router();
const {
    getVocab
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

module.exports = router;
