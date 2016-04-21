"use strict"

var http = require('http');
var dispatcher = require('httpdispatcher');

var PORT=5002;

var milesPerDegreeLatitudeInFeet = 364560;

//how far to move the ghost in feet upon failed capture
var constB = 2640, constA = 500;

/* HELPER FUNCTIONS */
function feetToDMSLatitude(feet){ return feet/milesPerDegreeLatitudeInFeet; }
function latitudeToFeet(latitudeInDMS){ return latitudeInDMS * milesPerDegreeLatitudeInFeet; }

// array of ghosts
var ghosts = [
    {"type_id": 8, "location_x": 36.1457, "location_y": -86.8034},
    {"type_id": 2, "location_x": 555.5555555, "location_y": 555.5555555},
    {"type_id": 3, "location_x": 555.5555555, "location_y": 555.5555555},
    {"type_id": 5, "location_x": 555.5555555, "location_y": 555.5555555}
];

//map to store the users
var myMap = new Map();

// handle requests & responses
function handleRequest(request, response){
    try {
        // log the request on console
        console.log(request.url);
        // dispatch
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

// for all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

//call this to add a user
dispatcher.onPost("/adduser", function(req, res){
    // add to user map
    myMap.set(JSON.parse(req.body).name, 0);
    console.log(req.body);
    console.log("Added new user: " + JSON.parse(req.body).name + " = " + "0");
    
    // print out all users to console for tracking purposes
    console.log("\nActive Users: ");
    myMap.forEach(function(value, key) {
  		console.log(key + " = " + value);
	}, myMap)
	
    res.end("Success!");
});

// update leaderboard
dispatcher.onPost("/updateleaderboard", function(req, res) {
    // update user map and sort
    var topTenNamesAndScores = [];
    myMap.forEach(function(value, key){
        topTenNamesAndScores.push([key, value]);
    })
    topTenNamesAndScores.sort(
        function(a,b){
            return (b[1] - a[1]);
        }
    );

	console.log("Dispatching the following scores: " + JSON.stringify(topTenNamesAndScores.slice(0,9)));

    // send the top 10 users to client
    res.end(JSON.stringify(topTenNamesAndScores.slice(0,9)));
});

// call this to indicate a ghost caught
dispatcher.onPost("/catchghost", function(req, res){
    var ghostCatcherName = JSON.parse(req.body).name;
    var currentGhostCatcherPower = myMap.get(ghostCatcherName);
    var points = JSON.parse(req.body).points;
    
    myMap.set(ghostCatcherName, points + currentGhostCatcherPower);
});

//invoke this post to get an array of the current ghost locations
dispatcher.onGet("/getupdatedghosts", function(req, res){
    res.end(JSON.stringify(ghosts));
});
 
// remove a ghost
dispatcher.onPost("/remove", function(req, res) {
    for (var i = 0; i < ghosts.length; ++i) {
        if(ghosts[i].type_id === JSON.parse(req.body).id) {
            ghosts.splice(i,1);
        }
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

// create server
var server = http.createServer(handleRequest);

// start server
server.listen(PORT, function(){
    console.log("Server listening on PORT: " + PORT);
});