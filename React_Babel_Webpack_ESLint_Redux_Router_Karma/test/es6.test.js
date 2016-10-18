import { expect } from 'chai';
import { add } from './es6';

describe('add es6 function test',() => {
    it('5+5=10?',() => {
        expect(add(5,5)).to.be.equal(10);
    })
});