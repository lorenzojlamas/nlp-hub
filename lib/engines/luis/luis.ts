import request = require('request');
// import http = require('http');
import { IRecognizerParams, IRecognizerResponse, IRecognizerIntent, ILuisRecognizer } from '../../model/app';
import { IIntentLuis } from '../../model/luis-response';
import { EngineRecognizer } from '../engine';
// import { IEntity, ILuisResponse } from '../../model/luis-response';


export class LuisRecognizer extends EngineRecognizer{

    _baseUri: string;
    _baseQueryString: any;
    _id: string;
    constructor(app: IRecognizerParams) {
        super();
        const params= app.params as ILuisRecognizer
        this._baseUri = `${params.appHost}/luis/v2.0/apps/${params.appId}`;
        this._baseQueryString = {
            'subscription-key': params.key,
            timezoneOffset: 0,
            verbose: true,
            q: ''
        }
        this._id = app.id;
    }

    // TODO: Revisar el tipo de promesa retornada { response: http.IncomingMessage; body: any; }
    public async recognice(utterance: string): Promise<IRecognizerResponse> {
        return new Promise((resolve, reject) => {
            const queryString = this._baseQueryString;
            queryString.q = utterance;
            const options:  request.Options = {
                method: 'GET',
                uri: `${this._baseUri}`,
                qs: queryString
            };
            try {
                request(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && 
                            response.statusCode >= 200 && response.statusCode <= 299) {
                            const bodyObject = JSON.parse(body);
                            const intent: IRecognizerIntent = {
                                name: bodyObject.topScoringIntent.intent,
                                score: bodyObject.topScoringIntent.score,
                            };
                            /* TODO: Hacer un tipo */
                            const myResponse: IRecognizerResponse = {
                                id: this._id,
                                engine: 'luis',
                                intent: intent,
                                entities: bodyObject.entities,
                                originalResponse: body,
                            };
                            resolve(myResponse);
                        } else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            } catch (error) {
                reject(error)
            }
            
        }) ;
    }
}
