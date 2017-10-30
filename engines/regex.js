//here: to implement local regex processing

module.exports = {
    _regex: function(app, utterance, callback) {
        var regExp = new RegExp(app.exp, 'i');
        var match = utterance.match(regExp);

        var r = regexResponse(app, match);
        callback(r);
    }
}

function regexResponse(app, match) {
    var r = {};
    r.engine = 'regex';
    r.intent = {};
    r.intent.name = app.intent;
    r.intent.score = match != null ? 1 : 0;

    return r;
}