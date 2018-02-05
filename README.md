# x-means [中文](./README_zh-CN.md)
A Node JS implementation of the `x-means` algorithm, extends [`k-means`](http://k-means.pa-pa.me) to automatically decide the value of `k`.

Thanks to [this paper](https://www.cs.cmu.edu/~dpelleg/download/xmeans.pdf) and [this repo](https://github.com/annoviko/pyclustering).

while `k-means` is a simple and straight-forward algorithm to cluster data automatically, it requires human to decide how many clusters (the `k`) in the data. This is a huge drawback for automating the clustering process. Is there a way to efficiently decide the number of clusters in the data so that no human intervention needed? 

That is what `x-means` can do. It can automatically search the `k` centroids from `k_min` to `k_max` and decide the best value of `k`. Basically it tries from a small value of `k` and then use the `devide and conquer` method to check each area using `k-means`. To evaluate if an area can be split into two sub area, it uses [`BIC` (Bayesian Information Criterion)](https://en.wikipedia.org/wiki/Bayesian_information_criterion) method.

# Installation
```bash
npm install x-means
```

# Usage
```javascript
import XMeans from './index';

let inputData = [
    [0, 0], [0, 0], [0, 0], [0, 0], 
    [10, 10], [10, 10], [10, 10], 
    [20, 20], [20, 20], [20, 20]
];

let x = new XMeans(
    inputData, 
    initCenters=[ [0, 0], [5, 5] ], 
    maxCenters=20, 
    tolerance=0.025
);
x.process();

expect(x.clusters.length).to.eql(3);
expect(x.centers.length).to.eql(3);
expect(x.getClusterData()).to.eql([
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[10, 10], [10, 10], [10, 10]],
    [[20, 20], [20, 20], [20, 20]]
]);
```

# Contribution
```bash
git clone https://github.com/Jeff-Tian/x-means.git
npm install
npm test
npm run coverage
```

