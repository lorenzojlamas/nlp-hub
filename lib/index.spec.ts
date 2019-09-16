import { expect } from 'chai';
import { NlpHub } from './index';

import luisMock from './engines/luis/test/luis.mock';
import * as ConstantsLuis from './engines/luis/test/luis.constants.spec';
luisMock(ConstantsLuis.BASE_PATH);

import rasaMock from './engines/rasa/test/rasa.mock';
import * as ConstantsRasa from './engines/rasa/test/rasa.constants.spec';
rasaMock(ConstantsRasa.BASE_PATH);

describe('nlp-hub', () => {

  describe('constructor', () => {

    it('can be constructed', () => {
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      expect(sut).to.be.instanceof(NlpHub);
    });

    it('can be set threshold', () => {
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      expect(sut.threshold).to.be.equals('0.8');
    });
  
    it('can be set apps', () => {
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      expect(sut.apps[0].id).to.be.equals('HolaRegex');
    });

  });

  describe('firstMatch', () => {

      it('pass "Hola" and get greetings', async () => {
        const sut: NlpHub = new NlpHub('lib/test/app.json');
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
        const sut: NlpHub = new NlpHub('lib/test/app.json');
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

      it('pass "QUERY_200" and get none', async () => {

        const sut: NlpHub = new NlpHub('lib/test/app.json');
        const utterance: string = 'QUERY_200';
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
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      const recognizerResult = undefined;
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(false);
    });

    it('null', () => {
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      const recognizerResult = null;
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(false);
    });

    it('under threshold', () => {
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      const recognizerResult = {
        intent: {
          score: 0.79
        }
      };
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(false);
    });

    it('acceptable result', () => {
      const sut: NlpHub = new NlpHub('lib/test/app.json');
      const recognizerResult = {
        intent: {
          score: 0.89
        }
      };
      expect(sut.isAcceptable(recognizerResult)).to.be.equal(true);
    });
  });
});
