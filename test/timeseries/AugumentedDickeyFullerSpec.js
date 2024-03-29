const assert = require('assert');
const chai = require('chai');
const math = require('../../libs/math');
const ADF = require("../../libs/timeseries/AugumentedDickeyFuller");
const CADF = require("../../libs/timeseries/CointegratedAugumentedDickeyFuller");
const testdata = require('./testdata');

const should = chai.should();

describe("AugumentedDickeyFuller", () => {
    it("should say stationary series as stationary with high confidence", () => {
        const {pvalue, tvalue, lag} = new ADF(math.matrix(testdata.stationary))
                            .fit();
        pvalue.should.be.closeTo(0.03, 0.005);
    })});

describe("CointegratedAugumentedDickeyFuller", () => {
    it("should say stationary series as stationary with high confidence", () => {
        const {pvalue, tvalue, lag} = new CADF(math.matrix(testdata.stationary), 
                                               math.matrix(testdata.stationaryWithNoise))
                                            .fit();
        
        pvalue.should.be.closeTo(0.06, 0.005);
    })});