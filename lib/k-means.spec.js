const kMeans = require("./k-means");
const chai = require("chai");
const should = chai.should();

describe('k-means test', () => {
    it('should know convergence', () => {
        kMeans.converged([[1, 2], [3, 4]], [[1, 2], [3, 4]]).should.eql(true);
        kMeans.converged([[1, 2], [3, 4]], [[2, 3], [4, 5]]).should.eql(false);
    });

    it('should recalculate centers of clusters', () => {
        kMeans.reCalculateCenters([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ]).should.eql([
            2.5,
            6.5,
            10.5
        ]);
    });

    it('should cluster a flat data to meet the centers', () => {
        kMeans.clusterTo([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ], [2.5, 7.5]).should.eql({
                clusters: [
                    [1, 2, 3, 4, 5],
                    [6, 7, 8, 9, 10]
                ],
                centers: [3, 8]
            }
        );

        kMeans.clusterTo([0, 1, 10, 12, 20, 25], [0, 10, 20]).should.eql({
            clusters: [
                [0, 1],
                [10, 12],
                [20, 25]
            ],
            centers: [0.5, 11, 22.5]
        });
    });

    it('should cluster a flat data to clusters', () => {
        kMeans.cluster([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]).should.eql({
            clusters: [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10]
            ],
            centers: [3, 8]
        });

        kMeans.cluster([100, 10, 1000, 99, 12, 38, 33, 49, 1, 0.05, 0.07]).should.eql({
            clusters: [
                [100, 10, 99, 12, 38, 33, 49, 1, 0.05, 0.07],
                [1000]
            ],
            centers: [34.212, 1000]
        });
    })
});