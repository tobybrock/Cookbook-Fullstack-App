import page from "//unpkg.com/page/page.mjs";

page.configure({window:window});

//components
import nav from './components/nav.js';
import sidebarControl from './components/sidebarControl.js';
import login from './components/login.js';
import signup from './components/signup.js';
import create from './components/create.js';
import favourites from './components/favourites.js';
import ingredients from './components/ingredients.js';
import searchDish from './components/searchDish.js';


const showPages = () => {
    //routes
    page('/', () => {
        page.redirect('/login');
    });

    page('/signup', signup);
    
    page('/login', login);

    page('/create', nav, sidebarControl, searchDish, create);

    page('/favourites', nav, sidebarControl, searchDish, favourites);

    page('/home', nav, sidebarControl, searchDish, ingredients, () => {
    
    
    });
    
    page({hasbang: true});

}

//on ready
$(() => {
    showPages();
    
   
});