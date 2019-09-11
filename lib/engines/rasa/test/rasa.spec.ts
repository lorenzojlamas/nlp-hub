import { expect } from 'chai';
import { RasaRecognizer } from '../rasa';
import { IRecognizerParams } from '../../../model/app';
import * as Constants from './rasa.constants.spec';

import rasaMock from './rasa.mock';
rasaMock(Constants.BASE_PATH);

describe('RasaApp', () => {

    it('Can be instantiated', () => {
        const app: IRecognizerParams = {
            id: 'rasa-1',
            type: 'rasa',
            appHost: 'RASA_HOST',
        }

        const sut: RasaRecognizer = new RasaRecognizer(app);
        expect(sut).to.be.a.instanceOf(RasaRecognizer);
    });
    it('request RASA with utterace with result code 200', async () => {
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            key: Constants.SUBSCRIPTION_KEY,
            appHost: Constants.BASE_PATH,
            appId: Constants.APP_ID_CODE_200,
            exp: ''
        }

        const sut: LuisApp = new LuisApp(app);
        const result = await sut.recognice(Constants.QUERY_200);
    });
});
