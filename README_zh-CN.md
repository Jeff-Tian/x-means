# x-means  [English](./README.md)
`x-means` 算法的 Node JS 实现，扩展了 [`k-means`](http://k-means.pa-pa.me) 从而允许自动估计 `k` 的值。

感谢 [这篇论文](https://www.cs.cmu.edu/~dpelleg/download/xmeans.pdf) 以及 [这个 `python` 实现](https://github.com/annoviko/pyclustering).

`k-means` 是一个直观又简单的聚类算法，但是它要求事先指定聚类的个数（即这个 `k`），这一点严重阻碍了自动化聚类。有没有办法高效地自动估计这个 `k` 值呢？
这正是 `x-means` 算法所做的事情，它能自动地从一个较小的 `k` 值开始逐渐增加，直到找到一个合适的 `k` 值。基本原理是分而治之，每次将一小块一分为二，看能否得到更好的结果。如何判断是不是更好呢？它计算了一个 [`BIC` (贝叶斯信息准则)](https://en.wikipedia.org/wiki/Bayesian_information_criterion) 分数用来做比较。如果分开后的 BIC 分数更高，则保留这个划分，否则回到之前的状态。

# 安装
```bash
npm install x-means
```

# 使用
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

# 欢迎提交你的贡献
```bash
git clone https://github.com/Jeff-Tian/x-means.git
npm install
npm test
npm run coverage
```

