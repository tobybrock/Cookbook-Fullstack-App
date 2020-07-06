import page from "//unpkg.com/page/page.mjs";

async function getRecipe(ingredients) {
    const response = await $.ajax(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=9c7e856681444c4e8f068a26dee28867&ingredients=${ingredients}&number=1`)
        .catch(e => console.log(e));  
        return response;
}

async function recipeInstructions(ID) {
    const response = await $.ajax(`https://api.spoonacular.com/recipes/${ID}/information?apiKey=9c7e856681444c4e8f068a26dee28867&includeNutrition=false`)
        .catch(e => console.log(e));
    return response;
}

const getFavourites = async () => {
    try {
        const listResponse = await fetch('/api/favourite', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });

        const listData = await listResponse.json();
        return listData;
    } catch (e) {
        console.log(e);
    }
};
 const createFavouritesList = async () => {
     let counter = 0;
    try { 
        const favourites = await getFavourites();
        for (let i = 0; i < favourites.length; i++) {

            if (favourites[i].name === "Favourites"){
                counter++;
                return favourites[i]._id;
            }
        }
        if (counter === 0) {
            addList({ "name": "Favourites" });
            return favourites[i]._id;
        }
    } catch (e) {
        console.log(e);
    }
};
    
const addList = async (formData) => {
    try {
        const response = await fetch('/api/favourite/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return(data);

    } catch (e) {
        console.log(e);
    }
};

const addRecipeToFavourites = async (recipeID, listID) => {
    try {
        const response = await fetch('/api/favourite/recipe/add', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listID: listID,
                recipeID: recipeID
            })
        });
        const data = await response.json();
} catch (e) {
    console.log(e);
}
};

const createRecipes = async (formData) => {
    try {
        const response = await fetch('/api/recipe/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        return data;
        
    } catch (e) {
        console.log(e);
    }
};

const cart = async() => {
    let pantry = "";
    let latch = false;

    $("#ingredientBtn").on('click', () => {
    let ingredient = $("#ingredientInput").val();
    $("#shoppingCart").append(`<h3><li>${ingredient}&emsp;<button type="button" class="btn btn-danger" id="button">remove</button></li></h3>`);
    if(!latch){
        pantry += `${ingredient}`
        latch = true;
    } else {
        pantry += `,+${ingredient}`;
    }
    $("#ingredientInput").val("");
    console.log(pantry);
});
$("#searchRecipesByIngredients").on('click', async function () {
    let instructions = await (getRecipe(pantry));
    let ingredients = await recipeInstructions(instructions[0].id);
    let ingList = "";
    let methList = "";
    console.log("1",instructions);
    console.log("2",ingredients);
    $("#frontPage").empty();
    $("#frontPage").append(
        /*template*/
        `
        <div class="jumbotron recipeJumbo">
        <button type="button" id="addFavouriteButton" class="btn btn-warning">Add to Favourites</button>
                <h1>${ingredients.title}</h1> 
                <h2>Description</h2>
                <p>${ingredients.summary}</p>
                <h2>Ingredients</h2>
                <ul id="ingredientsList"></ul>
                <h2>Method</h2>
                <p>${ingredients.instructions}</p>
                </div>
        `
    );
    
    for (let i = 0; i < ingredients.extendedIngredients.length; i++) {
        $("#ingredientsList").append(`<li>${ingredients.extendedIngredients[i].original}</li>`);
        ingList += ingredients.extendedIngredients[i].original + "<br>";
    }
     
    
    $("#addFavouriteButton").on('click', async (e) => {
        e.preventDefault();
        const formData = {
            name: ingredients.title,
            description:ingredients.summary,
            ingredients:  ingList,
            method: ingredients.instructions
        };

        const listID =  await createFavouritesList();
        const recipeID = await createRecipes(formData);
       console.log(recipeID);
        await addRecipeToFavourites(recipeID._id, listID );
        alert("Recipe successfully added to favourites");
        $(".createRecipes").val("");
    });
});
/*
$("#deleteme").on('click', function () {
    console.log('delte');
    $(this).closest("li").remove();
});
*/
}

const homeSetup = (ctx, next) => {
    $("#frontPage").append(
        /*template*/
        `
    <div id="header">
                <h2>Add ingredients from your pantry to the cart and hit search to find recipes based on those ingredients.</h2>
            </div>
            <div class="input-group">
                <input type="text" class="form-control" id="ingredientInput" placeholder="Ingredient">
                <div class="input-group-append">
                  <button type="button" class="btn btn-success" id="ingredientBtn">Add to cart</button>
                    </div>
                    </div>
                    <br>
            <div class="jumbotron" id="cart">
                <div class="inline">
                <span><h2>Cart</h2>
                <button type="button" class="btn btn-success" id="searchRecipesByIngredients">Search Recipes</button></span>
                </div>
                <ul id="shoppingCart"></ul>
            </div>
            `)
            cart();
            
           
}



export default homeSetup;