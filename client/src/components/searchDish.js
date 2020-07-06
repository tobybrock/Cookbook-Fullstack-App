
async function getRecipe(recipe) {
    const response = await $.ajax(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9c7e856681444c4e8f068a26dee28867&query=${recipe}&titleMatch&addRecipeInformation=true&instructionsRequired&includeIngredients&number=5`)
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

const display = async (data) => {
    let instructions = data.analyzedInstructions[0].steps;
    let ingredients = await recipeInstructions(data.id);
    let ingList = "";
    let methList = "";

    $("#frontPage").empty();
    $("#frontPage").append(
        /*template*/
        `
        <div class="jumbotron recipeJumbo">
        <button type="button" id="addFavouriteButton" class="btn btn-warning">Add to Favourites</button>
                <h1>${ingredients.title}</h1> 
                <h2>Description</h2>
                <p>${data.summary}</p>
                <h2>Ingredients</h2>
                <ul id="ingredientsList"></ul>
                <h2>Method</h2>
                <ul id="methodList"></ul>
                </div>
        `
    );
    
    for (let i = 0; i < instructions.length; i++) {

        $("#methodList").append(`<li>${instructions[i].step}</li>`);
        methList += instructions[i].step + "<br>";
    }

    for (let i = 0; i < ingredients.extendedIngredients.length; i++) {
        $("#ingredientsList").append(`<li>${ingredients.extendedIngredients[i].original}</li>`);
        ingList += ingredients.extendedIngredients[i].original + "<br>";
    }
     
    
    $("#addFavouriteButton").on('click', async (e) => {
        e.preventDefault();
        console.log("method", $("#methodList").val());
        const formData = {
            name: ingredients.title,
            description: data.summary,
            ingredients:  ingList,
            method: methList
        };
       console.log("methList", methList);
        const listID =  await createFavouritesList();
        const recipeID = await createRecipes(formData);
       
        await addRecipeToFavourites(recipeID._id, listID );
        alert("Recipe successfully added to favourites");
        $(".createRecipes").val("");
    });
};


const searchDish = (ctx, next) => {
    $("#recipeSearchBtn").on('click', async (e) => {

        let recipeSearch = $("#recipeSearchInput").val();
        let recipe = await getRecipe(recipeSearch);

        await display(recipe.results[0])

    });

    next();
}

export default searchDish;