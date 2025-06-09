import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

window.addEventListener('load', () => {
  init()
})

function init() {
  const renderer = new THREE.WebGLRenderer({ 
    // alpha: true
    antialias: true // 표면 부드럽게 표현
  });

  renderer.debug.checkShaderErrors = true

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene();

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

  // const axesHelper = new THREE.AxesHelper(3);

  // scene.add(axesHelper);

  controls.autoRotate = true; // 카메라가 자동으로 회전하는 기능
  // controls.autoRotateSpeed = 30; // 카메라가 자동으로 회전하는 속도
  controls.enableDamping = true; // 카메라를 움직였을때 관성을 주는 기능
  // controls.dampingFactor = 0.05; // 관성을 주는 정도
  // controls.enableZoom = true; // 카메라가 확대/축소하는 기능
  // controls.enablePan = true; // 카메라가 패닝하는 기능
  // controls.enableRotate = true; // 카메라가 회전하는 기능
  // controls.enableZoom = true; // 카메라가 확대/축소하는 기능
  // controls.enablePan = true; // 카메라가 패닝하는 기능

  controls.maxDistance = 10; // 카메라가 최대로 줌 할 수 있는 거리
  controls.minDistance = 2; // 카메라가 최소로 줌 할 수 있는 거리

  controls.maxPolarAngle = Math.PI / 2; // 카메라가 수직 방향으로 최대로 회전할 수 있는 각도
  controls.minPolarAngle = Math.PI / 3; // 카메라가 수직 방향으로 최소로 회전할 수 있는 각도

  controls.maxAzimuthAngle = Math.PI / 2; // 카메라가 수평 방향으로 최대로 회전할 수 있는 각도
  controls.minAzimuthAngle = Math.PI / 3; // 카메라가 수평 방향으로 최소로 회전할 수 있는 각도



  /**
   *  Geometry는 형태, Material은 재질
   */
  const geometry = new THREE.IcosahedronGeometry(1);
  // 모서리를 표현할 때 사용 (두번째 인자는 어떤 각도 이상의 면이 만날 때 모서리로 인식할지를 결정하는 값)
  const edges = new THREE.EdgesGeometry(geometry, 10);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0000ff }));
  
  // MeshBasicMaterial은 조명의 영향을 받지 않는다 (굳이 조명을 추가하지 않더라도 화면에 잘 보이고, 조명을 추가하더라도 조명의 영향을 받지 않는다)
  const meshBasicMeterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  const meshStandardMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    // roughness: 0, // 0은 매끄러운 표면, 1은 거친 표면
    // metalness: 0.8, // 0은 비금속, 1은 금속
    // transparent: true, // 투명도를 적용하려면 이 옵션을 추가해야 한다
    // opacity: 0.5, // 투명도
    // wireframe: true // 모서리 표현
    // side: THREE.DoubleSide // 면의 방향을 결정하는 옵션 (FrontSide, BackSide, DoubleSide)
  });

  const mashLambertMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color(0x00ff00),
    emissive: new THREE.Color(0x111111), // 발광 효과를 줄 때 사용(mesh 자체가 내는 색)
   });

  meshStandardMaterial.color = new THREE.Color(0x00ff00);

  const cube = new THREE.Mesh(geometry, mashLambertMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshLambertMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa
  });

  const skeletonMesh = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

  // scene.add(skeletonMesh);

  scene.add(cube, skeletonMesh);
  // scene.add(line);
  // 직사 광선으로 때리는 빛  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
  // 모든 면에 균일하게 빛을 준다
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  // 하늘과 땅을 표현할 때 사용 (첫번째 인자는 하늘의 색상, 두번째 인자는 땅의 색상, 세번째 인자는 강도)
  const hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x0000ff, 1 );

  // directionalLight.position.set(-1, 2, 3);
  
  scene.add(directionalLight);
  // scene.add(ambientLight);
  // scene.add(hemisphereLight);

  camera.position.z = 5;
  // camera.position.set(3, 4, 5);

  // camera.lookAt(cube.position);

  // renderer.render(scene, camera);

  const clock = new THREE.Clock();

  function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', handleResize);

  function animate() {
    try {
      // cube.rotation.x += THREE.MathUtils.degToRad(1);

      //Clock이 생성된 이후부터 경과된 시간을 초 단위로 반환
      const elapsedTime = clock.getElapsedTime();
      cube.rotation.x = elapsedTime;
      cube.rotation.y = elapsedTime;

      skeletonMesh.rotation.x = elapsedTime * 1.5;
      skeletonMesh.rotation.y = elapsedTime * 1.5;

      // 컨트롤을 업데이트 해줘야 카메라가 움직인다
      controls.update();

      // 마지막으로 호출된 시점과 현재 시점 사이의 시간 차이를 초 단위로 반환 => 즉, 프레임 간의 시간 간격
      // cube.rotation.x += clock.getDelta();

      // cube.position.y = Math.sin(cube.rotation.x);
      // cube.scale.x = Math.cos(cube.rotation.x);
      
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    } catch (error) {
      console.error('💥 렌더링 중 오류:', e);
    }
  }

  animate();

  const gui = new GUI();

  gui.add(controls, 'autoRotate').name('autoRotate');
  gui.add(controls, 'autoRotateSpeed').name('autoRotateSpeed');
  gui.add(controls, 'enableDamping').name('enableDamping');
  gui.add(controls, 'dampingFactor').name('dampingFactor');
  gui.add(controls, 'maxDistance').name('maxDistance');
  gui.add(controls, 'minDistance').name('minDistance');
  
  gui.add(cube.position, 'y', -3, 3, 0.1).name('cubePositionY');
  gui.add(cube.scale, 'x').name('cubeScaleX');
  gui.add(cube.scale, 'y').name('cubeScaleY');
  gui.add(cube.scale, 'z').name('cubeScaleZ');

  gui.add(cube.rotation, 'x').name('cubeRotationX');
  gui.add(cube.rotation, 'y').name('cubeRotationY');
  gui.add(cube.rotation, 'z').name('cubeRotationZ');

  gui.addColor(mashLambertMaterial, 'color').onChange((color) => {
    console.log('color', color)
  }).name('mashLambertMaterialColor');

  gui.add(skeletonMesh, 'visible').name('skeletonMeshVisible');
  
}