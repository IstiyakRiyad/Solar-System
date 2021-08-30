import Controller from './Controller.js';



export function buttonController(starSystem, world, buttonsData) {

	const controls = new Controller(document.body);


	const topContainer = controls.addContainer("text", "topCanvas");
	const leftContainer = controls.addContainer("button", "leftCanvas");
	const rightContainer = controls.addContainer("button", "rightCanvas");
	const slideContainer = controls.addContainer("button", "slideCanvas");


	// Adding buttons
	const image = new Image();
	image.src = buttonsData.url;

	// Buttons
	let leftButtons = [];
	let rightButtons = [];
	let targetButtons =[];

	image.addEventListener('load', () => {

		buttonsData.buttons.forEach((button, i) => {
			if(i % 2) {
				leftButtons.push(
					leftContainer.addButton()
					.addName(button.name)
					.addColor(button.color)
					.addImage(
						image, 
						button.x, 
						button.y, 
						button.width, 
						button.height)
					.addDeltaTime(button.deltaTime)
				);
			}

			else {
				rightButtons.push(
					rightContainer.addButton()
					.addName(button.name)
					.addColor(button.color)
					.addImage(
						image, 
						button.x, 
						button.y, 
						button.width, 
						button.height)
					.addDeltaTime(button.deltaTime)
				);
			}
		});

		targetButtons = buttonsData.objects.map((buttonData, i) => {
			return slideContainer.addButton(button => {
				world.controls.target = world.starSystem.planets[i - 1].object.position;
				world.target = world.starSystem.planets[i - 1];
				slideContainer.canvas.style.transform = "translateX(-110%)";
			})
			.addName(buttonData.name)
			.addColor(buttonData.color)
			.addImage(
				image, 
				buttonData.x, 
				buttonData.y, 
				buttonData.width, 
				buttonData.height)
			.addDeltaTime(buttonData.deltaTime);
		});

		targetButtons[0].addFunction(button => {
			world.controls.target = world.starSystem.stars[0].object.position;
			world.target = world.starSystem.stars[0];
			slideContainer.canvas.style.transform = "translateX(-110%)";
		});

		leftButtons[0].addFunction(button => {
			if(starSystem.stars[0].sizeObject - 0.1 > 0) {
				starSystem.stars[0].sizeObject -= 0.1;
			}

			topContainer.addColor(button.color);
			topContainer.showText("Now Sun is " + starSystem.stars[0].sizeObject.toFixed(2) + " times bigger");
		});

		let planetsDiameter = 1;
		leftButtons[1].addFunction(button => {
			if(planetsDiameter - 10 > 0) {
				planetsDiameter -= 10;
			}

			starSystem.planets.forEach(planet => {
	                planet.sizeObject = planetsDiameter;
	        });

			topContainer.addColor(button.color);
			topContainer.showText("Now Diameter of planets are " + planetsDiameter.toFixed(2) + " times bigger");
		});

		leftButtons[2].addFunction(button => {
			if(world.timePeriod.year - 1 > 0) {
				world.timePeriod.year -= 1;
			}

			topContainer.addColor(button.color);
			topContainer.showText("Time period of planets are " + world.timePeriod.year.toFixed(2) + " days/s");
		});

		leftButtons[3].addFunction(button => {
			if(world.timePeriod.day - 1 > 0) {
				world.timePeriod.day -= 1;
			}

			topContainer.addColor(button.color);
			topContainer.showText("Time period of planets are " + world.timePeriod.day.toFixed(2) + " hours/s");
		});

		leftButtons[4].addFunction(button => {
			if(slideContainer.canvas.style.transform === 'translateX(0%)') {
				slideContainer.canvas.style.transform = 'translateX(-110%)'
			}
			else {
				slideContainer.canvas.style.transform = 'translateX(0%)';
			}
		});


		rightButtons[0].addFunction(button => {
			if(starSystem.stars[0].sizeObject + 0.1 > 0) {
				starSystem.stars[0].sizeObject += 0.1;
			}

			topContainer.addColor(button.color);
			topContainer.showText("Now Sun is " + starSystem.stars[0].sizeObject.toFixed(2) + " times bigger")
		});

		rightButtons[1].addFunction(button => {
			if(planetsDiameter + 10 > 0) {
				planetsDiameter += 10;
			}

			starSystem.planets.forEach(planet => {
	                planet.sizeObject = planetsDiameter;
	        });

			topContainer.addColor(button.color);
			topContainer.showText("Now Diameter of planets are " + planetsDiameter.toFixed(2) + " times bigger");
		});

		rightButtons[2].addFunction(button => {
			if(world.timePeriod.year + 1 > 0) {
				world.timePeriod.year += 1;
			}

			topContainer.addColor(button.color);
			topContainer.showText("Time period of planets are " + world.timePeriod.year.toFixed(2) + " days/s");
		});

		rightButtons[3].addFunction(button => {
			if(world.timePeriod.day + 1 > 0) {
				world.timePeriod.day += 1;
			}

			topContainer.addColor(button.color);
			topContainer.showText("Time period of planets are " + world.timePeriod.day.toFixed(2) + " hours/s");
		});

		rightButtons[4].addFunction(button => {
			let visible;
			starSystem.planets.forEach(planet => {
	            visible = planet.setOrbitVisible();
	        });

			if(visible) {
				topContainer.addColor(button.color);
				topContainer.showText("Orbit is visible");
			}
			else {
				topContainer.addColor(button.color);
				topContainer.showText("Orbit is not visible");
			}
		});
	});
	








// End

	topContainer.showText("Welcome to the world of SolarSystem");

/*
	// Sun Diameter button
	const sunImg = new Image();
	sunImg.src = "../img/sun(-).png";

	sunImg.addEventListener('load', ()=> {
		leftContainer.addButton(button => {
			if(starSystem.stars[0].sizeObject - 0.1 > 0) {
				starSystem.stars[0].sizeObject -= 0.1;
			}

			topContainer.showText("Now Sun is " + starSystem.stars[0].sizeObject.toFixed(2) + " times bigger")
		}).addName("Sun(-)").addColor("#D9734E").addImage(sunImg, 0, 0, 50, 50).addDeltaTime(10);
	});

	const sunImg2 = new Image();
	sunImg2.src = "../img/sun(+).png";

	sunImg2.addEventListener('load', ()=> {
		rightContainer.addButton(button => {
			if(starSystem.stars[0].sizeObject + 0.1 > 0) {
				starSystem.stars[0].sizeObject += 0.1;
			}

			topContainer.showText("Now Sun is " + starSystem.stars[0].sizeObject.toFixed(2) + " times bigger")
		}).addName("Sun(+)").addColor("#D9734E").addImage(sunImg2, 0, 0, 50, 50).addDeltaTime(10);
	});




	// Time Period (Solar year)
	leftContainer.addButton(button => {
		if(world.timePeriod.year - 1 > 0) {
			world.timePeriod.year -= 1;
		}

		topContainer.showText("Time period of planets are " + world.timePeriod.year.toFixed(2) + " days/s");
	}).addName("TimePeriod(-)").addColor("#D9A679").addIcon('\uf017').addDeltaTime(50);


	rightContainer.addButton(button => {
		if(world.timePeriod.year + 1 > 0) {
			world.timePeriod.year += 1;
		}

		topContainer.showText("Time period of planets are " + world.timePeriod.year.toFixed(2) + " days/s");
	}).addName("TimePeriod(+)").addColor("#D9A679").addIcon('\uf017').addDeltaTime(50);




	// Time Period (Solar Day)
	leftContainer.addButton(button => {
		if(world.timePeriod.day - 1 > 0) {
			world.timePeriod.day -= 1;
		}

		topContainer.showText("Time period of planets are " + world.timePeriod.day.toFixed(2) + " hours/s");
	}).addName("TimePeriod(-)").addColor("#D9A679").addIcon('\uf017').addDeltaTime(50);


	rightContainer.addButton(button => {
		if(world.timePeriod.day + 1 > 0) {
			world.timePeriod.day += 1;
		}

		topContainer.showText("Time period of planets are " + world.timePeriod.day.toFixed(2) + " hours/s");
	}).addName("TimePeriod(+)").addColor("#D9A679").addIcon('\uf017').addDeltaTime(50);




	// Resize of the planets diameter
	let planetsDiameter = 1;
	leftContainer.addButton(button => {
		if(planetsDiameter - 10 > 0) {
			planetsDiameter -= 10;
		}

		starSystem.planets.forEach(planet => {
                planet.sizeObject = planetsDiameter;
        });

		topContainer.showText("Now Diameter of planets are " + planetsDiameter.toFixed(2) + " times bigger")
	}).addName('Planets(-)').addColor("#F8DAA0").addIcon('\uf78c').addDeltaTime(50);


	rightContainer.addButton(button => {
		if(planetsDiameter + 10 > 0) {
			planetsDiameter += 10;
		}

		starSystem.planets.forEach(planet => {
                planet.sizeObject = planetsDiameter;
        });

		topContainer.showText("Now Diameter of planets are " + planetsDiameter.toFixed(2) + " times bigger");
	}).addName('Planets(+)').addColor("#F8DAA0").addIcon('\uf31e').addDeltaTime(50);



	// Resize of the planets Orbit Diameter
	let planetsOrbit = 1;
	leftContainer.addButton(button => {
		if(planetsOrbit - 0.1 > 0) {
			planetsOrbit -= 0.1;
		}

		starSystem.planets.forEach(planet => {
                planet.sizeOrbit = planetsOrbit;
        });

		topContainer.showText("New Diameter of orbtis are " + planetsOrbit.toFixed(2) + " times bigger")
	}).addName('Orbits(+)').addColor("#F8DAA0").addIcon('\uf422').addDeltaTime(20);


	rightContainer.addButton(button => {
		if(planetsOrbit + 0.1 > 0) {
			planetsOrbit += 0.1;
		}

		starSystem.planets.forEach(planet => {
                planet.sizeOrbit = planetsOrbit;
        });

		topContainer.showText("New Diameter of orbtis are " + planetsOrbit.toFixed(2) + " times bigger")
	}).addName('Orbits(+)').addColor("#C2BC8C").addIcon('\uf424').addDeltaTime(20);


	rightContainer.addButton(button => {
		let visible;
		starSystem.planets.forEach(planet => {
               visible = planet.setOrbitVisible();
        });

		if(visible) {
			topContainer.showText("Orbit is visible");
		}
		else {
			topContainer.showText("Orbit is not visible");
		}
	}).addName('OrbitVisible').addIcon('\uf111').addDeltaTime(200);




	// Target a specific planet
	const img = new Image();
	img.src = "../img/solarObjects.png";

	img.addEventListener('load', ()=> {

		const target = 
		leftContainer.addButton(button => {
			if(slideContainer.canvas.style.transform === 'translateX(0%)') {
				slideContainer.canvas.style.transform = 'translateX(-110%)'
			}
			else {
				slideContainer.canvas.style.transform = 'translateX(0%)';
			}
		}).addName("Target").addImage(img, 21, 44, 180, 177).addDeltaTime(200);



		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.stars[0].object.position;
			world.target = world.starSystem.stars[0];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Sun").addColor("#f8daa0").addImage(img, 21, 44, 180, 177).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[0].object.position;
			world.target = world.starSystem.planets[0];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Venus").addColor("#f8daa0").addImage(img, 207, 120, 21, 21).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[1].object.position;
			world.target = world.starSystem.planets[1];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Mercury").addColor("#f8daa0").addImage(img, 236, 104, 49, 49).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[2].object.position;
			world.target = world.starSystem.planets[2];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Earth").addColor("#f8daa0").addImage(img, 293, 101, 56, 56).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[3].object.position;
			world.target = world.starSystem.planets[3];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Mars").addColor("#f8daa0").addImage(img, 370, 104, 53, 52).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[4].object.position;
			world.target = world.starSystem.planets[4];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Jupitar").addColor("#f8daa0").addImage(img, 435, 79, 104, 104).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[5].object.position;
			world.target = world.starSystem.planets[5];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Satarn").addColor("#f8daa0").addImage(img, 540, 90, 149, 77).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[6].object.position;
			world.target = world.starSystem.planets[6];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Uranus").addColor("#f8daa0").addImage(img, 691, 101, 56, 57).addDeltaTime(200);

		slideContainer.addButton(button => {
			world.controls.target = world.starSystem.planets[7].object.position;
			world.target = world.starSystem.planets[7];
			slideContainer.canvas.style.transform = "translateX(-110%)";
			target.addName(button.name);
			target.addImage(button.image, ...button.imageSource)
			target.makeBufferButton();
		}).addName("Neptune").addColor("#f8daa0").addImage(img, 755, 107, 47, 46).addDeltaTime(200);
	});


	*/


	return controls;
}