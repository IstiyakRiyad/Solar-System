import '../styles/main.css';
import * as THREE from 'three';
import World3D from './World3D.js';
import {loadJSON, loadPath, loadTexture} from './loader.js';


let delta = new THREE.Vector3();

Promise.all([
	loadJSON('solarSystem'),
	loadJSON('controllerButton')
])
.then(([solarData, buttonData]) => {

	loadPath(solarData, buttonData)
	.then(([solarData, buttonData]) => {
		// Loading the texture files
		loadTexture(solarData);

		// Making SolarSystem with the given data
		const solarSystem = new World3D(solarData, buttonData);
		

		// Animate Loop Function
		function animate(time){
			time *= 0.001;

			solarSystem.starSystem.stars.forEach(star => {
				star.rotate(time, solarSystem.timePeriod.day);
				star.setPosition(time, solarSystem.timePeriod.year);
			});

			solarSystem.starSystem.planets.forEach(planet => {
				planet.rotate(time, solarSystem.timePeriod.day);
				planet.setPosition(time, solarSystem.timePeriod.year);
			});


			delta.subVectors(solarSystem.camera.position, delta);
			solarSystem.camera.position.addVectors(solarSystem.controls.target, delta);
			delta = Object.assign(delta, solarSystem.controls.target);

			solarSystem.controls.minDistance = 2 * solarSystem.target.diameter * solarSystem.target.scale.object;

			
			solarSystem.controls.update();
			solarSystem.buttonControls.update();
			solarSystem.renderer.render(solarSystem.scene, solarSystem.camera);

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	});
});





