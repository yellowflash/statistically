const OrdinaryLeastSquares = require('../curvefitting/OrdinaryLeastSquares');
const AugumentedDickeyFuller = require('./AugumentedDickeyFuller');
const math = require('../math');

class CointegratedAugumentedDickeyFuller {
    constructor(xs, ys, maxlag) {
        this.xs = xs;
        this.ys = ys;
        this.maxlag = maxlag;
    }

    fit() {
        const [n] = this.xs.size();
        const {rsquared, result} = OrdinaryLeastSquares
            .create(math.reshape(this.ys, [n, 1]), this.xs)
            .fit();

        const regressed = math.reshape(
            math.multiply(
                math.concat(math.reshape(this.ys, [n, 1]), math.ones(n, 1)),
                math.reshape(result.coeff, [2, 1])), [n]);

        const cointt = math.reshape(math.subtract(math.re(regressed), this.xs), [n]); 

        if(rsquared < 1 - 100 * math.SQRTEPS) {
            return new AugumentedDickeyFuller(cointt, false).fit()
        } else {
            return {tvalue: Infinity, lag: 0, pvalue: 0};
        }
    }
}

module.exports = CointegratedAugumentedDickeyFuller;