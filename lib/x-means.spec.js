import XMeans from "./x-means";

const expect = require('chai').expect

describe('it works', () => {
    describe('up', () => {
        it('should be up', () => {
            expect(1).to.eql(1);
        })
    })

    describe('xmeans clustering', () => {
        it('should clustering data using xmeans', () => {
            let inputData = Array(10).fill([0])
                .concat(Array(10).fill([5]))
                .concat(Array(10).fill([10]))
                .concat(Array(10).fill([15]))
            ;

            let xmeansInstance = new XMeans(inputData, [[0.5], [5.5], [10.5], [15.5]], 20, 0.025);
            xmeansInstance.process();

            expect(xmeansInstance.clusters.length).to.eql(4);
            expect(xmeansInstance.centers.length).to.eql(xmeansInstance.clusters.length);

            expect(xmeansInstance.clusters.length < 20).to.eql(true);
            console.log('--------------------------');
            console.log(xmeansInstance.clusters);
            console.log(xmeansInstance.centers);
            xmeansInstance.clusters.map((cluster) => {
                expect(cluster.length).to.eql(10);
            });

            expect(xmeansInstance.getClusterData()).to.eql([[0, 0]]);
        })
    })
})