var n = require('./core.js');

var query = 'Comprar vuelos de SEA a MIA';

// First match: most cost-effective solution
n.firstMatch(query, function(response) {
    console.log(response);
});

// Best match: most reliable solution
n.bestMatch(query, function(response){
    console.log(response);
});

// Average match: most conservative solution
n.average(query, function(response){
    console.log(response);
});

// Regression match: most sophisticated solution
n.regressionMatch(query, function(response){
    console.log(response);
});