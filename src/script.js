import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import * as dat from "dat.gui";

const stats = Stats();
document.body.appendChild(stats.dom)


// Debug
const gui = new dat.GUI();

// 加载材质
const loader = new THREE.TextureLoader();
//加载earth贴图 放置在static目录下
const texture = loader.load("texture/earthmap1k.jpg");
//加载肿块
const bumpMap = loader.load("texture/earthbump.jpg");
// 加载云朵材质
const cloudMap = loader.load("texture/earthCloud.png");
// 加载星星材质
const starMap = loader.load("texture/galaxy.png");

// Canvas 至少需要 场景 渲染器 和 照相机 缺一不可
// canvas 元素 是渲染器的渲染范围
const canvas = document.querySelector("canvas.webgl");

// Scene 场景
const scene = new THREE.Scene();

// Objects 创建几何球体 半径范围 宽度 高度
const geometry = new THREE.SphereBufferGeometry(0.7, 32, 32);

// Materials 创建材料
const material = new THREE.MeshPhongMaterial({
  roughness: 1, //粗糙度
  metalness: 0,
  //   也可以使用
  // map:THREE.ImageUtils.loadTexture(),
  map: texture,
  bumpMap,
  bumpScale: 1,
});

//设置材料的颜色
// material.color = new THREE.Color(0x00ff00);

// Mesh 创建网孔球体
const sphere = new THREE.Mesh(geometry, material);
//把球体添加到场景中
scene.add(sphere);

//创建云朵球体 更大点
const cloudGeometry = new THREE.SphereBufferGeometry(0.75, 32, 32);
// Materials 创建材料
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: cloudMap,
  transparent:true, //设置为透明
});

// Mesh 创建网孔球体
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
//把球体添加到场景中
scene.add(cloudMesh);


//创建星星球体 更大点 可能超出视野
const starGeometry = new THREE.SphereBufferGeometry(80, 64, 64);
// Materials 创建基础材料 没有光线
const starMaterial = new THREE.MeshBasicMaterial({
  map: starMap,
  transparent:true, //设置为透明
  side: THREE.BackSide
});

// Mesh 创建网孔球体
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
//把球体添加到场景中
scene.add(starMesh);





// Lights 光线 需要光线才能看到
//创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
//创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
// 点光源必须要设置放置位置
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
//为场景添加光线
scene.add(ambientLight);
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//监听window的resize事件 
//更新camera的长宽比
//更新renderer的大小
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera 照相机 创建透视摄影
 * fov 你想要看到的视角有多大多宽 一般为60
 * aspect 这个场景的长宽比
 * near 0.1
 * far 1000
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// position 照相机的放置位置
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls 创建轨道控制器 接收参数 为相机 和 canvas元素
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer 渲染器
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true, //开启抗锯齿(antialiased)渲染
});
//设置渲染器的大小
renderer.setSize(sizes.width, sizes.height);
//设置渲染器的像素值
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//渲染前自动清理
renderer.autoClear = false;
//设置清理颜色
renderer.setClearColor(0x000000, 0);

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects 旋转球体的y轴
  sphere.rotation.y = -0.11 * elapsedTime;
  cloudMesh.rotation.y = -0.061 * elapsedTime;
  starMesh.rotation.y = -0.18 * elapsedTime;
  cloudMesh.rotation.x = -0.061 * elapsedTime;
  starMesh.rotation.x = -0.18 * elapsedTime;
  cloudMesh.rotation.z = -0.051 * elapsedTime;
  starMesh.rotation.z = -0.18 * elapsedTime;

  // Update Orbital Controls 更新轨道控制器 可以使用鼠标控制
  controls.update();

  // Render 渲染要在最后才能渲染
  renderer.render(scene, camera);

  stats.update()

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
