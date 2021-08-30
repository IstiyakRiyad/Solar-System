import * as THREE from 'three';

// Webpack Module bundler 
// Bundle images
require.context('../assets/image/', true, /\.(jpg|png|svg)$/i);

// Bundle Json files
require.context('../assets/data/', false, /\.(json|JSON)$/);


// Loading Json file
export async function loadJSON(fileName) {
	const src = await import(`../assets/data/${fileName}.json`);

	return fetch(src.default)
	.then(file => file.json());
}


// Loading Path for bundler
export function loadPath(object, button) {
	return new Promise(async resolve => {
		// Changing actual path of background textures
		for(let i = 0; i < object.Background.length; i++) {
			const src = await import(`../assets/image/background/${object.Background[i]}`);
			
			object.Background[i] = src.default;
		}

		for(let i = 0; i < object.Stars.length; i++) {
			const src = await import(`../assets/image/texture/${object.Stars[i].texture.path}`);

			object.Stars[i].texture.path = src.default;
		}

		for(let i = 0; i < object.Planets.length; i++) {
			const src = await import(`../assets/image/texture/${object.Planets[i].texture.path}`);

			object.Planets[i].texture.path = src.default;
		}

		// Button

		const src = await import(`../assets/image/Controller/${button.url}`);
		button.url = src.default;

		resolve([object, button]);
	});
}


export function loadTexture(object) {

	// Load the background
	const cubeTextureLoader = new THREE.CubeTextureLoader();

	object.Background = cubeTextureLoader.load(object.Background);



	// Load Linear Texture
	const textureLoader = new THREE.TextureLoader();

	// Load the texture of Stars
	object.Stars.forEach(star => {
		star.texture.emissiveMap = textureLoader.load(star.texture.path);
		delete star.texture.path;
	});


	// Load the texture for Planets
	object.Planets.forEach(planet => {
		planet.texture.map = textureLoader.load(planet.texture.path);
		delete planet.texture.path;
	});
}