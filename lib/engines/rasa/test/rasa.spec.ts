import { expect } from 'chai';
import { RasaRecognizer } from '../rasa';
import { IRecognizerParams } from '../../../model/recognizers';
import * as Constants from './rasa.constants.spec';

import rasaMock from './rasa.mock';
rasaMock(Constants.BASE_PATH);

describe('RasaApp', () => {

    it('Can be instantiated', () => {
        const app: IRecognizerParams = {
            id: 'rasa-1',
            type: 'rasa',
            params: {
                appHost: Constants.BASE_PATH
            }
        }

        const sut: RasaRecognizer = new RasaRecognizer(app);
        expect(sut).to.be.a.instanceOf(RasaRecognizer);
    });

    it('request RASA with utterace with result in request error', async () => {
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                appHost: Constants.BASE_PATH
            }
        }

        const sut: RasaRecognizer = new RasaRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_Error).catch((error:Error) => {
                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.be.equal('some error in request');
            }
        );
        expect(result).to.be.undefined;
    });

    it('request RASA with utterace with result code 200', async () => {
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'rasa',
            params: {
                appHost: Constants.BASE_PATH
            }
        };
        const sut: RasaRecognizer = new RasaRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_200);
        expect(result).to.be.deep.equal(Constants.RASA_EXPECTED_200_RECOGNIZER_RESULT);
    });

    it('request RASA with utterace with result code 200 bad response', async () => {
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'rasa',
            params: {
                appHost: Constants.BASE_PATH
            }
        };
        const sut: RasaRecognizer = new RasaRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_200_BAD).catch( (error: Error) => {
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.be.equal('Cannot read property \'name\' of undefined');
        });
        expect(result).to.be.undefined;
    });

    it('request RASA with utterance tith result code 400', async () =>{
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'rasa',
            params: {
                appHost: Constants.BASE_PATH
            }
        };
        const sut: RasaRecognizer = new RasaRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_400).catch( (error: Error) => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.be.equal('{"response":{"statusCode":400,"body":[],"headers":{"content-type":"application/json"},"request":{"uri":{"protocol":"http:","slashes":true,"auth":null,"host":"rasa_host","port":80,"hostname":"rasa_host","hash":null,"search":null,"query":null,"pathname":"/parse","path":"/parse","href":"http://rasa_host/parse"},"method":"POST","headers":{"Content-Type":"application/json","accept":"application/json","content-length":17}}},"body":[]}');
        });
        expect(result).to.be.undefined;
    });

});
