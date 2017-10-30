# nlp-hub

**nlp-hub** is a micro-framework that connects you to multiple natural language processing engines such as [LUIS](https://luis.ai), [QnA Maker](https://qnamaker.ai) or [Watson](https://www.ibm.com/watson/services/natural-language-understanding/).

**nlp-hub** allows you to build lightweight chatbots aimed for scenarios with minimal context (think: question -> answer). You can use different strategies to reduce processing costs, increase reliability or improve performance, depending on your goals.

## Usage

Set up the JSON definition file.

```json
[
{"id":"ComprarVueloRegex", "intent":"ComprarVuelo", "exp":"^Comprar vuelo$", "type":"regex"},
{"id":"5d90b68..", "key":"3f7eb1..", "type":"luis"},
{"id":"3285f3b..", "key":"3f7eb1..", "type":"luis"}
]
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

Runs each app on the JSON definition file asynchronously and in parallel, computes and finds the best score. use this strategy for **reliability**.

```js
nlp.bestMatch(query, function(response) {
    console.log(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
});
```