# Three.js Starter
Courtesy of Bruno Simon of https://threejs-journey.xyz/

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```


## 效果
鼠标可以控制地球
地球, 云层和背景星系都会移动
左上角显示渲染的帧数

## 主要思路
没什么难点, 最难的估计就是地球的贴图和云层贴图 背景贴图///笑死
地球云层星系都是创建了一个球体 然后引入材质贴图

## 主要代码说明

threejs中的几个重要的部分
scene 场景
camera 相机
light 光线
renderer 渲染器
缺一不可

注释写的很清楚 每一步干啥写的都很清楚