import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    } catch (error) {
      console.error('💥 렌더링 중 오류:', e);
    }
  }

  animate();
}