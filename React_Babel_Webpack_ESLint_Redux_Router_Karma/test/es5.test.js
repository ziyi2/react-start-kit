var add = require('./es5.js');
var chai = require('chai');
var expect = chai.expect;

describe('add function test',function() {
   it('5+5=10?',function(){
       expect(add(5,5)).to.be.equal(10);
   })
});