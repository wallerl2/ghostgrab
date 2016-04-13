var http = require('http');
var dispatcher = require('httpdispatcher');

const PORT=8080;

var milesPerDegreeLatitudeInFeet = 364560;
//how far to move the ghost in feet upon failed capture
var constB = 2640, constA = 500;

/* HELPER FUNCTIONS */
function feetToDMSLatitude(feet){ return feet/milesPerDegreeLatitudeInFeet; }
function latitudeToFeet(latitudeInDMS){ return latitudeInDMS * milesPerDegreeLatitudeInFeet; }

var ghosts = [
    {type_id: 996, instance_id: 555, owner_id: 111, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 997, instance_id: 556, owner_id: 112, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 998, instance_id: 557, owner_id: 113, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 999, instance_id: 558, owner_id: 114, location_x: 555.5555555, location_y: 555.5555555}
];

function generate() {
    //...Switch out ghosts array
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

var leaderboard = [
    {owner_id: 111, score: 50},
    {owner_id: 112, score: 55},
    {owner_id: 113, score: 60}
];

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