import { expect } from 'chai';
import { NlpHub, INlpHubConfiguration } from './index';

import luisMock from './engines/luis/test/luis.mock';
import * as ConstantsLuis from './engines/luis/test/luis.constants.spec';
luisMock(ConstantsLuis.BASE_PATH);

import rasaMock from './engines/rasa/test/rasa.mock';
import * as ConstantsRasa from './engines/rasa/test/rasa.constants.spec';
rasaMock(ConstantsRasa.BASE_PATH);

describe('nlp-hub', () => {
  const configuration: INlpHubConfiguration = {
    threshold: 0.8,
    recognizers: [
        {
            id: "HolaRegex",
            type: "regex",
            params: {
                intent: "greetings",
                exp: "(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)"
            }
        },
        {
            id: "recommender",
            type: "regex" ,
            params: {
                intent: "recommender",
                exp: "^Comprar vuelo$"
            }
        },
        {
            id: "Luis-1",
            type: "luis",
            params: {
                "appId": "APP_ID_204",
                "key": "SUBS_KEY",
                "appHost": "http://westus.api.cognitive.microsoft.com" }
        },
        {
            id: "Rasa-1",
            type: "rasa",
            params: {
                appHost: "http://RASA_HOST" 
            }
        },
        {
            id: "default-1",
            type:"default" ,
            params: {
                intent: "NoneDialog"
            }
        }
    ]
  };

  it('can be constructed', () => {
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut).to.be.instanceof(NlpHub);
  });

  it('can be set threshold', () => {
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut.threshold).to.be.equals(0.8);
  });

  it('can be set apps', () => {
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut.recognizers[0]._id).to.be.equals('HolaRegex');
  });

  describe('firstMatch', () => {

      it('pass "Hola" and get greetings', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'Hola';
        const responseExpected = {
          id: "HolaRegex",
          engine: 'regex',
          intent: {
            name: 'greetings',
            score: 1,
          },
          entities: [],
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

      it('pass "Comprar vuelo" and get recommender', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'Comprar vuelo';
        const responseExpected = {
          id: "recommender",
          engine: 'regex',
          intent: {
            name: 'recommender',
            score: 1,
          },
          entities: [],
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

      it('pass "asd" and get none', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'asd';
        const responseExpected = {
          engine: 'default',
          id: "default-1",
          intent: {
            name: 'NoneDialog',
            score: 1,
          },
          entities: [],
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

  });

  describe('isAcceptable', () => {

    it('undefined', () => {
      const sut: NlpHub = new NlpHub(configuration);
      const recognizerResult = undefined;
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(false);
    });

    it('null', () => {
      const sut: NlpHub = new NlpHub(configuration);
      const recognizerResult = null;
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(false);
    });

    it('under threshold', () => {
      const sut: NlpHub = new NlpHub(configuration);
      const recognizerResult = {
        intent: {
          score: 0.79
        }
      };
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(false);
    });

    it('acceptable result', () => {
      const sut: NlpHub = new NlpHub(configuration);
      const recognizerResult = {
        intent: {
          score: 0.89
        }
      };
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(true);
    });
  });
});
