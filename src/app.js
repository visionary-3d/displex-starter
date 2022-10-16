import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { init, gl, scene, camera, controls } from './init/init';

import vertexShader from './shaders/vertex.js';
import fragmentShader from './shaders/fragment.js';
import { GUI } from './init/lil-gui.module.min';
import './style.css';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

init();

let gui = new GUI();

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.3, 100, 100),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    wireframe: true,
    uniforms: {
      uTime: { value: 0 },
    },
  })
);

scene.add(torus);

let composer = new EffectComposer(gl);
composer.addPass(new RenderPass(scene, camera));

const clock = new THREE.Clock();

let animate = () => {
  const elapsedTime = clock.getElapsedTime();
  torus.material.uniforms.uTime.value = elapsedTime;
  composer.render();
  controls.update();
  requestAnimationFrame(animate);
};
animate();
