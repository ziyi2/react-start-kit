var add = require('../src/es5.js');
var chai = require('chai');
var expect = chai.expect;

describe('add es5 function test',function() {
   it('5+5=10?',function(){
       expect(add(5,5)).to.be.equal(10);
   })
});