

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import model from './vine-with-tentacles2.glb';
import tentacleVertexShader from '../shaders/tentaleVertexShader';
import { ShaderMaterial, toHalfFloat } from 'three';

export default class NewModel{
    constructor(parentRenderer, callback){

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = parentRenderer;

        this.renderer.physicallyCorrectLights = true;

        this.bufferTarget = new THREE.WebGLRenderTarget(this.width, this.height);

        this.scene = new THREE.Scene();
        //this.scene.background = new THREE.Color(0x344444);
        this.scene.background = new THREE.Color(0x222222);        

        this.light = new THREE.DirectionalLight( 0xffffff, 2.5 );
        //this.light = new THREE.DirectionalLight( 0xaaaaaaa, 1. );        
        this.scene.add(this.light);

        this.camera = new THREE.PerspectiveCamera( 20, this.width / this.height, 1, 1000 );
        this.camera.position.z = 13.;

        this.renderedTexture = null;
        
        this.modelLoader = new GLTFLoader();
        this.modelLoader.load(model, (obj) =>{

            /*
            this.camera = obj.scene.children.filter(c => c.name === 'Camera')[0];
            //this.camera = obj.cameras[0];          
            //console.log(this.camera)
            // need to update camera projection matrix of the rendered texture will be distorted
            //this.camera.fov = 20;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();            
            */
            
            this.tentacleShader = new ShaderMaterial({
                uniforms: {
                    time: { value: 0}
                },
                vertexShader: tentacleVertexShader
            });

            //obj.scene.children[1].material = this.tentacleShader;

            //console.log(obj)

            this.animation(obj, obj.animations[0], obj.animations[1]);  

            obj.scene.rotateX(Math.PI / 2);

            this.scene.add(obj.scene)

            callback();
        });

        this.time = 0;
        this.clock = new THREE.Clock();
    }

    animation(model, animation, animation2){
        this.mixer = new THREE.AnimationMixer(model.scene);
        this.idleAction = this.mixer.clipAction(animation);
        
        this.attackAction = this.mixer.clipAction(animation2);

        this.attackAction.clampWhenFinished = true;
        this.attackAction.setLoop(THREE.LoopPingPong);

        this.idleAction.timeScale = 0.01;
        this.attackAction.timeScale = 3.;

        this.attackAction.play();
        this.idleAction.play(); 
    }


    render(){

        this.time += 0.1;

        this.mixer.update(this.clock.getDelta());

        //this.tentacleShader.uniforms.time.value = this.time;

        this.renderer.setRenderTarget(this.bufferTarget);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);



        this.renderedTexture = this.bufferTarget.texture;
    }
}