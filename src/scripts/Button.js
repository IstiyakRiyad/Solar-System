export default class Button {
	constructor(container, buttonPosition, redirectFunction) {
		this.redirectFunction = redirectFunction;
		this.container = container;
		this.buttonPosition = buttonPosition;
		this.name = '';
		this.color = '#305b9a';
		this.opacity = 1;
		this.deltaTime = 0;
		this.previousTime = 0;
	}

	addFunction(redirect) {
		this.redirectFunction = redirect;

		return this;
	}

	addName(name) {
		this.name = name;

		return this;
	}

	addColor(color) {
		this.color = color;

		return this;
	}

	addIcon(icon, fontfamily = 'fontawesome') {
		this.icon = icon;
		this.fontfamily = fontfamily;

		return this;
	}

	// Adding image. Here image must be loaded before call this function.
	addImage(img, sX, sY, sW, sH) {
		this.image = img;


		if(sX !== undefined && sY !== undefined && sW !== undefined && sH !== undefined) {
			this.imageSource = [sX, sY, sW, sH];
		}
		else {
			this.imageSource = [0, 0, this.image.width, this.image.height];
		}

		return this;
	}

	addDeltaTime(time) {
		this.deltaTime = time;

		return this;
	}

	makeBufferButton() {
		this.buffer = document.createElement('canvas');
		const context = this.buffer.getContext('2d');

		if(this.container.canvas.width < this.container.canvas.height) {
			this.buffer.width = this.container.canvas.width;
			this.buffer.height = 1.45 * this.buffer.width;
		}
		else {
			this.buffer.height = this.container.canvas.height;
			this.buffer.width = this.buffer.height / 1.45;
		}

		// Setting the opacity
		context.globalAlpha = this.opacity;

		if(this.opacity < 1) {
			this.opacity += 0.1;
		}

		// Calculating all button height
		const buttonYPos = this.buffer.height / 2;

		// Calculating image width in buffer
		const imageWidth = this.imageSource[2] * this.buffer.width / this.imageSource[3];

		// Drawing the Image as a button
		if(this.image) {
			context.drawImage(
				this.image,
				this.imageSource[0],
				this.imageSource[1],
				this.imageSource[2],
				this.imageSource[3],
				(this.buffer.width - imageWidth) / 2,
				0,
				imageWidth,
				this.buffer.width
			);
		}

		// Drawing the icon
		else if(this.icon) {
			context.fillStyle = this.color;
			context.font = this.buffer.width + "px " + this.fontfamily; // cursive";  
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(this.icon, 
				this.buffer.width / 2, 
				buttonYPos - 0.225 * this.buffer.width,
				this.buffer.width);
		}

		// Writing the name of the button
		context.globalAlpha = 1;
		context.fillStyle = this.color;
		context.font = Math.round(this.buffer.width * 0.3) +"px cursive";
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(this.name, 
			this.buffer.width / 2, 
			buttonYPos + 0.575 * this.buffer.width,
			this.buffer.width);
	} 

	drawButton() {
		// Making buffer if it's not exist already or it is in animation position
		if(!this.buffer || this.opacity < 1) {
			this.makeBufferButton();
		}

		// Finding width and height of the container
		let width, height, xPos, yPos;

		if(this.container.canvas.width < this.container.canvas.height) {
			width = this.container.canvas.width;
			height = this.container.canvas.height;
		}
		else {
			width = this.container.canvas.height;
			height = this.container.canvas.width;
		}

		// Calculating button height
		const buttonHeightPos = (height / this.container.buttons.length) * (this.buttonPosition + 0.5);

		if(this.container.canvas.width < this.container.canvas.height) {
			xPos = 0;
			yPos = buttonHeightPos - 0.5 * this.buffer.height;
		}
		else {
			xPos = buttonHeightPos - 0.5 * this.buffer.width;
			yPos = 0;
		}

		this.container.context.drawImage(
			this.buffer,
			xPos,
			yPos
		);
	}

	update() {
		// Find the delta time value and save current time value to previousTime

		let currentTime = performance.now();
		let deltaTime = currentTime - this.previousTime;

		if(this.deltaTime < deltaTime) {
			this.previousTime = currentTime;

			this.redirectFunction(this);
		}
		this.opacity = 0.5;
	}
}