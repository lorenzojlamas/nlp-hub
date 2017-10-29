var async = require('async');
var luis = require('../engines/luis.js');

//to-do: get threshold on set up
let threshold = 0.8;

module.exports = {

    firstMatch: function(utterance, callback) {
        var apps = getApps();
        var returnValue = null;

        async.eachSeries(apps, function (app, callback) {
            process(app, utterance, function(response) {
                if(response.intent.score > threshold) {
                    returnValue = response;
                    callback('break'); // this means break
                }
                else {
                    callback(null); // this means continue
                }
            });  
        }, function done() {
            callback(returnValue);
        });
    },

    bestMatch: function(utterance, callback) {
        var apps = getApps();
        var results = [];

        async.each(apps, function (app, callback) {
            process(app, utterance, function(response) {
                results.push(response);
                callback(null);
            });  
        }, function done() {
            // to-do: extract result from results[] with highest score
        });
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