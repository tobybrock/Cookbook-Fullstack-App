import page from "//unpkg.com/page/page.mjs";

const submitHandler = async (formData) => {

    try {
        const response = await fetch('/api/user/new', {
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
        page.redirect('/login');

    } catch (e) {
        console.log(e);
    }
}
const signup = (ctx, next) => {
    $(document).empty();
    $('#app').append(
        /*template*/
        `
         <div class="jumbotron">
    <form id="form-signup">
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
        <button type="submit" class="btn btn-primary">Create user</button>
    </form>
    </div>
    `);


    $("#form-signup").submit((e) => {
        e.preventDefault();

        const formData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        console.log(formData);
        submitHandler(formData);
    });

}

export default signup;