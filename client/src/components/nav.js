const nav = (ctx, next) => {
    $('#app').empty();
    $("#app").append(
        /*template*/
        `<div class="wrapper">
<!-- Sidebar  -->
<nav id="sidebar">
    <div class="sidebar-header">
        <h3>Cookbook</h3>
    </div>

    <ul class="list-unstyled components">
        <p>Search Any Recipe</p>
        <div class="input-group mb-3">
  <input type="text" class="form-control" id="recipeSearchInput" placeholder="Recipe" aria-label="Recipe Search" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-secondary" id="recipeSearchBtn" type="button">Search</button>
  </div>
</div>
        <!--info -->
    </ul>

</nav>

<!-- Page Content  -->
<div id="content">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i class="fas fa-align-left"></i>
                <span><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-filter-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg></span>
            </button>
            <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-align-justify"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/favourites">My Favourites</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/create">Create a Recipe</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Ingredients go here-->
    <div id="frontPage"></div>
</div>
</div>`);

    next();

}

export default nav;