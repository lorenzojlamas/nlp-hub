import { expect } from 'chai';
import { LuisApp } from '../luis';

describe('LuisApp', () => {
    it('Can be instantiated', () => {
        const sut: LuisApp = new LuisApp();
        expect(sut).to.be.a.instanceOf(LuisApp);
    });
});
