import TextContainer from './TextContainer.js';
import ButtonContainer from './ButtonContainer.js';

export default class Controller {
	constructor(domElement) {
		this.domElement = domElement;
		this.textContainer = [];
		this.buttonContainer = [];
	}

	addContainer(type, cssClass) {
		if(type === "text") {
			const container = new TextContainer(this.domElement, cssClass);

			this.textContainer.push(container);

			return container;
		}

		else if(type === "button") {
			const container = new ButtonContainer(this.domElement, cssClass);

			this.buttonContainer.push(container);

			return container;
		}
	}


	update(deltaTime = 0.016) {
		this.textContainer.forEach(container => {
			container.update(deltaTime);
		});

		this.buttonContainer.forEach(container => {
			container.update(deltaTime);
		});
	}
}