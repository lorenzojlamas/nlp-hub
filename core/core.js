var async = require('async');
var luis = require('../engines/luis.js');
var regex = require('../engines/regex.js');
var appReader = require('../helpers/apps.js');

//to-do: get threshold on set up
let threshold = 0.8;

module.exports = {

    firstMatch: function(utterance, callback) {
        var apps = appReader.getApps();
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
        var apps = appReader.getApps();
        var results = [];

        async.each(apps, function (app, callback) {
            process(app, utterance, function(response) {
                results.push(response);
                callback(null);
            });  
        }, function done() {
            var bestResult = null;
            async.eachSeries(results, function(r, callback) {
                if(bestResult == null || r.intent.score > bestResult.intent.score) {
                    bestResult = r;
                }
                callback(null); // this means continue
            }, function done() {
                callback(bestResult);
            })
        });
    },

    average: function(utterance) {
        console.log('to-do');
    },

    regressionMatch: function(utterance) {
        console.log('to-do');
    }
}

function process(app, utterance, callback) {
    // to-do: switch-case according to engine. only for LUIS for now..
    if(app.type == 'luis')
        luis._luis(app.id, app.key, utterance, callback, function(res){
            callback(res);
        });
    if(app.type == 'regex')
        regex._regex(app, utterance, callback, function(r){
            callback(r);
        })
    else 
        return null; // or default
}