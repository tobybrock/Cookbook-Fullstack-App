import page from "//unpkg.com/page/page.mjs";

const getLists = async () => {
    try{

        const response = await fetch('/api/favourite', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });

        const data = await response.json();
        console.log(data);    
        addListsToDom(data);

    } catch(e) {
        console.log(e);
    }
}

const addListsToDom = (lists) => {
    console.log("list", lists);
        lists.forEach((favourite) => {
        const ul = $('<ul></ul>');     
        const recipeList = $('<li class="recipeList"></li>');
        favourite.recipes.forEach((recipe) => {
            recipeList.append(`
                <div class="jumbotron">
                <button class="btn btn-success">edit</button>
                <h1>${recipe.name}</h1> 
                <h2>Description</h2>
                <p>${recipe.description}</p>
                <h2>Ingredients</h2>
                <p>${recipe.ingredients}</p>
                <h2>Method</h2>
                <p>${recipe.method}</p>
                </div>
                `);
            ul.append(recipeList);
            
        });;
        $("#frontPage").append(ul);
    });


}

const list = (ctx, next) => {

    $('#frontPage').append(`<h1>Favourites</h1`);

    getLists();
  

}

export default list;

