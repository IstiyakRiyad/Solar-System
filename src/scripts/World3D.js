import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {makeStarSystem} from './starSystem.js';
import {buttonController} from './buttonController.js';


export default class World3D{
	constructor(solarSystemData, buttonData){
		// Time per second => day/s
		this.timePeriod = {
			year: 3,  	// day per second
			day: 3 	// hours per second
		};


		// Canvas 
		this.canvas = document.getElementById('screen');

		// Renderer
		this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
		this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
		//this.renderer.shadowMap.enabled = true;

		// Perspective Camera
		this.camera = new THREE.PerspectiveCamera(40, this.canvas.width / this.canvas.height, 0.1, 5000000000000);
		this.camera.position.set(0, 100000, 100000);

		// Controls
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.zoomSpeed = 2;
		// It's import for mobile
		this.controls.enablePan = false;



		// Scene
		this.scene = new THREE.Scene();


		// Point Light
		const light = new THREE.PointLight(0xffffff, 1);


		this.scene.add(light);

		// Ambient Light
		const light2 = new THREE.AmbientLight(0xffffff, 0.4);
		this.scene.add(light2);


		// Making Background Stars
		/*const loader = new THREE.TextureLoader();

		const texture = loader.load(
			'../img/background/background6k.jpg',
			()=> {
				const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
				rt.fromEquirectangularTexture(this.renderer, texture);
				this.scene.background = rt.texture;
			}
		);*/

		this.scene.background = solarSystemData.Background;


		// Solar System
		this.solarSystem = new THREE.Object3D();
		this.scene.add(this.solarSystem);


		// Making all planets
		this.starSystem = makeStarSystem(this.solarSystem, solarSystemData);
		this.target = this.starSystem.stars[0];

		// Button Controller
		this.buttonControls = buttonController(this.starSystem, this, buttonData);
		


		// Resize event handler 
		window.addEventListener('resize', ()=> {
			const pixelRatio = window.devicePixelRatio;
			const width = this.canvas.clientWidth * pixelRatio;
			const height = this.canvas.clientHeight * pixelRatio;

			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(width, height, false);
		});

	}
}


