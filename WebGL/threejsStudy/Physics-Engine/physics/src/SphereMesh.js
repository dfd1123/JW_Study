import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import {Sphere, Body, Vec3} from 'cannon-es'; 

export class SphereMesh {
    constructor(info){
        this.scene = info.scene;
        this.cannonWorld = info.cannonWorld;
        this.scale = info.scale;
        this.position = {x: info.x, y: info.y, z: info.z};

        this.make();
    }

    setMesh(){
        this.mesh = new Mesh(
            new SphereGeometry(this.scale),
            new MeshStandardMaterial({
                color: 'blue',
            })
        )

        this.mesh.castShadow = true;

        this.scene.add(this.mesh);
    }

    setCannonBody(){
        const sphereShape = new Sphere(this.scale);
        this.sphereBody = new Body({
            mass:1,
            position: new Vec3(this.position.x / 2, this.position.y / 2, this.position.z / 2),
            shape: sphereShape,
        });

        this.cannonWorld.addBody(this.sphereBody);
    }

    make(){
        this.setMesh();
        this.setCannonBody();
    }
}