import http = require('http');
import localVarRequest = require('request');
import { IApp, IAppResponse } from '../../model/app';
import { IEntity, IIntent, ILuisResponse } from '../../model/luis-response';
export class LuisApp {

    public async luis(app: IApp, utterance: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const options: localVarRequest.Options = {
                method: 'GET',
                uri: `${app.appHost}/luis/v2.0/apps/${app.id}?subscription-key=${app.key}&timezoneOffset=0&verbose=true&q=${encodeURIComponent(utterance)}`,
            };

            // tslint:disable-next-line:no-unused-expression
            new Promise<{ response: http.IncomingMessage; body: ILuisResponse; }>((resolve: any, reject: any) => {
                localVarRequest(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {

                            /* TODO: Tipar */
                            const intent: IIntent = {
                                intent: body.topScoringIntent.intent,
                                score: body.topScoringIntent.score,
                            };
                            /* TODO: Hacer un tipo */
                            const myResponse: IAppResponse = {
                                engine: 'luis',
                                entities: [],
                                intent,
                                originalResponse: body,
                            };
                            body.entities.forEach((e: IEntity) => {
                                myResponse.entities.push({
                                    score: e.score,
                                    type: e.type,
                                    value: e.entity,
                                });
                            });
                            resolve({ response, body: myResponse });
                        } else {
                            reject({ response, body });
                        }
                    }
                });
            });
        }) ;
    }
}
