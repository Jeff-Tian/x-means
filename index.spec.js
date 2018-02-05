import XMeans from './index';

const expect = require('chai').expect

describe('xmeans clustering', () => {
    it('should cluster data using xmeans', () => {
        let inputData = [[0], [0], [10], [10], [20], [20]];

        let xmeansInstance = new XMeans(inputData, [[0.5], [10]], 20, 0.025);
        xmeansInstance.process();

        expect(xmeansInstance.clusters.length).to.eql(3);
        expect(xmeansInstance.centers.length).to.eql(3);

        expect(xmeansInstance.getClusterData()).to.eql([
            [[0], [0]],
            [[10], [10]],
            [[20], [20]]
        ]);
    });

    it('should cluster 2 dimensional data using xmeans', () => {
        let inputData = [[0, 0], [0, 0], [0, 0], [0, 0], [10, 10], [10, 10], [10, 10], [20, 20], [20, 20], [20, 20]];

        let x = new XMeans(inputData, [[0, 0], [5, 5]], 20, 0.025);
        x.process();

        expect(x.clusters.length).to.eql(3);
        expect(x.centers.length).to.eql(3);

        expect(x.getClusterData()).to.eql([
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[10, 10], [10, 10], [10, 10]],
            [[20, 20], [20, 20], [20, 20]]
        ]);
    });
});