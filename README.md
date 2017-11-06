# nlp-hub

**nlp-hub** is a micro-framework that connects you to multiple natural language processing engines such as [LUIS](https://luis.ai), [QnA Maker](https://qnamaker.ai) [Watson](https://www.ibm.com/watson/services/natural-language-understanding/) or even local regular expressions.

**nlp-hub** allows you to build lightweight chatbots aimed for scenarios with minimal context (think: question -> answer). You can use different strategies to reduce processing costs, increase reliability or improve performance, depending on your goals.

## Usage

Set up the JSON definition file. Note that each provider has its own parameters.

```json
{
    "threshold":"0.8",
    "apps":[
        {"id":"HolaRegex", "intent":"Saludo", "exp":"(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)", "type":"regex"},
        {"id":"ComprarVueloRegex", "intent":"ComprarVuelo", "exp":"^Comprar vuelo$", "type":"regex"},
        {"id":"5d90b68...", "key":"3f7eb1b5...", "type":"luis"},
        {"id":"3285f3b...", "key":"3f7eb1b5...", "type":"luis"},
        {"id":"QnA_BOFA_ES", "kb":"055836...", "key":"bdfa0e...", "type":"qnamaker"}
    ]
}
```

Then call the strategy of your choice from your code.

```js
nlp.firstMatch(query, function(response) {
    console.log(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
});
```

## Strategies

### firstMatch

Runs each app syncronously on the JSON definition file and stops after finding the first one that goes over the threshold. Use this strategy for **cost-effectiveness**.

```js
nlp.firstMatch(query, function(response) {
    console.log(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
});
```

### bestMatch

Runs each app on the JSON definition file asynchronously and in parallel, computes and finds the best score. Use this strategy for **reliability**.

```js
nlp.bestMatch(query, function(response) {
    console.log(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
});
```

## Engines

### LUIS

To support LUIS, add an app on the apps.json definition file with the following fields:

+ **id**: LUIS app id
+ **key**: LUIS key
+ **type**: LUIS

```json
[{"id":"5d90b68..", "key":"3f7eb1..", "type":"luis"}]
```

### QnA Maker

To support QnA Maker, add an app on the apps.json definition file with the following fields:

+ **id**: an identification name of your choice (optional)
+ **kb**: the id of your knowledge base
+ **key**: your QnA app's key
+ **type**: qnamaker

```json
[{"id":"QnA_BOFA_ES", "kb":"05583..", "key":"bdfa0ea..", "type":"qnamaker"}]
```

### Regular expressions

To support Regular Expressions, add an app on the apps.json definition file with the following fields:

+ **id**: an identification name of your choice (optional)
+ **intent**: the intent name this regex matches
+ **exp**: the expression to match
+ **type**: regex

```json
[{"id":"HolaRegex", "intent":"Saludo", "exp":"(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)", "type":"regex"},]
```

## Usage with Microsoft Bot Framework

To integrate nlp-hub with Microsoft Bot Framework, you can simply use a root dialog to call nlp.firstMatch or any other strategy of your choice. You could also trigger different dialogs based on the user input if you wanted to.

This is an example of the simplest integration between nlp-hub and Microsoft Bot Framework.

```js
var builder = require('botbuilder');
var nlp = require('../core/core.js');

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
```