import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SphereMesh } from './SphereMesh';

// ----- 주제: cannon.js 기본 세팅

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

export default function example() {
	const spheres = [];
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 4.5;
	camera.position.z = 10;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 0;
	directionalLight.position.y = 5;
	directionalLight.position.z = 2;

	directionalLight.castShadow = true;
	
	scene.add(directionalLight);

	const helper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
	scene.add(helper);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	//Contact Marterial
	const defaultMaterial = new CANNON.Material('default');
	const rubberMaterial = new CANNON.Material('rubber');
	const ironMaterial = new CANNON.Material('iron');

	const defaultContactMaterial = new CANNON.ContactMaterial(
		defaultMaterial,
		defaultMaterial,
		{
			friction: 0.5,
			restitution: 0.5,
		}
	);

	const rubberDefaultContactMaterial = new CANNON.ContactMaterial(
		rubberMaterial,
		defaultMaterial,
		{
			friction: 0.5,
			restitution: 0.7,
		}
	);

	const ironDefaultContactMaterial = new CANNON.ContactMaterial(
		ironMaterial,
		defaultMaterial,
		{
			friction: 0.5,
			restitution: 0.1
		}
	);

	//Cannon (물리엔진)
	const cannonWorld = new CANNON.World();
	cannonWorld.gravity.set(0, -10, 0);
	cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);

	const floorShape = new CANNON.Box(new CANNON.Vec3(5, 5, 0.1))
	const floorBody = new CANNON.Body({
		mass: 0,
		position: new CANNON.Vec3(0,0,0),
		shape: floorShape,
		material: defaultMaterial,
	});


	floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);

	cannonWorld.addBody(floorBody);

	cannonWorld.defaultContactMaterial = defaultContactMaterial;
	cannonWorld.addContactMaterial(rubberDefaultContactMaterial);
	cannonWorld.addContactMaterial(ironDefaultContactMaterial);

	// Mesh
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshStandardMaterial({
			color: 'white',
		})
	);

	floorMesh.rotation.x = THREE.MathUtils.degToRad(-90);

	floorMesh.receiveShadow = true;

	scene.add(floorMesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		const cannonStepTime = delta < 0.01 ? 1/120 : 1/60;

		cannonWorld.step(cannonStepTime, delta, 3);

		floorMesh.position.copy(floorBody.position);

		// console.log(spheres);


		spheres.forEach(item => {
			item.mesh.position.copy(item.sphereBody.position);
			item.mesh.quaternion.copy(item.sphereBody.quaternion);
		})

		// sphereMesh.position.copy(sphereBody.position);
		// sphereMesh.quaternion.copy(sphereBody.quaternion);

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);
	window.addEventListener('click', () => {
		spheres.push(new SphereMesh({
			scene,
			cannonWorld,
			x: (Math.random() * 5),
			y: 8 + (Math.random() * 2),
			z: (Math.random() * 5),
			scale: Math.abs(Math.random() - 0.2),
		}));
	})

	draw();
}
