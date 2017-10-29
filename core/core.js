var async = require('async');
var luis = require('../engines/luis.js');

//to-do: get threshold on set up
let threshold = 0.5;

module.exports = {

    firstMatch: function(utterance, callback) {
        var apps = getApps();
        let i = 0;

        async.eachSeries(apps, function (app, callback) {
            process(app, utterance, function(response) {
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

// to-do: populate apps from json definition file
function getApps() {
    return [{'id':'5d90b685-da5e-4b3a-8e63-8c632c5610d1', 'key':'3f7eb1b5610e4641912bb4c6019070cf', 'type':'luis'}, 
            {'id':'3285f3bd-cbf0-472f-a838-6d6349d1f186', 'key':'3f7eb1b5610e4641912bb4c6019070cf', 'type':'luis'}];
}

function process(app, utterance, callback) {
    // only for LUIS for now..
    // to-do: switch-case according to engine
    if(app.type == 'luis')
        luis._luis(app.id, app.key, utterance, callback, function(res){
            callback(res);
        });
    else 
        return null; // or default
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