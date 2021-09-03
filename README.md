# bugu-site

## Project setup

```
npm install
npm run serve
```

# 抽奖程序路由地址： http://localhost:8080/#/lottery

# 基础版

## 抽奖布局的设计

flex 排版实现九宫格布局。
九宫格数据是通过奖品数据计算，仅用于展示。但要保持奖品数据的独立性，不受污染。

```js
//九宫格中奖品分布|/|/|
1 4 6
2   7
3 5 8
```

- 抽奖循环
  - 7,8 上锁时，奖品循环顺序 id 为：`循环1` 1 -> 4 -> 6 -> 5 -> 3 -> 2
  - 8 上锁时，奖品循环顺序 id 为：`循环2` 1 -> 4 -> 6 -> 7 -> 5 -> 3 -> 2
  - 无锁时，奖品循环顺序 id 为：`循环3` 1 -> 4 -> 6 -> 7 -> 8 -> 5 -> 3 -> 2

## 奖品数据格式的设计

```js
{
  id: 1, // 奖品id
  imgSrc: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', // 图片资源url
  name: '66矿石', // 奖品名称
  locked: 0, // 是否锁定，大于 0 时锁定
  weight: 40 // 奖品的权重。正整数。不限制于100范围内。
}
```

## 抽奖概率计算

在奖品属性中设置了权重属性。根据在抽奖状态的奖品权重进行计算。生成每一个奖品对应的中奖概率。
奖品权重为正整数。
如`[1, 2, 3, 4]`对应权重 `[100, 250, 0, 50]` 计算得到对应概率：`[0.25, 0.625, 0, 0.125]`，分别在 0-1 之间进行区间分配，

即：

| 奖品 id  | 1         | 2             | 3    | 4          |
| -------- | --------- | ------------- | ---- | ---------- |
| 概率区间 | [0, 0.25] | (0.25, 0.875] | null | (0.875, 1] |

```javascript
// validTrophyList 为 当前未被锁定的奖品数组
function getScaleList(validTrophyList) {
  let totalWeight = 0;
  validTrophyList.forEach((item) => {
    totalWeight += parseInt(item.weight);
  });
  const scaleList = [];
  validTrophyList.forEach((item) => {
    scaleList.push(parseInt(item.weight) / totalWeight);
  });
  return scaleList;
}
```

Math.random() 生成随机数，判断随机数在哪一个奖品所在的概率区间。可以得到中奖物品的 id 。具体下面函数的实现。

```js
// 该函数的写法有利于进行 100000 次测试。
function getTrophyResult(list) {
  return function(random) {
    let leftRange = 0;
    for (let i = 0; i < list.length; i++) {
      leftRange += list[i];
      if (leftRange >= random) {
        return i + 1;
      }
    }
  };
}
```

执行`getTrophyResult(getScaleList(validTrophyList))(random)` 可以得到中奖物品 id

## 模拟抽奖过程

得到中奖物品 id 后，根据当前执行的循环，查找中奖物品在循环中的位置。计算一个长度，用于模拟九宫格旋转的次数。
设置开始旋转的初始速度，在启动过程中进行加速。最后几格时再减速。

- 此处方法同`信号灯原理`.

```js
function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
```

这个方法要注意的是奖品的准确位置。

## 抽奖按钮防止连击

- 使用防抖函数实现

## 抽奖过程中防止再次点击抽奖按钮

- 此处方法实现类似于 `once` 函数。而没有写全局变量。**`（这次训练营很大的一个收获，就是对这样函数式编程，高阶函数的应用上。非常感谢各位老师）`**

```js
function once(fn) {
  let isDoing = true;
  return async function(...args) {
    if (isDoing) {
      isDoing = false;
      const ret = await fn.apply(this, args);
      isDoing = true;
      return ret;
    }
  };
}
```

## 测试 100000 次抽奖结果的函数

```js
function amountLotteyResult(num = 100000) {
  const validTrophyList = store.getters.trophies.filter(
    (item) => item.locked <= 0
  );
  const generateLottery = getTrophyResult(getScaleList(validTrophyList));
  const amountResult = Array(8).fill(0);
  for (let i = 0; i < num; i++) {
    const id = generateLottery(Math.random());
    amountResult[id - 1]++;
  }
  state.testResult = amountResult;
  return amountResult;
}
```

运行 100000 次还是很快的。运行结果基本符合当前奖品中奖概率。不知道是不是有隐藏计算问题。请老师指正。
