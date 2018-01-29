const chai = require("chai");
const should = chai.should();
const BIC = require('./BIC');

describe('Bayesian Information Criterion', () => {
    it('should calculate BIC by likelihood and N, k', () => {
        BIC.getByLikelihoodAndNK(-20.59083, 74, 4).should.closeTo(58.39793, 0.0001);
        BIC.getByLikelihoodAndNK(-27.17516, 74, 3).should.closeTo(67.26251, 0.0001);
    });
});