import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (formData) => {

    try{

        const response = await fetch('/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log(data);
        page.redirect('/home');

    } catch(e) {
        console.log(e);
    }

};

const login = (ctx, next) => {
    $(document).empty();
    $('#app').empty();
    $('#app').append(
        /*template*/
        `
    <div class="jumbotron">
    <div id="jumboHead">
    <h1>Login</h1>
    <h2>Don't have an account? <button id="signupButton" type="submit" class="btn btn-secondary">Sign Up</button></h2>
    
    </div>
    <form id="form-login">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" 
                            placeholder="username" name="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" 
                    id="password" name="password" placeholder="password">
        </div>
        <button id="formButton" type="button" class="btn btn-primary">Login</button>
    </form>
    </div>
    `);
    
    
    $("#formButton").on('click',(e) => {
        e.preventDefault();
        console.log('click');
        const formData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        console.log(formData);
        submitHandler(formData);
    });

    $("#signupButton").on('click', (e) => {
        e.preventDefault();
        $('#app').empty();
        page.redirect('/signup');
    });



}

export default login;