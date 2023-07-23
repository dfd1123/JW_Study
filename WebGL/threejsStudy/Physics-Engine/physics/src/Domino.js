import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {Body, Box, Vec3} from 'cannon-es';

export class Domino {
    constructor(info){
        this.scene = info.scene;
        this.cannonWorld = info.cannonWorld;
        this.position = {
            x: info.x || 0,
            y: info.y || 0.5,
            z: info.z,
        }
        this.size = {
            width: info.width || 0.6,
            height: info.height || 1,
            depth: info.depth || 0.2,
        };
        this.rotation = info.rotation || 0;
        this.name = info.name;
        this.material = info.material;

        this.setMesh();
    }

    setMesh(){
        const loader = new GLTFLoader();
        loader.load(
            '/models/domino.glb',
            (glb) => {
                this.mesh = glb.scene.children[0];
                this.mesh.castShadow = true;
                this.mesh.position.set(this.position.x, this.position.y, this.position.z);
                this.mesh.name = this.name;
                this.scene.add(this.mesh);

                this.setCannonBody();
            }
        )
    }

    setCannonBody(){
        const shape = new Box(new Vec3(this.size.width / 2, this.size.height / 2, this.size.depth / 2));
        this.cannonBody = new Body({
            mass: 1,
            position: new Vec3(this.position.x, this.position.y, this.position.z),
            shape,
            material: this.material,
        });

        this.cannonBody.quaternion.setFromAxisAngle(new Vec3(0,1,0), this.rotation);
        this.mesh.cannonBody = this.cannonBody;

        this.cannonWorld.addBody(this.cannonBody);
    }

    
}