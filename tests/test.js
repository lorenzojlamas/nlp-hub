var nlp = require('../core/core.js');

var query = 'Cuánto salen los depósitos?';

// First match: most cost-effective solution
nlp.firstMatch(query, function(response) {
    console.log(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
});

// Best match: most reliable solution
nlp.bestMatch(query, function(response){
    console.log(`The best detected intent was ${response.intent.name} according to ${response.engine}`);    
});

// Average match: most conservative solution
nlp.average(query, function(response){
    // to-do
});

// Regression match: most sophisticated solution
nlp.regressionMatch(query, function(response){
    // to-do
});