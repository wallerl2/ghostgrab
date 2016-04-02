var http = require('http');
var dispatcher = require('httpdispatcher');

const PORT=8080;

var ghosts = [
    {type_id: 996, instance_id: 555, owner_id: 111, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 997, instance_id: 556, owner_id: 112, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 998, instance_id: 557, owner_id: 113, location_x: 555.5555555, location_y: 555.5555555},
    {type_id: 999, instance_id: 558, owner_id: 114, location_x: 555.5555555, location_y: 555.5555555}
];

function generate() {
    //...Switch out ghosts array
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


// a sample GET request
dispatcher.onGet("/reset", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
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