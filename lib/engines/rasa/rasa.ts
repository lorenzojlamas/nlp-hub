import http = require('http');
import localVarRequest = require('request');
import { IRecognizerParams, IRecognizerResponse, IRecognizerIntent } from '../../model/app';
import { IEntitYRasa } from '../../model/rasa-response';
import { EngineRecognizer } from '../engine';
export class RasaRecognizer extends EngineRecognizer{

    _options: localVarRequest.Options;
    _id: string;

    constructor(app: IRecognizerParams) {
        super();
        this._options = {
            body: {
                q: '',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            json: true,
            url: `${app.appHost}/parse`,
        };
        this._id = app.id;
    }

    public async recognice(utterance: string): Promise<IRecognizerResponse> {
            
        let options = this._options;
        options.body.q = utterance;
        return new Promise<IRecognizerResponse>((resolve: any, reject: any) => {
            try {
                localVarRequest(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = JSON.parse(body);
                            const intent: IRecognizerIntent = {
                                name: body.intent.name,
                                score: body.intent.score,
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
                });
            } catch (error) {
                reject(error)
            }
        });
    }
}
