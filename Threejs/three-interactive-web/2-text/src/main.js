import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import GUI from 'lil-gui'

window.addEventListener('load', () => {
  init()
})

async function init() {
  const renderer = new THREE.WebGLRenderer({ 
    // alpha: true
    antialias: true // 표면 부드럽게 표현
  });

  renderer.shadowMap.enabled = true; // 그림자 맵 사용

  renderer.debug.checkShaderErrors = true

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene();
  const textureLoader = new THREE.TextureLoader().setPath('/assets/images/');

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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  // 
  // const pointLight = new THREE.PointLight(0xffffff, 0.2);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
  // pointLight.position.set(3, 0, 2);
  // scene.add(pointLight);
  // scene.add(pointLightHelper);

  // 스포트 라이트
  // 첫번째 인자는 빛의 색상, 두번째 빛의 강도, 세번째 빛이 닿는 거리, 네번째 빛이 퍼지는 각도, 다섯번째 빛이 감소하는 정도, 여섯번째 거리에 따라 빛이 어두워지는 양
  const spotLight = new THREE.SpotLight(0xffffff, 2.5, 30, Math.PI * 0.15, 0.2, 0.5);

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(1024, 1024); // 그림자 해상도 (기본값 512)
  spotLight.shadow.radius = 10; // 그림자 테두리의 blur 효과 (기본값 0)

  const spotListTexture = textureLoader.load('gradient.jpg');

  spotListTexture.encoding = THREE.sRGBEncoding;


  spotLight.map = spotListTexture;

  spotLight.position.set(0, 0, 3);
  spotLight.target.position.set(0, 0, -3);

  scene.add(spotLight, spotLight.target);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);

  // scene.add(spotLightHelper);
  
  camera.position.set(0, 1, 5);
  // camera.position.set(3, 4, 5);

  // camera.lookAt(cube.position);

  // renderer.render(scene, camera);

  const gui = new GUI();

  // gui.add(pointLight.position, 'x').min(-3).max(3).step(0.1).name('pointLightX');
  const spotLightFolder = gui.addFolder('Spot Light');

  spotLightFolder
    .add(spotLight, 'angle')
    .min(0)
    .max(Math.PI / 2)
    .step(0.01)
    .name('spotLightAngle');

  spotLightFolder
    .add(spotLight.position, 'z')
    .min(1)
    .max(10)
    .step(0.01)
    .name('spotLightZ') ;

  spotLightFolder
    .add(spotLight.target.position, 'z')
    .min(-10)
    .max(10)
    .step(0.01)
    .name('spotLightTargetZ') ;

    spotLightFolder
      .add(spotLight, 'distance')
      .min(1)
      .max(30)
      .step(0.01)
      .name('spotLightDistance') ;

    spotLightFolder
      .add(spotLight, 'decay')
      .min(0)
      .max(10)
      .step(0.01)
      .name('spotLightDecay') ;

    spotLightFolder
      .add(spotLight, 'penumbra')
      .min(0)
      .max(1)
      .step(0.01)
      .name('spotLightPenumbra') ;

    spotLightFolder
      .add(spotLight.shadow, 'radius')
      .min(1)
      .max(20)
      .step(0.01)
      .name('spotLightShadowRadius') ;

  const clock = new THREE.Clock();

  const fontLoader = new FontLoader();
  // fontLoader.load('/assets/fonts/The Jamsil 3 Regular_Regular.json', (font) => {
  //   const textGeometry = new TextGeometry('안녕 씨발년들아', {
  //     font: font,
  //     size: 0.5,
  //     height: 0.1,
  //   });

  //   const textMeterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })

  //   const textMesh = new THREE.Mesh(textGeometry, textMeterial)

  //   scene.add(textMesh);
  // });

  const font = await fontLoader.loadAsync('/assets/fonts/The Jamsil 3 Regular_Regular.json');

  const textGeometry = new TextGeometry('Three.js Interactive Web', {
    font: font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });

  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / -2,
  //   (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) / -2,
  //   (textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) / -2
  // )

  textGeometry.center();

  const textTexture = textureLoader.load('holographic.jpeg');



  const textMeterial = new THREE.MeshPhongMaterial()

  const textMesh = new THREE.Mesh(textGeometry, textMeterial)

  textMesh.castShadow = true; // 그림자를 받는 물체

  textMesh.material.map = textTexture;

  scene.add(textMesh);

  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

  planeMesh.receiveShadow = true; // 그림자를 던지는 물체

  planeMesh.position.z = -10;

  scene.add(planeMesh);

  const effectComposer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);

  effectComposer.addPass(renderPass);

  const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 1, 0)

  effectComposer.addPass(unrealBloomPass);

  const unrealBoolmPassFolder = gui.addFolder('Unreal Bloom Pass');

  unrealBoolmPassFolder
    .add(unrealBloomPass, 'strength')
    .min(0)
    .max(3)
    .step(0.01)
    .name('unrealBloomPassStrength') ;

  unrealBoolmPassFolder
    .add(unrealBloomPass, 'radius')
    .min(0)
    .max(1)
    .step(0.01)
    .name('unrealBloomPassRadius') ;

  unrealBoolmPassFolder
    .add(unrealBloomPass, 'threshold')
    .min(0)
    .max(1)
    .step(0.01)
    .name('unrealBloomPassThreshold') ;


  function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', handleResize);

  function handleMouseMove(event) {
    spotLight.target.position.set(((event.clientX / window.innerWidth) - 0.5) * 5, ((event.clientY / window.innerHeight) - 0.5) * -5, -3);
  }

  window.addEventListener('mousemove', handleMouseMove);

  function animate() {
    try {
      effectComposer.render();
      requestAnimationFrame(animate);
      spotLightHelper.update();
    } catch (error) {
      console.error('💥 렌더링 중 오류:', e);
    }
  }

  animate();

  renderer.render(scene, camera);
}