var http = require('http');
var dispatcher = require('httpdispatcher');

const PORT=8080;

var milesPerDegreeLatitudeInFeet = 364560;
//how far to move the ghost in feet upon failed capture
var constB = 2640, constA = 500;

/* HELPER FUNCTIONS */
function feetToDMSLatitude(feet){ return feet/milesPerDegreeLatitudeInFeet; }
function latitudeToFeet(latitudeInDMS){ return latitudeInDMS * milesPerDegreeLatitudeInFeet; }

//array that contains all of the ghost types and info
var ghostTypes = [
    {name: "Smitty Werbenmanjensen", type_id: 996, power: 100, flavor_text: "He was number 1", catch_rate: 10},
    {name: "Copyright Infringement", type_id: 997, power: 90, flavor_text: "It's GENGAaah, never mind", catch_rate: 20},
    {name: "John Cena-fterlife", type_id: 998, power: 80, flavor_text: "Da dah dawh dah!!!", catch_rate: 30},
    {name: "Oozi", type_id: 999, power: 70, flavor_text: "His 9x19mm parabellum slime is sure to ruin your day", catch_rate: 40},
    {name: "Haunt Solo", type_id: 1000, power: 60, flavor_text: "Spoiler Alert...he's dead.", catch_rate: 50},
    {name: "Retro Spook", type_id: 1001, power: 50, flavor_text: "Shy and doesn't like to be looked at", catch_rate: 60},
    {name: "Haunted Rock", type_id: 1002, power: 40, flavor_text: "Totally haunted, I swear.", catch_rate: 70},
    {name: "The Stay-Buf'd Marshmallow Man", type_id: 1003, power: 30, flavor_text: "His muscles have muscles!", catch_rate: 80},
    {name: "Windows ME", type_id: 1004, power: 20, flavor_text: "Rest in peace.", catch_rate: 90},
    {name: "Livingstone's Reanimated Corpse", type_id: 1005, power: 10, flavor_text: "Dr. Livingstone's bones, I presume?", catch_rate: 95},
    {name: "Last Night's Leftovers", type_id: 1006, power: 5, flavor_text: "This gruel is grueling.", catch_rate: 99},
    {name: "Route 66 Roadkill", type_id: 1006, power: 1, flavor_text: "Flatter than the Arizona desert and just as dehydrated.", catch_rate: 100}
];

//initial array of ghosts
var ghosts = [
    {type_id: 996, instance_id: 555, owner_id: undefined, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 997, instance_id: 556, owner_id: undefined, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 998, instance_id: 557, owner_id: undefined, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 999, instance_id: 558, owner_id: undefined, location_x: 555.5555555, location_y: 555.5555555}
];

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

// test server
dispatcher.onGet("/test", function(req, res) {
	res.end("wow it works!");
});

//call this to add a user
dispatcher.onPost("/addUser", function(req, res){
    myMap.set(req.name, 0); //add pair <name, 0> to the map
    res.end(req.name + " successfully added with 0 ghosts caught");
});

//call this to indicate a ghost caught
dispatcher.onPost("/catchGhost", function(req, res){
    var ghostCatcherName = req.name;
    var currentGhostCatcherPower = myMap.get(ghostCatcherName);
    var ghostCaught = req.ghostName;

    for(var ghost in ghosts){
        if(ghost.name === ghostCaught) {
            myMap.set(ghostCatcherName, ghost.power + currentGhostCatcherPower);
            break;
        }
    }
});

// a sample GET request
dispatcher.onGet("/reset", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Wow it actually works.');
});

// add a ghost
dispatcher.onPost("/add", function(req, res) {
    ghosts.push(req.body);
    console.log("test");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

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

// update leaderboard
dispatcher.onPost("/update", function(req, res) {
    for (var i = 0; i < leaderboard.length; ++i) {
        if(leaderboard[i] === req.body.owner_id) {
            leaderboard[i].score = req.body.score;
        }
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

// create a server
var server = http.createServer(handleRequest);

// start the server
server.listen(PORT, function(){
    console.log("Server listening...");
});