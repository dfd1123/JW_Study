import './style.css'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

window.addEventListener('load', () => {
  init()
})

async function init() {
  const canvas = document.querySelector('#canvas');

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true, // 표면 부드럽게 표현
    canvas
  });

  renderer.shadowMap.enabled = true;
  renderer.debug.checkShaderErrors = true

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xffffff, 10, 500);

  /**
   * Three.js에서 가장 일반적으로 사용되는 카메라 타입으로, 사람의 눈이 보는 것과 같은 원근감을 표현하는 카메라
   */
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(FOV, Field of View)
    window.innerWidth / window.innerHeight, // 종횡비(Aspect Ratio)
    1, // 근접 거리(Near)
    500 // 원거리 거리(Far)
  );

  const controls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 25, 150)

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    // wireframe: true,
    color: '#00ffff'
  });

  const initialWaveZPosition = [];
  
  for(let i = 0; i < waveGeometry.attributes.position.count; i++){
    const z = waveGeometry.attributes.position.getZ(i) + (Math.random() - 0.5) * 5;
    waveGeometry.attributes.position.setZ(i, z);
    initialWaveZPosition.push(z);
  }

  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  wave.receiveShadow = true;

  const clock = new THREE.Clock();

  wave.update = () => {
    const elapsedTime = clock.getElapsedTime();

    for(let i = 0; i < initialWaveZPosition.length; i++){
      const z = initialWaveZPosition[i] + Math.sin(elapsedTime * 3 + i ** 2) * 5;
      waveGeometry.attributes.position.setZ(i, z);
    }

    waveGeometry.attributes.position.needsUpdate = true;
  }

  wave.rotation.x = -Math.PI / 2;

  scene.add(wave);

  const gltfLoader = new GLTFLoader();

  const gltf = await gltfLoader.loadAsync('./models/ship/scene.gltf');

  const ship = gltf.scene;

  ship.castShadow = true;

  ship.traverse(object => {
    console.log(object, object.isMesh)
    if(object.isMesh){
      object.castShadow = true;
    }
  })

  ship.update = () => {
    const elapsedTime = clock.getElapsedTime();

    ship.position.y = Math.sin(elapsedTime * 3);
  }

  ship.rotation.y = Math.PI;

  ship.scale.set(40, 40, 40);

  scene.add(ship);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.radius = 10;

  pointLight.intensity = 5000;

  pointLight.position.set(15,15,15);

  scene.add(pointLight);
  // scene.add(pointLightHelper);

  const directLight = new THREE.DirectionalLight(0xffffff, 0.8);

  directLight.castShadow = true;
  directLight.shadow.mapSize.width = 1024;
  directLight.shadow.mapSize.height = 1024;
  directLight.shadow.radius = 10;

  directLight.position.set(-15, 15, 15);

  scene.add(directLight);

//   const ambientLight = new THREE.AmbientLight(0xffffff, 1); // ⭐️ 추가
// scene.add(ambientLight);

  

  function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', handleResize);

  function animate() {
    try {
      requestAnimationFrame(animate);
      wave.update();
      ship.update();
      camera.lookAt(ship.position);
      controls.update();
      renderer.render(scene, camera);
    } catch (error) {
      console.error('💥 렌더링 중 오류:', e);
    }
  }

  animate();
}