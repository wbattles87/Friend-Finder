//Requires to allow our server to only run if these node modules are imported.
var express = require('express');
var path = require('path');

//Assigns app the express server instance. 
var app = express();

//Requires the routing JS and calls them with (app) so that we can use the routes created in routing despite them being in a separate folder. 
require("./app/routing/api-routes.js")(app);
require("./app/routing/html-routes.js")(app);

//Sets up a port for us to listen on, in this case 8080. 
var PORT = process.env.PORT || 8080;

//listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});