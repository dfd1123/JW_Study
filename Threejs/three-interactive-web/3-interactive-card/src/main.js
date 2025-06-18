import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Card from './Card'
import { GUI } from "lil-gui";
import { gsap } from 'gsap';
import { COLORS } from './color.c';

window.addEventListener('load', () => {
  init()
})

function init() {
  const gui = new GUI();
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true // 표면 부드럽게 표현
  });

  renderer.debug.checkShaderErrors = true

  // renderer.setClearAlpha(0.5);
  // renderer.setClearColor(0x000000, 0.5);
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene();

  // const textureLoader = new THREE.TextureLoader();

  // const texture = textureLoader.load('https://images.unsplash.com/photo-1503480207415-fdddcc21d5fc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5JTIwdGV4dHVyZXxlbnwwfHwwfHx8MA%3D%3D')

  // scene.background = new THREE.Color(0xffaa00);
  // scene.background = texture;

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

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  controls.rotateSpeed = 0.75;

  controls.minPolarAngle = Math.PI / 2 - Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

  camera.position.z = 25;

  // camera.position.set(3, 4, 5);

  // camera.lookAt(cube.position);

  // renderer.render(scene, camera);

  const card = new Card({
    width: 10,
    height: 15.8,
    radius: 0.5,
    color: '#0077ff'
  })

  card.mesh.rotation.z = Math.PI * 0.1;

  const clock = new THREE.Clock();

  scene.add(card.mesh);

  gsap.to(card.mesh.rotation, {y: -Math.PI * 4, duration: 2.5, ease: "back.out(2.5)" });

  const cardFolder = gui.addFolder('Card');

  cardFolder.add(card.mesh.material, 'roughness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('material.roughness')

  cardFolder.add(card.mesh.material, 'metalness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('material.metalness')



  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  ambientLight.position.set(-5, -5, -5);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
  const directionalLight2 = directionalLight1.clone();

  directionalLight1.position.set(1, 1, 3);
  directionalLight2.position.set(-1, -1, -3);

  scene.add(ambientLight);
  scene.add(directionalLight1, directionalLight2);

  function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', handleResize);

  function animate() {
    try {
      controls.update();
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    } catch (error) {
      console.error('💥 렌더링 중 오류:', e);
    }
  }

  animate();

  const container = document.querySelector('.container');

  COLORS.forEach((color, index) => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.style.borderRadius = '50%';
    button.addEventListener('click', () => {
      card.mesh.material.color.set(color);

      gsap.to(card.mesh.rotation, {y: card.mesh.rotation.y - Math.PI / 2, duration: 1, ease: "back.out(2.5)" });
    });
    container.appendChild(button);
  });
}