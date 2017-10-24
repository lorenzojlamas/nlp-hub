var https = require('https');

//to-do: get threshold on set up
let threshold = 0.5;

module.exports = {

    firstMatch: function(utterance) {
        queryLUIS('tuvieja', 'tuhermana');
    },

    firstMatch2: function(utterance) {
        var apps = getApps();
        let firstMatch = null;

        for(i = 0; i < apps.length; i++) {
            var r = process(apps[i]);
            
            if(r.intent.score >= threshold) {
                firstMatch = r;
                break;
            }
        }

        return firstMatch; // no matches above threshold
    },

    bestMatch: function(utterance) {
        var apps = getApps();
        let bestScore = 0;
        let bestResult;

        for(i = 0; i < apps.length; i++) {
            var r = process(apps[i]);

            if(r.score > bestScore) {
                bestScore = r.score;
                bestResult = r;
            }
        }

        return bestResult; // to-do: define, keep an eye on the threshold?
    },

    average: function(utterance) {
        // to-do
        return _luis();
    }
}

function getApps() {
    return [{'appId':'firstAppId', 'appKey':'firstAppKey'}, {'appId':'secondAppId', 'appKey':'secondAppKey'}];
}

function process(app) {
    // only for LUIS for now..
    return _luis();
}

// 1. Get LUIS account credentials
// 2. Define strategy (for now, first match)
// 3. Hit each endpoint
// 4. Create results and return
function _luis() {
    var appId = '';
    var appKey = '';

    var luisResponse = queryLUIS(appId, appKey);
    
    let intent = {};
    intent.name = luisResponse.topScoringIntent.intent;
    intent.score = luisResponse.topScoringIntent.score;

    var myResponse = {};
    myResponse.intent = intent;

    myResponse.entities = [];
    luisResponse.entities.forEach(function(e, i) {
        let entity = {};
        entity.value = e.entity;
        entity.type = e.type;
        entity.score = e.score;

        myResponse.entities[i] = entity;
    }, this);
    
    return myResponse;
}

// This is a mock
function _queryLUIS(appId, appKey) {
    var response = 
    {
        "query": "turn the right light on",
        "topScoringIntent": {
          "intent": "TurnOn",
          "score": 0.900771737
        },
        "entities": [
          {
            "entity": "right",
            "type": "Light",
            "startIndex": 9,
            "endIndex": 13,
            "resolution": null,
            "score": 0.8766971
          }
        ]
    };

    return response;
}

function queryLUIS(appId, appKey){
    var options = {
        host: 'westus.api.cognitive.microsoft.com',
        port: 443,
        path: '/luis/v2.0/apps/5d90b685-da5e-4b3a-8e63-8c632c5610d1?subscription-key=3f7eb1b5610e4641912bb4c6019070cf&timezoneOffset=0&verbose=true&q=vuelos%20de%20SEA%20a%20MIA',
        method: 'GET'
    };
      
    var req = https.request(options, function(res) {

        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
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