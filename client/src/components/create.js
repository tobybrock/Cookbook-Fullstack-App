import page from "//unpkg.com/page/page.mjs";

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



const create = (ctx, next) => {
    $('#frontPage').append(
        /*template*/
        `
           <h1>Create a Recipe</h1>
            <div class="form-group shadow-textarea">
                <label for="recipeName">Recipe name</label>
                <textarea class="form-control z-depth-1 createRecipes" id="recipeName" rows="3" ></textarea>
              </div>
              <br>
              <div class="form-group shadow-textarea">
                <label for="recipeDescription">Recipe description</label>
                <textarea class="form-control z-depth-1 createRecipes" id="recipeDescription" rows="3" ></textarea>
              </div>
            <br>
            <div class="form-group shadow-textarea">
                <label for="recipeIngredients">Recipe ingredients</label>
                <textarea class="form-control z-depth-1 createRecipes" id="recipeIngredients" rows="3" ></textarea>
              </div>
              <br>
              <div class="form-group shadow-textarea">
                  <label for="recipeMethod">Recipe method</label>
                  <textarea class="form-control z-depth-1 createRecipes" id="recipeMethod" rows="3" ></textarea>
                </div>
                <button id="createRecipeButton" type="button" class="btn btn-primary">Create Recipe</button>
           `
    );
    $("#createRecipeButton").on('click', async (e) => {
        e.preventDefault();
        const formData = {
            name: $("#recipeName").val(),
            description: $("#recipeDescription").val(),
            ingredients: $("#recipeIngredients").val(),
            method: $("#recipeMethod").val()
        };
        const listID =  await createFavouritesList();
        const recipeID = await createRecipes(formData);
        await addRecipeToFavourites(recipeID._id, listID );
        alert("Recipe successfully added to favourites");
        $(".createRecipes").val("");
    });
}

export default create;