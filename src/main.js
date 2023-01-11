
import * as THREE from 'three';
import { PlaneGeometry } from 'three';

import CardScene from './scenes/card-scene';
import NewModel from './scenes/NewModel';

import css from './css/style.css';

export default class Main
{
  constructor()
  {
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x333333);
    //this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 100);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    //this.geometry = new THREE.BoxGeometry();
    this.geometry = new PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial( { 
      uniforms: {
        tex: { value: null }
      },

      vertexShader: `
        varying vec2 vUv;

        void main(){
          vUv = uv;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);

        }

      `,

      fragmentShader: `
      
        uniform sampler2D tex;
        varying vec2 vUv;

        void main(){

          vec2 uv = vUv;

          gl_FragColor = texture2D(tex, uv);
          //gl_FragColor = vec4(1, 0, 0, 1);

        }

      `

    } );


    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.cube );

    this.camera.position.z = 0.01;

    //this.cardScene = new CardScene();

    this.animate = this.animate.bind(this);
    this.renderWhenModelLoaded = this.renderWhenModelLoaded.bind(this);

    this.newModel = new NewModel(this.renderer, this.renderWhenModelLoaded);
  }

  renderWhenModelLoaded(){
    this.animate();
  }

  animate(){
    requestAnimationFrame( this.animate );

    //this.cardScene.render(this.renderer);

    //this.material.uniforms.tex.value = this.cardScene.renderedTex;
    this.newModel.render();

    this.material.uniforms.tex.value = this.newModel.renderedTexture;


    this.renderer.render( this.scene, this.camera );
  };

}

new Main();
