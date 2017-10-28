var https = require('https');
var async = require('async');

//to-do: get threshold on set up
let threshold = 0.5;

module.exports = {

    firstMatch: function(utterance, callback) {
        var apps = getApps();
        let i = 0;

        async.eachSeries(apps, function (app, callback) {
            process(app, function(response) {
                if(response.intent.score > threshold) {
                    callback(response); // this is like doing next();
                }
            })  
        }, function done(r) {
            callback(r);
        });
    },

    bestMatch: function(utterance) {
        console.log('to-do');
    },

    average: function(utterance) {
        console.log('to-do');
    },

    regressionMatch: function(utterance) {
        console.log('to-do');
    }
}

// to-do
function getApps() {
    return [{'id':'5d90b685-da5e-4b3a-8e63-8c632c5610d1', 'key':'3f7eb1b5610e4641912bb4c6019070cf', 'type':'luis'}, 
            {'id':'3285f3bd-cbf0-472f-a838-6d6349d1f186', 'key':'3f7eb1b5610e4641912bb4c6019070cf', 'type':'luis'}];
}

function process(app, callback) {
    // only for LUIS for now..
    // to-do: switch-case according to engine
    if(app.type == 'luis')
        _luis(app.id, app.key, callback, function(res){
            callback(res);
        });
    else 
        return null; // or default
}

function _luis(appId, appKey, callback) {

    var options = {
        host: 'westus.api.cognitive.microsoft.com',
        port: 443,
        path: `/luis/v2.0/apps/${appId}?subscription-key=${appKey}&timezoneOffset=0&verbose=true&q=vuelos%20de%20SEA%20a%20MIA`,
        method: 'GET'
    };
      
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            var luisResponse = JSON.parse(chunk.toString());
            
            let intent = {};
            intent.name = luisResponse.topScoringIntent.intent;
            intent.score = luisResponse.topScoringIntent.score;
        
            var myResponse = {};
            myResponse.engine = 'luis';
            myResponse.intent = intent;
        
            myResponse.entities = [];
            luisResponse.entities.forEach(function(e, i) {
                let entity = {};
                entity.value = e.entity;
                entity.type = e.type;
                entity.score = e.score;
        
                myResponse.entities[i] = entity;
            }, this);
            
            callback(myResponse);
        });
    });
      
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();
}

//
// Other providers
//

function _qnaMaker() {
    return null;
}

function _watson() {
    return null;
}

function _api() {
    return null;
}

function _wit() {
    return null;
}

// add your provider here
function _yourprovider() {
    return null;
}