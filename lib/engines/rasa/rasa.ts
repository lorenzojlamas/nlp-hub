// import http = require('http');
// import localVarRequest = require('request');
import request = require('request');
import { IRecognizerParams, IRecognizerResponse, IRecognizerIntent, IRasaRecognizer } from '../../model/app';
import { IEntitYRasa } from '../../model/rasa-response';
import { EngineRecognizer } from '../engine';
export class RasaRecognizer extends EngineRecognizer{

    _options: any;// localVarRequest.Options;
    _baseUri: string;

    constructor(app: IRecognizerParams) {
        super();
        const params = app.params as IRasaRecognizer;
        this._baseUri = `${params.appHost}/parse`;
        this._options = {
            uri: this._baseUri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                q: ''
            }
        }
        this._id = app.id;
    }

    public async recognice(utterance: string): Promise<IRecognizerResponse> {
            
        let options = this._options;
        options.body.q = utterance;
        return new Promise<IRecognizerResponse>((resolve: any, reject: any) => {
            request(options, (error: Error, response: any, body:any) => {
                try {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {

                            const intent: IRecognizerIntent = {
                                name: body.intent.name,
                                score: body.intent.confidence,
                            };
                            const myResponse: IRecognizerResponse = {
                                id: this._id,
                                engine: 'rasa',
                                entities: [],
                                intent,
                                originalResponse: body,
                            };
                            body.entities.forEach((e: IEntitYRasa) => {
                                myResponse.entities.push({
                                    score: e.confidence,
                                    type: e.entity,
                                    value: e.value,
                                });
                            });
                            resolve(myResponse);
                        } else {
                             reject(new Error(JSON.stringify({ response, body })));
                        }
                    }
                } catch (error) {
                    reject(error)
                }
            });
        });
    }
}
