

import * as THREE from 'three';

import circleFragShader from '../shaders/circle-fragShader';

import circleVertexShader from '../shaders/circle-vertexShader';

import MainMusicAPI from '../music-api/main-music-api';

class CardScene{
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.musicApi = new MainMusicAPI(this.camera);

        this.geo = new THREE.PlaneGeometry(1, 1);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 }
            },

            vertexShader: circleVertexShader,
            fragmentShader: circleFragShader

        });

        this.mesh = new THREE.Mesh(this.geo, this.material);

        this.geo.attributes.position.needsUpdate = true;

        this.camera.position.z = 1;

        this.scene.add(this.mesh);

        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, 
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
        });

        this.renderedTex = null;

        this.time = new THREE.Clock();
    }

    render(renderer){

        //this.time = this.time.getElapsedTime();

        /*

        this.time += 0.01;

        this.mesh.scale.x += Math.sin(this.time);
        this.mesh.scale.y += Math.sin(this.time);        
        */

        this.mesh.material.uniforms.time.value = this.time.getElapsedTime();

        renderer.setRenderTarget(this.renderTarget);
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(null);

        this.renderedTex = this.renderTarget.texture;
    }


}

export default CardScene;