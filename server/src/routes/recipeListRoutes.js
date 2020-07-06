const express   = require("express");
const RecipeList      = require('../models/RecipeList');
const Recipe      = require('../models/Recipe');
const router    = express.Router();

//auth check middleware
router.use((req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.status(401).send("please login");
    }
});

router.get("/", async (req, res) => {
    try {
        const lists = await RecipeList.find({owner: req.session.user.id}).populate('recipes');
        res.json(lists);
    } catch {
        res.status(400).send("bad request");
    }
});

router.post("/new", async (req, res) => {
    req.body.owner = req.session.user.id; //ensure logged in user owns this list

    try {
        const list = await RecipeList.create(req.body);
        res.json(list);
    } catch {
        res.status(400).send("bad request");
    }

});

/*
    {
        listID: String,
        recipeID: String
    }
*/
router.post('/recipe/add', async (req, res) => {
    try {
        const list = await RecipeList.findOne({owner: req.session.user.id, _id: req.body.listID});
        const recipe = await Recipe.findOne({_id: req.body.recipeID});

        if(!list || !recipe) {
            res.status(400).send("bad request");
        }else {
            list.recipes.push(recipe); //add recipe to list recipe array
            const result = await list.save(); //save to datase
    
            res.json(result);
        }
    } catch {
        res.status(400).send("bad request");
    }
});

/*
    {
        listID: String,
        recipeID: String
    }
*/
router.patch('/recipe/remove', async (req, res) => {
    try {
        const list = await RecipeList.findOne({owner: req.session.user.id, _id: req.body.listID}).populate('recipes');

        //filter out any matching ID
        list.recipes = list.recipes.filter((recipe) => {
            return recipe.id !== req.body.recipeID
        });

        const result = await list.save(); //update database
        res.json(result);
    } catch(e) {
        console.log(e);
        res.status(400).send("bad request");
    }
})
module.exports = router;