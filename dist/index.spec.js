"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("./index");
describe('nlp-hub', () => {
    it('can be constructed', () => {
        const sut = new index_1.NlpHub('lib/test/app.json');
        chai_1.expect(sut).to.be.instanceof(index_1.NlpHub);
    });
    it('can be set threshold', () => {
        const sut = new index_1.NlpHub('lib/test/app.json');
        chai_1.expect(sut.threshold).to.be.equals('0.8');
    });
    it('can be set apps', () => {
        const sut = new index_1.NlpHub('lib/test/app.json');
        chai_1.expect(sut.apps[0].id).to.be.equals('HolaRegex');
    });
    describe('firstMatch', () => {
        describe('regex', () => {
            it('pass "Hola" and get greetings', () => __awaiter(this, void 0, void 0, function* () {
                const sut = new index_1.NlpHub('lib/test/app.json');
                const utterance = 'Hola';
                const responseExpected = {
                    engine: 'regex',
                    intent: {
                        name: 'greetings',
                        score: 1,
                    },
                };
                const response = yield sut.firstMatch(utterance);
                chai_1.expect(response).to.be.deep.equals(responseExpected);
            }));
            it('pass "Comprar vuelo" and get recommender', () => __awaiter(this, void 0, void 0, function* () {
                const sut = new index_1.NlpHub('lib/test/app.json');
                const utterance = 'Comprar vuelo';
                const responseExpected = {
                    engine: 'regex',
                    intent: {
                        name: 'recommender',
                        score: 1,
                    },
                };
                const response = yield sut.firstMatch(utterance);
                chai_1.expect(response).to.be.deep.equals(responseExpected);
            }));
            it('pass "asd" and get none', () => __awaiter(this, void 0, void 0, function* () {
                const sut = new index_1.NlpHub('lib/test/app.json');
                const utterance = 'asd';
                const responseExpected = {
                    engine: 'regex',
                    intent: {
                        name: 'none',
                        score: 1,
                    },
                };
                const response = yield sut.firstMatch(utterance);
                chai_1.expect(response).to.be.deep.equals(responseExpected);
            }));
        });
    });
});
