## NLP-Hub

Migration to bot framwork v4 (WIP)


Example conf
```
{
    "threshold": "0.8",
    "apps": [
        { "id": "HolaRegex", "intent": "greetings", "exp": "(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)", "type": "regex" },
        { "id": "recommender", "intent": "recommender", "exp": "^Comprar vuelo$", "type": "regex" },
        { "type": "luis", "appId": "APP_ID_204", "key": "SUBS_KEY", "appHost": "http://westus.api.cognitive.microsoft.com" },
        { "type": "rasa", "appHost": "http://localhost:5000" }
    ]
}

```