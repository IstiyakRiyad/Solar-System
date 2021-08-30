import Button from './Button.js';

export default class ButtonContainer {
	constructor(domElement, cssClass) {
		this.domElement = domElement;
		this.cssClass = cssClass;
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.domElement.appendChild(this.canvas);

		// Number of buttons
		this.buttons = [];


		// Event methods
		this.clickPosition = {
			offsetX: false,
			offsetY: false
		};

		this.touchPositions = [];

		// Adding CSS classes
		if(this.cssClass) {
			this.addClass(this.cssClass);
		}

		// Resize Event Listener
		window.addEventListener('resize', event => {
			this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
			this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;

			// Redraw all the buffer of the buttons
			this.buttons.forEach(button => {
				button.makeBufferButton();
			});
		});

		// Event listener for mouse and touch
		this.canvas.addEventListener('mousedown', event => {
			this.clickPosition.offsetX = event.offsetX;
			this.clickPosition.offsetY = event.offsetY;
		});

		window.addEventListener('mouseup', event => {
			this.clickPosition.offsetX = false;
			this.clickPosition.offsetY = false;
		});

		this.canvas.addEventListener('touchstart', event => {
			this.touchPositions = event.touches;
		});

		this.canvas.addEventListener('touchend', event => {
			this.touchPositions = event.touches;
			event.preventDefault();
		});
	}

	addClass(cssClass) {
		if(this.cssClass) {
			this.canvas.classList.remove(this.cssClass);
			this.cssClass = cssClass;
		}

		this.canvas.classList.add(this.cssClass);
		this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
		this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;
	}

	addButton(redirectFunction) {
		const button = new Button(this, this.buttons.length, redirectFunction);

		this.buttons.push(button);

		return button;
	}

	update(deltaTime) {
		let deltaHeight;

		// When buttons are in the vertical direction
		if(this.canvas.width < this.canvas.height) {

			deltaHeight = (this.canvas.height / this.buttons.length);

			// Check for mouse click event
			if(this.clickPosition.offsetX && this.clickPosition.offsetY) {
				const buttonNumber = Math.floor(this.clickPosition.offsetY / deltaHeight);
				const buttonHeightPos = (buttonNumber + 0.5) * deltaHeight;

				if(Math.abs(buttonHeightPos - this.clickPosition.offsetY) < this.canvas.width ) {
					this.buttons[buttonNumber].update();
				}
			}

			// Check for touch event
			for(let i = 0; i < this.touchPositions.length; i++) {
				const posY = window.devicePixelRatio * (this.touchPositions[i.toString()].pageY - this.touchPositions[i.toString()].target.offsetTop);

				const buttonNumber = Math.floor(posY / deltaHeight);
				const buttonHeightPos = (buttonNumber + 0.5) * deltaHeight;
				
				if(Math.abs(buttonHeightPos - posY) < this.canvas.width + this.touchPositions[i.toString()].radiusY) {
					this.buttons[buttonNumber].update();
				}
			}
		}

		// When buttons are in the horizontal direction
		else {
			deltaHeight = (this.canvas.width / this.buttons.length);

			// Check for mouse click event
			if(this.clickPosition.offsetX && this.clickPosition.offsetY) {
				const buttonNumber = Math.floor(this.clickPosition.offsetX / deltaHeight);
				const buttonHeightPos = (buttonNumber + 0.5) * deltaHeight;

				if(Math.abs(buttonHeightPos - this.clickPosition.offsetX) < this.canvas.height * 0.60 ) {
					this.buttons[buttonNumber].update();
				}
			}

			// Check for touch event
			for(let i = 0; i < this.touchPositions.length; i++) {
				const posX = window.devicePixelRatio * (this.touchPositions[i.toString()].pageX - this.touchPositions[i.toString()].target.offsetLeft);
				
				const buttonNumber = Math.floor(posX / deltaHeight);
				const buttonHeightPos = (buttonNumber + 0.5) * deltaHeight;
				
				if(Math.abs(buttonHeightPos - posX) < 0.60 * this.canvas.height + this.touchPositions[i.toString()].radiusX) {
					this.buttons[buttonNumber].update();
				}
			}
		}
		

		// Clear the container and draw all the buttons
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.buttons.forEach(button => {
			button.drawButton();
		});
	}
}