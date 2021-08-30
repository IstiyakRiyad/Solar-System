import * as THREE from 'three';

export default class AstronomicalObject {
	constructor(objectData){
		this.name = objectData.name;
		this.diameter = objectData.diameter;
		this.eclipse = objectData.eclipse;
		this.axialTilt = objectData.axialTilt;
		this.timePeriod = objectData.timePeriod;
		this.texture = objectData.texture;
		this.orbitColor = objectData.orbitColor;
		this.scale = {
			object: 1,
			orbit: 1
		};

		// Making Orbit Points for Object position
		this.positionPoints = setPoints(this.eclipse, 0.02);

		// Making Orbit Points for Line and then make the line orbit
		this.orbitPoints = setPoints(this.eclipse, 0.02);
		this.orbit = makeOrbit(this.orbitPoints, this.orbitColor);

		// Making Actual Astronomical Object and then put it in position
		this.object = makePlanet(this.diameter, this.axialTilt, this.texture);
		this.object.position.set(
			this.positionPoints[0].x,
			this.positionPoints[0].y,
			this.positionPoints[0].z
		);

		// Making all togather.. Both orbit and object
		this.astronomicalObject = new THREE.Object3D();
		this.astronomicalObject.add(this.orbit);
		this.astronomicalObject.add(this.object);
	}

	setPosition(time, speed) {		// (Second, Day)
		const position = Math.floor((1 - (((time * speed) / this.timePeriod.year) % 1)) * (360/ 0.02));

		this.object.position.set(
			this.positionPoints[position].x,
			this.positionPoints[position].y,
			this.positionPoints[position].z
		);
	}

	setOrbitVisible() {
		if(this.orbit.visible) {
			this.orbit.visible = false;
		}
		else {
			this.orbit.visible = true;
		}

		return this.orbit.visible;
	}


	rotate(time, speed) {		// (Second, Hour)
		const rotation = (2 * Math.PI * time * speed) / this.timePeriod.day;

		this.object.children[0].rotation.y = rotation;
	}


// For dat.GUI controler system

	// Making Planet bigger or smaller
	get sizeObject() {
		return this.scale.object;
	}

	set sizeObject(scale) {
		this.scale.object = scale;
		this.object.scale.x = scale;
		this.object.scale.y = scale;
		this.object.scale.z = scale;
	}


	// Making the orbit bigger or smaller
	get sizeOrbit() {
		return this.scale.orbit;
	}

	set sizeOrbit(scale) {
		this.scale.orbit = scale;
		this.orbit.scale.x = scale;
		this.orbit.scale.y = scale;
		this.orbit.scale.z = scale;

		let eclipse = {
			perihelion : this.eclipse.perihelion * scale,
			aphelion : this.eclipse.aphelion * scale,
			inclination : this.eclipse.inclination,
			periapsis : this.eclipse.periapsis,
			ascending : this.eclipse.ascending
		}
		this.positionPoints = setPoints(eclipse, 0.02);
	}
}



// Making points of a eclipse with given it's property
function setPoints(eclipse, deg) {
	let points = [];
	let a = (eclipse.perihelion + eclipse.aphelion) / 2;
	let b = Math.sqrt(a * a - (a - eclipse.perihelion) * (a - eclipse.perihelion));

	// Moving eclipse center to it's right focal points
	let matrixTranslate = new THREE.Matrix4().makeTranslation((eclipse.perihelion - a), 0, 0);

	// Rotate for the inchination ange of the orbit
	let matrixInchination = new THREE.Matrix4().makeRotationX(eclipse.inclination * Math.PI / 180);

	// Rotate for the Longitude of Ascending node (Ω) in degrees
	let matrixAscending = new THREE.Matrix4().makeRotationY(eclipse.ascending * Math.PI / 180);

	// Rotate for the Argument of periapsis (ω) in degrees	
	let matrixPeriapsis = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(0, 1, 0).applyMatrix4(matrixInchination).applyMatrix4(matrixAscending), 
			eclipse.periapsis * Math.PI / 180
		);



	for(let i = 0; i <= 360; i += deg) {
		let point = new THREE.Vector3(
			a * Math.cos(Math.PI * i / 180),
			0,
			b * Math.sin(Math.PI * i / 180)
		);

		
		point.applyMatrix4(matrixTranslate);
		point.applyMatrix4(matrixInchination);
		point.applyMatrix4(matrixAscending);
		point.applyMatrix4(matrixPeriapsis);

		points.push(point);
	}

	return points;
}


// Making Line Orbit with given points
function makeOrbit(points, color) {
	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints(points);

	const material = new THREE.MeshBasicMaterial({color: color});

	const orbit = new THREE.Line(geometry, material);
window.orbit = orbit;
	return orbit;
}


// Making the object using sphere
function makePlanet(diameter, axialTilt, texture) {
	
	const geometry = new THREE.SphereGeometry(diameter/2, 50, 50);
	const material = new THREE.MeshStandardMaterial(texture);

	const object = new THREE.Mesh(geometry, material);
	//object.receiveShadow = true;
	//object.castShadow = true;

	const tilt = new THREE.Object3D();
	tilt.rotation.x += (axialTilt * Math.PI / 180);

	tilt.add(object);

	return tilt;
}