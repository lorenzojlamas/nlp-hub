import localVarRequest = require('request');
import http = require('http');
import { IApp } from '../model/app';
export class LuisApp {

    public async luis(app: IApp, utterance: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const options:  localVarRequest.Options = {
                method: 'GET',
                uri: `${app.appHost}/luis/v2.0/apps/${app.id}?subscription-key=${app.key}&timezoneOffset=0&verbose=true&q=${encodeURIComponent(utterance)}`,
            };

            new Promise<{ response: http.IncomingMessage; body: any; }>((resolve, reject) => {
                localVarRequest(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {

                            /* TODO: Tipar */
                            const intent: any = {
                                intent: body.topScoringIntent.intent,
                                score: body.topScoringIntent.score,
                            };
                            /* TODO: Hacer un tipo */
                            const myResponse: any = {
                                engine: 'luis',
                                entities: [],
                                intent,
                                originalResponse: body,
                            };
                            body.entities.forEach((e: any) => {
                                myResponse.entities.push({
                                    score: e.score,
                                    type: e.type,
                                    value: e.entity,
                                });
                            });
                            resolve({ response: response, body: myResponse });
                        } else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        }) ;
    }
}
