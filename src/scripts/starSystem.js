import AstronomicalObject from './AstronomicalObject.js';

export function makeStarSystem(starSystem, solarSystemData) {

	// Making Stars (One solarSystem may have more then 1 star)
	const stars = solarSystemData.Stars.map(starData => {
		const star = new AstronomicalObject(starData);
		starSystem.add(star.astronomicalObject);

		return star;
	});
	

	// Making Planets
	const planets = solarSystemData.Planets.map(planetData => {
		const planet = new AstronomicalObject(planetData);
		starSystem.add(planet.astronomicalObject);

		return planet;
	});


	// Returning all stars and all Planets
	return starSystem = {stars, planets};
}


