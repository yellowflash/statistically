const {create, all} = require('mathjs');
const math = create(all, {})


// TODO: Don't corrupt mathjs so much just move these to some other place.
math.lagmat = (lag, vector) => {
    const [m] = vector.size();
    if(m < lag) throw "Lag cannot be greater than m";
    const result = [];
    for(i = 0; i <= m - lag; i ++) {
        const current = [];
        for(j = i; j < i + lag; j++) {
            current[j - i] = (vector.get([j]));
        }
        result[i] = current;
    }
    return math.matrix(result);
}

math.SQRTEPS = 1.4901161194e-08;

math.cumulativeProbability = (a) => {
    const x = a * math.SQRT1_2;
    const z = math.abs(x);

    const y = z < math.SQRT1_2 ?  0.5 + 0.5 * math.erf(x): 0.5 * math.erfc(z);
    return x <= 0 ? y : 1 - y;
}

math.erfc = (x) => 1 - math.erf(x)

math.diffVector = (xs) => {
    const [n] = xs.size();
    const lagged = math.lagmat(2, xs);

    return math.flatten(
            math.subtract(
                math.column(lagged, 1), 
                math.column(lagged, 0)));
}

math.splice = (mat, s, e, includeEnd) => math.subset(
    mat, 
    math.index(
        math.range(s, e, includeEnd || false)));

module.exports = math;