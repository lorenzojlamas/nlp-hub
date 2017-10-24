//to-do: get threshold on set up
let threshold = 0.5;

module.exports = {
    firstMatch: function(utterance) {
        var apps = getApps();
        
        apps.forEach(function(app) {
            var r = app.process();

            if(r.score >= threshold) {
                return r;
            }
        }, this);

        return null; // no matches above threshold
    },

    bestMatch: function(utterance) {
        var apps = getApps();
        let bestScore = 0;
        let bestResult;

        apps.forEach(function(app) {
            var r = app.process();

            if(r.score > bestScore) {
                bestScore = r.score;
                bestResult = r;
            }
        }, this);

        return bestResult; // to-do: define, keep an eye on the threshold?
    },

    average: function(utterance) {
        // to-do
        return _luis();
    }
}

// 1. Get LUIS account credentials
// 2. Define strategy (for now, first match)
// 3. Hit each endpoint
// 4. Create results and return
function _luis() {
    var appId = '';
    var appKey = '';

    var luisResponse = hitLUIS(appId, appKey);
    
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
function queryLUIS(appId, appKey) {
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