import request = require('request');
import { ILuisRecognizer, IRecognizerIntent, IRecognizerParams, IRecognizerResponse } from '../../model/recognizers';
import { EngineRecognizer } from '../engine';

export class LuisRecognizer extends EngineRecognizer {

    public baseUri: string;
    public baseQueryString: any;
    constructor(recognizerParams: IRecognizerParams) {
        super();
        const params = recognizerParams.params as ILuisRecognizer;
        this.baseUri = `${params.appHost}/luis/v2.0/apps/${params.appId}`;
        this.baseQueryString = {
            'q': '',
            'subscription-key': params.key,
            'timezoneOffset': 0,
            'verbose': true,
        };
        this._id = recognizerParams.id;
    }

    // TODO: Revisar el tipo de promesa retornada { response: http.IncomingMessage; body: any; }
    public async recognice(utterance: string): Promise<IRecognizerResponse> {
        return new Promise((resolve, reject) => {
            const queryString = this.baseQueryString;
            queryString.q = utterance;
            const options: request.Options = {
                method: 'GET',
                qs: queryString,
                uri: `${this.baseUri}`,
            };
            request(options, (error, response, body) => {
                try {
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
                            const myResponse: IRecognizerResponse = {
                                engine: 'luis',
                                entities: bodyObject.entities,
                                id: this._id,
                                intent,
                                originalResponse: body,
                            };
                            resolve(myResponse);
                        } else {
                            reject(new Error( JSON.stringify({ response, body })));
                        }
                    }
                } catch (error) {
                    reject(error);
                }
                });

        }) ;
    }
}
