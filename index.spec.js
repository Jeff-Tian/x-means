import XMeans from './index';

const expect = require('chai').expect

describe('xmeans clustering', () => {
    it('should clustering data using xmeans', () => {
        let inputData = [[0], [0], [10], [10], [20], [20]];

        let xmeansInstance = new XMeans(inputData, [[0.5], [10]], 20, 0.025);
        xmeansInstance.process();

        console.log(JSON.stringify(xmeansInstance));

        expect(xmeansInstance.clusters.length).to.eql(3);
        expect(xmeansInstance.centers.length).to.eql(3);

        expect(xmeansInstance.getClusterData()).to.eql([
            [[0], [0]],
            [[10], [10]],
            [[20], [20]]
        ]);
    })
});