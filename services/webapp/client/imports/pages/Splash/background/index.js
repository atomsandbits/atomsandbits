import React from 'react';
import THREE from 'three';
import SimplexNoise from 'simplex-noise';
import {TweenMax} from 'gsap';

let resizeTm;
let mouse = new THREE.Vector2(0.8, 0.5);
let simplex = new SimplexNoise();

class Background extends React.Component {
  state = {};
  canvas = null;
  renderer = null;
  scene = null;
  camera = null;
  geometry = null;
  updateVertices = (a) => {
    for (let i = 0; i < this.geometry.vertices.length; i++) {
      let vector = this.geometry.vertices[i];
      vector.copy(vector._o);
      let perlin = simplex.noise3D((vector.x * 0.006) + (a * 0.0002), (vector.y * 0.006) + (a * 0.0003), (vector.z * 0.006));
      let ratio = ((perlin * 0.2 * (mouse.y + 0.1)) + 0.8);
      vector.multiplyScalar(ratio);
    }
    this.geometry.verticesNeedUpdate = true;
  }
  onMouseMove = (e) => {
    TweenMax.to(mouse, 0.8, {
      y: (e.clientY / this.canvas.offsetHeight),
      x: (e.clientX / this.canvas.offsetWidth),
      ease: Power1.easeOut
    });
  };
  onWindowResize = (e) => {
    onResize = () => {
      console.log("resized");
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      let width = this.canvas.offsetWidth,
        height = this.canvas.offsetHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
    resizeTm = clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 30);
  };
  renderThree = (a) => {
    requestAnimationFrame(this.renderThree);
    this.updateVertices(a);
    this.renderer.render(this.scene, this.camera);
  };
  componentDidMount() {
    console.log("Component mounted...");
    this.canvas = document.querySelector('#background');
    let width = this.canvas.offsetWidth,
      height = this.canvas.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
    this.renderer.setPixelRatio(
      window.devicePixelRatio > 1
      ? 2
      : 1);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x404040);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
    this.camera.position.set(-120, 0, 400);
    // this.camera.translateY( -300 );

    let light1 = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6);
    this.scene.add(light1);

    let light2 = new THREE.DirectionalLight(0x590D82, 0.5);
    light2.position.set(-40, 140, 400);
    this.scene.add(light2);
    let light3 = light2.clone();
    light3.position.set(-440, 140, 400);
    this.scene.add(light3);

    this.geometry = new THREE.IcosahedronGeometry(120, 4);
    for (let i = 0; i < this.geometry.vertices.length; i++) {
      let vector = this.geometry.vertices[i];
      vector._o = vector.clone();
    }
    let material = new THREE.MeshPhongMaterial({emissive: 0x23f660, emissiveIntensity: 0.4, shininess: 0});
    let shape = new THREE.Mesh(this.geometry, material);
    this.scene.add(shape);
    shape.position.set(0, 0, 0)

    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("resize", this.onWindowResize);
    requestAnimationFrame(this.renderThree);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("resize", this.onWindowResize);
    cancelAnimationFrame(this.renderThree);
  }
  render() {
    return (<canvas style={{
        position: "absolute",
        height: '100vh',
        width: '100vw',
      }} id="background"/>)
  }
}

Background.propTypes = {};

export default Background;
