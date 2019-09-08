import { expect } from 'chai';
import { LuisApp } from '../luis';
import { IApp } from '../../../model/app';
import * as Constants from './luis.constants.spec';
//import nock = require('nock');

import luisMock from './luis.mock';
luisMock(Constants.BASE_PATH);


describe('LuisApp', () => {
    it('Can be instantiated', () => {
        const app: IApp = {
            id: 'ID',
            type: 'luis',
            key: 'APP_KEY',
            appHost: 'LUIS_HOST',
            appId: 'APP_ID',
            exp: ''
        }

        const sut: LuisApp = new LuisApp(app);
        expect(sut).to.be.a.instanceOf(LuisApp);
    });

    it('request LUIS with utterace with result code 200', async function() {
/*        nock.recorder.rec({
            output_objects: true,
          });*/
        const app: IApp = {
            id: 'ID',
            type: 'luis',
            key: Constants.SUBSCRIPTION_KEY,
            appHost: Constants.BASE_PATH,
            appId: Constants.APP_ID_CODE_200,
            exp: ''
        }

        const sut: LuisApp = new LuisApp(app);
        const result = await sut.luis(Constants.QUERY_200);
        //const nockCallObjects = nock.recorder.play();
        //console.log(JSON.stringify(nockCallObjects));
        expect(result.response.statusCode).is.equal(200);
        expect(result.body.engine).is.equal('luis');
        expect(result.body.intent).is.deep.equal(Constants.INTENT_200);
        expect(result.body.entities.length).is.equal(0);

    });

});
