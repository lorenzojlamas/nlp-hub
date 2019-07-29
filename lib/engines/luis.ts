import * as https from 'https';
import { IApp } from '../model/app';
export class LuisApp {

    public async luis(app: IApp, utterance: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                host: app.appHost,
                method: 'GET',
                path: `/luis/v2.0/apps/${app.id}?subscription-key=${app.key}&timezoneOffset=0&verbose=true&q=${encodeURIComponent(utterance)}`,
            };
            const req = https.request(options, (res: any) => {
                res.on('data', (chunk: any) => {
                    const luisResponse = JSON.parse(chunk.toString());
                    const intent: any = {
                        intent: luisResponse.topScoringIntent.intent,
                        score: luisResponse.topScoringIntent.score,
                    };

                    const myResponse: any = {
                        engine: 'luis',
                        entities: [],
                        intent,
                        originalResponse: luisResponse,
                    };
                    luisResponse.entities.forEach((e: any) => {
                        myResponse.entities.push({
                            score: e.score,
                            type: e.type,
                            value: e.entity,
                        });
                    });
                    resolve(myResponse);
                });
            });
            req.on('error', (e: any) => {
                console.log('problem with request: ' + e.message);
            });
            // write data to request body
            req.write('data\n');
            req.write('data\n');
            req.end();
        }) ;
    }
}
