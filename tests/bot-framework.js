var builder = require('botbuilder');
var nlp = require('../index.js');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

nlp.load('../apps.json');

bot.dialog('/', [
    function (session) {
        nlp.firstMatch(session.message.text, function(response) {
            session.send(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
        });
    }
]);