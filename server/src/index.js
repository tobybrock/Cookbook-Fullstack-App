const express = require('express')
const session = require('express-session');
require('./mongo');

const port = 3000;

const app = express();

const userRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRoutes");
const recipeListRouter = require("./routes/recipeListRoutes");

app.use(express.json());
app.use(session({
    secret: "Lets get stilt racing into the olympics",
    resave: false,
    saveUninitialized: false 
}));

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/favourite", recipeListRouter);

app.listen(port, () => console.log(`Cookbook app listening at http://localhost:${port}`))
