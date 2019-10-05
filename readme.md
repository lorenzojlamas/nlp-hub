## NLP-Hub
[![Build Status](https://travis-ci.org/lorenzojlamas/nlp-hub-v4.svg?branch=master)](https://travis-ci.org/lorenzojlamas/nlp-hub-v4)
[![NPM](https://badgen.net/npm/v/nlp-hub-v4)](https://www.npmjs.com/package/nlp-hub-v4)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=lorenzojlamas_nlp-hub-v4&metric=coverage)](https://sonarcloud.io/dashboard?id=lorenzojlamas_nlp-hub-v4)

This is a library to connect different recognizers to a bot, currently supports:
- Regex
- Luis
- Rasa

By now, the only strategy supported is that of firsMatch, it goes through the configured recognizers and when the first one passes a certain threshold it returns the common data structure of the response. You must configure a default response as detailed in the example. This library is an open source and anyone who wants to participate will be welcome.

Use example:
```Typescript
const configuration: INlpHubConfiguration = {
    threshold: 0.83,
    recognizers: [
        {
            id: "HolaRegex",
            type: "regex",
            params: {
                intent: "greetings",
                exp: "(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)"
            }
        },
        {
            id: "recommender",
            type: "regex" ,
            params: {
                intent: "recommender",
                exp: "^Comprar vuelo$"
            }
        },
        {
            id: "Luis-1",
            type: "luis",
            params: {
                "appId": "APP_ID",
                "key": "SUBS_KEY",
                "appHost": "http://westus.api.cognitive.microsoft.com" }
        },
        {
            id: "Rasa-1",
            type: "rasa",
            params: {
                appHost: "http://RASA_HOST" 
            }
        },
        {
            id: "default-1",
            type:"default" ,
            params: {
                intent: "NoneDialog"
            }
        }
    ]
  };

const nlpHub: NlpHub = new NlpHub(configuration);
const utterance: string = 'Hola';
const response: any = await nlpHub.firstMatch(utterance);
```