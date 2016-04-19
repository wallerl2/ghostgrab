"use strict"

var http = require('http');
var dispatcher = require('httpdispatcher');

var PORT=5001;

var milesPerDegreeLatitudeInFeet = 364560;

//how far to move the ghost in feet upon failed capture
var constB = 2640, constA = 500;

/* HELPER FUNCTIONS */
function feetToDMSLatitude(feet){ return feet/milesPerDegreeLatitudeInFeet; }
function latitudeToFeet(latitudeInDMS){ return latitudeInDMS * milesPerDegreeLatitudeInFeet; }

// array of ghosts
var ghosts = [
    {"type_id": 1, "location_x": 555.5555555, "location_y": 555.5555555},
    {"type_id": 2, "location_x": 555.5555555, "location_y": 555.5555555},
    {"type_id": 3, "location_x": 555.5555555, "location_y": 555.5555555},
    {"type_id": 4, "location_x": 555.5555555, "location_y": 555.5555555}
];

/**
var userLastKnownLocations = [
];

//return a random ghost to spawn
function randomGhost(){
    return ghostTypes[(Math.random() * (ghostTypes.length - 1) + 1)];
}

//this function moves around the ghosts
function generate() {
    for (var ghost in ghosts){
        if(ghost.owner_id !== undefined){
            ghost = {};
        }
        else{
            moveGhost(ghost.type_id, ghost.instance_id);
        }
    }
    for (var loc in userLastKnownLocations){
        var ghostTyp = randomGhost(); //generate a random ghost type
        ghosts.push();
        moveGhost(ghost_type_id, ghost_instance_id)
    }
}

//Reset ghost location to random location within B = 1/2 mile (2640 ft) but not within A = 500 ft
function moveGhost(ghost_type_id, ghost_instance_id){
    for (var ghost in ghosts){
        if((ghost.type_id === ghost_type_id)&&(ghost.instance_id === ghost_instance_id)){
            ghost.location_x = feetToDMSLatitude(Math.random() * (constB - constA) + constA);
            ghost.location_y = feetToDMSLatitude(Math.random() * (constB - constA) + constA);
        }
    }
}

*/

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
    topTenNamesAndScores.sort();

	console.log("Dispatching the following scores: " + JSON.stringify(topTenNamesAndScores.slice(0,9)));

    // send the top 10 users to client
    res.end(JSON.stringify(topTenNamesAndScores.slice(0,9)));
});

// call this to indicate a ghost caught
dispatcher.onPost("/catchghost", function(req, res){
    var ghostCatcherName = JSON.parse(req.body).name;
    var currentGhostCatcherPower = myMap.get(ghostCatcherName);
    var ghostCaught = JSON.parse(req.body).ghostName;

    for(var ghost in ghosts){
        if(ghost.name === ghostCaught) {
            myMap.set(ghostCatcherName, ghost.power + currentGhostCatcherPower);
            break;
        }
    }
});

//invoke this post to get an array of the current ghost locations
dispatcher.onGet("/getupdatedghosts", function(req, res){
    res.end(JSON.stringify(ghosts));
});

/**
// add a ghost
dispatcher.onPost("/add", function(req, res) {
    ghosts.push(req.body);
    console.log("test");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});
*/
 
// remove a ghost
dispatcher.onPost("/remove", function(req, res) {
    for (var i = 0; i < ghosts.length; ++i) {
        if(ghosts[i] === req.body) {
            ghosts[i].pop();
        }
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

/**
// move a ghost that was not successfully captured
dispatcher.onPost("/move", function(req, res) {
    for (var i = 0; i < ghosts.length; ++i) {
        if(ghosts[i] === req.body) {
            moveGhost(ghosts[i].type_id, ghost[i].instance_id);
        }
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Ghost moved to new location');
});
 */

// create server
var server = http.createServer(handleRequest);

// start server
server.listen(PORT, function(){
    console.log("Server listening on PORT: " + PORT);
});