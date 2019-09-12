import { expect } from 'chai';
import { LuisRecognizer } from '../luis';
import { IRecognizerParams } from '../../../model/app';
import * as Constants from './luis.constants.spec';

import luisMock from './luis.mock';
luisMock(Constants.BASE_PATH);


describe('LuisApp', () => {
    it('Can be instantiated', () => {
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                key: 'APP_KEY',
                appHost: 'LUIS_HOST',
                appId: 'APP_ID'
            }
        }

        const sut: LuisRecognizer = new LuisRecognizer(app);
        expect(sut).to.be.a.instanceOf(LuisRecognizer);
    });

    it('request LUIS with utterace with result code 200', async function() {
/*        nock.recorder.rec({
            output_objects: true,
          });*/
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                key: Constants.SUBSCRIPTION_KEY,
                appHost: Constants.BASE_PATH,
                appId: Constants.APP_ID_CODE_200
            }
        }

        const sut: LuisRecognizer = new LuisRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_200);
        //const nockCallObjects = nock.recorder.play();
        //console.log(JSON.stringify(nockCallObjects));
        // expect(result.response.statusCode).is.equal(200);
        expect(result.engine).is.equal('luis');
        expect(result.intent).is.deep.equal({
            name: "INTENT.200",
            score: 0.92
        });
        expect(result.entities.length).is.equal(0);

    });
    it('request LUIS with utterace with result code 204', async function() {
/*        nock.recorder.rec({
            output_objects: true,
          });*/
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                key: Constants.SUBSCRIPTION_KEY,
                appHost: Constants.BASE_PATH,
                appId: Constants.APP_ID_CODE_204
            }
        }

        const sut: LuisRecognizer = new LuisRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_204);
        //const nockCallObjects = nock.recorder.play();
        //console.log(JSON.stringify(nockCallObjects));
        // expect(result.response.statusCode).is.equal(200);
        expect(result.engine).is.equal('luis');
        expect(result.intent).is.deep.equal({
            name: "INTENT.204",
            score: 0.2
        });
        expect(result.entities.length).is.equal(0);

    });

});
