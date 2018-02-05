export default class XMeans {
    constructor(data, initialCenters = null, kmax = 20, tolerance = 0.025) {
        this.pointerData = data;
        this.clusters = [];

        if (initialCenters) {
            this.centers = initialCenters.slice(0);
        } else {
            this.centers = Array(data[0].length).fill(0).map(_ => Math.random());
        }

        this.kmax = kmax;
        this.tolerance = tolerance;
    }

    process() {
        this.clusters = [];
        while (this.centers.length < this.kmax) {
            let currentClusterNumber = this.centers.length;
            const result = this.kmeansCluster(this.centers);
            this.centers = result.centers.slice(0);
            this.clusters = result.clusters.slice(0);

            let allocatedCenters = this.improveStructure(this.clusters, this.centers);

            if (currentClusterNumber === allocatedCenters.length) {
                break;
            } else {
                this.centers = allocatedCenters.slice(0);
            }
        }
    }

    kmeansCluster(centers, availableIndexes = null) {
        let changes = Infinity;
        let stopCondition = this.tolerance * this.tolerance;

        let clusters = [];

        while (changes > stopCondition) {
            clusters = this.updateClusters(centers, availableIndexes);
            clusters = clusters.filter((cluster) => cluster.length > 0).slice(0);

            let updatedCenters = this.updateCenters(clusters);

            changes = Math.max.apply(null, Array(updatedCenters.length).fill(0).map((index) => this.euclideanDistanceSquared(centers[index], updatedCenters[index])));

            centers = updatedCenters.slice(0);
        }

        return {clusters, centers};
    }

    improveStructure(clusters, centers) {
        let difference = 0.001;
        let allocatedCenters = [];
        let amountFreeCenters = this.kmax - centers.length;

        for (let indexCluster = 0; indexCluster < clusters.length; indexCluster++) {
            let parentChildCenters = [];
            parentChildCenters.push(this.listMathAdditionNumber(centers[indexCluster], -difference));
            parentChildCenters.push(this.listMathAdditionNumber(centers[indexCluster], difference));
            const result = this.kmeansCluster(parentChildCenters, clusters[indexCluster]);

            let parentChildClusters = result.clusters.slice(0);
            parentChildCenters = result.centers.slice(0);

            if (parentChildCenters.length > 1) {
                let parentScores = this.splittingCriterion([clusters[indexCluster]], [centers[indexCluster]]);
                let childScores = this.splittingCriterion([parentChildClusters[0], parentChildClusters[1]], parentChildCenters);

                let splitRequire = false;

                if (parentScores < childScores) {
                    splitRequire = true;
                }

                if (splitRequire && amountFreeCenters > 0) {
                    allocatedCenters.push(parentChildCenters[0]);
                    allocatedCenters.push(parentChildCenters[1]);

                    amountFreeCenters -= 1;
                } else {
                    allocatedCenters.push(centers[indexCluster]);
                }
            } else {
                allocatedCenters.push(centers[indexCluster]);
            }
        }

        return allocatedCenters;
    }

    splittingCriterion(clusters, centers) {
        return this.bayesianInformationCriterion(clusters, centers);
    }

    bayesianInformationCriterion(clusters, centers) {
        let scores = Array(clusters.length).fill(Infinity);
        let dimension = this.pointerData[0].length;
        let sigmaSquared = 0;
        let K = clusters.length;
        let R_totalNumberOfPoints = 0;

        for (let indexCluster = 0; indexCluster < clusters.length; indexCluster++) {
            for (let i = 0; i < clusters[indexCluster].length; i++) {
                let indexObject = clusters[indexCluster][i];
                sigmaSquared += this.euclideanDistanceSquared(this.pointerData[indexObject], centers[indexCluster]);
            }

            R_totalNumberOfPoints += clusters[indexCluster].length;
        }

        if (R_totalNumberOfPoints - K > 0) {
            sigmaSquared /= (R_totalNumberOfPoints - K);
            let p = (dimension + 1) * K;

            for (let indexCluster = 0; indexCluster < clusters.length; indexCluster++) {
                let Rn = clusters[indexCluster].length;

                let L = -Rn * 0.5 * Math.log(2 * Math.PI) - Rn * dimension * 0.5 * Math.log(sigmaSquared) - (Rn - K) * 0.5 + Rn * Math.log(Rn) - Rn * Math.log(R_totalNumberOfPoints);

                scores[indexCluster] = L - p * 0.5 * Math.log(R_totalNumberOfPoints);
            }
        }

        return scores.reduce((prev, next) => prev + next, 0);
    }

    updateClusters(centers, availableIndexes = null) {
        let bypass = null;

        if (!availableIndexes) {
            bypass = new Array(this.pointerData.length).fill(0).map((_, i) => i);
        } else {
            bypass = availableIndexes;
        }

        let clusters = Array(centers.length).fill([]).map(() => []);

        for (let i = 0; i < bypass.length; i++) {
            let indexPoint = bypass[i];
            let indexOptim = -1;
            let distOptim = 0;

            for (let index = 0; index < centers.length; index++) {
                let dist = this.euclideanDistanceSquared(this.pointerData[indexPoint], centers[index]);

                if ((dist < distOptim) || (Number(index) === 0)) {
                    indexOptim = index;
                    distOptim = dist;
                }
            }

            clusters[indexOptim].push(indexPoint);
        }

        return clusters;
    }

    updateCenters(clusters) {
        let centers = Array(clusters.length).fill([]).map(() => []);
        let dimension = this.pointerData[0].length;

        for (let index = 0; index < clusters.length; index++) {
            let pointSum = Array(dimension).fill(0);

            for (let i = 0; i < clusters[index].length; i++) {
                let indexPoint = clusters[index][i];
                pointSum = this.listMathAddition(pointSum, this.pointerData[indexPoint]);
            }

            centers[index] = this.listMathDivisionNumber(pointSum, clusters[index].length);
        }

        return centers;
    }

    euclideanDistanceSquared(a, b) {
        if (typeof a === 'number' && typeof b === 'number') {
            return Math.pow(a - b, 2);
        }

        return a.map((_, i) => Math.pow(a[i] - b[i], 2)).reduce((prev, next) => prev + next, 0);
    }

    listMathAddition(a, b) {
        return a.map((_, i) => a[i] + b[i]);
    }

    listMathDivisionNumber(a, b) {
        return a.map((_, i) => a[i] / b);
    }

    listMathAdditionNumber(a, b) {
        return a.map((_, i) => a[i] + b);
    }

    getClusterData() {
        return this.clusters.map(cluster => cluster.map(index => this.pointerData[index]));
    }
}