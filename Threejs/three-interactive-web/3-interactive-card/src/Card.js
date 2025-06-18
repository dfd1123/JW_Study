import * as THREE from 'three';

class Card {
  mesh = null;

  constructor({width, height, radius, color}) {
    const x = width / 2 - radius;
    const y = height / 2 - radius;

    const shape = new THREE.Shape();

    shape
    .absarc(x, y, radius, Math.PI / 2, 0, true)
    .lineTo(x + radius, -y)
    .absarc(x, -y, radius, 0, -Math.PI / 2, true)
    .lineTo(-x, -y - radius, -radius)
    .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
    .lineTo(-(x + radius), y)
    .absarc(-x, y, radius, Math.PI, Math.PI / 2, true)

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.01,
        bevelThickness: 0.1
    });
    const meterial = new THREE.MeshStandardMaterial({ 
        color, 
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
     });

    const mesh = new THREE.Mesh(geometry, meterial);

    this.mesh = mesh;
  }
}

export default Card;