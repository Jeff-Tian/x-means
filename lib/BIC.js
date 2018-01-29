module.exports = {
    getByLikelihoodAndNK: function (likelihood, N, k) {
        return -2 * likelihood + Math.log(N) * k;
    }
}