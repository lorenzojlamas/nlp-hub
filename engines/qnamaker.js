var https = require('https');

module.exports = {
    _qnaMaker: function(app, utterance, callback) {
        var data = {question : utterance};

        var options = {
            host: 'westus.api.cognitive.microsoft.com',
            port: 443,
            path: `/qnamaker/v2.0/knowledgebases/${app.kb}/generateAnswer`,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key':`${app.key}`,
                'Content-Type':'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(data))
            }
        };
            
        var req = https.request(options, function(res) {
            res.on('data', function (chunk) {
                var serviceResponse = JSON.parse(chunk.toString());
                
                let intent = {};
                intent.name = 'QnA-Answer';

                if(serviceResponse.answers != null && serviceResponse.answers.length > 0)
                    intent.score = serviceResponse.answers[0].score; // highest-ranking score
                else
                    intent.score = 0;
            
                var myResponse = {};
                myResponse.engine = 'qnamaker';
                myResponse.intent = intent;
                myResponse.answer = serviceResponse.answer;

                myResponse.originalResponse = serviceResponse;
                
                callback(myResponse);
            });
        });
            
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        req.write(JSON.stringify(data));
        req.end();
    }
}