const express   = require("express");
const Recipe      = require('../models/Recipe');
const router    = express.Router();

//public routes
router.get("/", async (req, res) => {
    const data = await Recipe.find({});
    res.send(data);
});

router.get("/:id", async (req, res) => {
    const data = await Recipe.findOne({_id: req.params.id});
    res.send(data);
});

//auth routes

//middleware check
router.use((req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.status(401).send("please login");
    }
});

router.post('/new', async (req, res) => {
    try {
        const data = await Recipe.create(req.body);
        res.json(data);
    } catch {
        res.status(400).send("bad request!");
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const data = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }   
});

router.delete('/delete/:id', async (req, res) =>{
    try {
        const data = await Item.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
});

module.exports = router;