function _queryLUIS(appId, appKey) {
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