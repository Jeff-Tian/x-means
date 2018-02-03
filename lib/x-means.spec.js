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
            xmeansInstance.clusters.map((cluster) => {
                expect(cluster.length).to.eql(10);
            });

            expect(xmeansInstance.getClusterData()).to.eql([
                [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
                [[5], [5], [5], [5], [5], [5], [5], [5], [5], [5]],
                [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10]],
                [[15], [15], [15], [15], [15], [15], [15], [15], [15], [15]],
            ]);
        });

        it('should update clusters according to given centers', () => {
            let inputData = [[0], [10], [0], [10], [20], [20]];
            let xmeansInstance = new XMeans(inputData, [[0], [10], [20]], 20, 0.025);
            let clusters = xmeansInstance.updateClusters([[0], [10], [20]]);

            expect(clusters.length).to.eql(3);
            expect(clusters).to.eql([
                [0, 2],
                [1, 3],
                [4, 5]
            ]);
        });

        it('should update centers according to given clusters', () => {
            let inputData = [[0], [12], [1], [10], [20], [25]];
            let xmeansInstance = new XMeans(inputData, [[0], [10], [20]], 20, 0.025);
            let centers = xmeansInstance.updateCenters([
                [0, 2],
                [1, 3],
                [4, 5]
            ]);

            expect(centers.length).to.eql(3);
            expect(centers).to.eql([
                [0.5],
                [11],
                [22.5]
            ]);
        });

        it('should complete what k-means can do', () => {
            let inputData = [[0], [1], [10], [12], [20], [25]];
            let xmeansInstance = new XMeans(inputData, [[0], [10], [20]], 20, 0.025);
            const {clusters, centers} = xmeansInstance.kmeansCluster([[0], [10], [20]]);

            expect(clusters.length).to.eql(3);
            expect(clusters).to.eql([
                [0, 1],
                [2, 3],
                [4, 5]
            ]);

            expect(centers.length).to.eql(3);
            expect(centers).to.eql([
                [0.5],
                [11],
                [22.5]
            ]);
        })
    })
})