export default class TextContainer {
	constructor(domElement, cssClass) {
		this.domElement = domElement;
		this.cssClass = cssClass;
		this.text = '';
		this.alpha = 0;
		this.color = '#fff'

		// Creating Canvas Element and push it to documnet
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.domElement.appendChild(this.canvas);

		// Adding the CSS class 
		if(this.cssClass) {
			this.addClass(this.cssClass);
		}

		// Resize Event Listener
		window.addEventListener('resize', event => {
			this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
			this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;
		});

		this.canvas.addEventListener('touchstart', event => {
			event.preventDefault();
		});
	}

	// Adding css class if aleady exist, remove the class and push new class
	addClass(cssClass) {
		if(this.cssClass !== undefined) {
			this.canvas.classList.remove(this.cssClass);
			this.cssClass = cssClass;
		}

		this.canvas.classList.add(this.cssClass);
		this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
		this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;
	}

	addColor(color) {
		this.color = color;

		return this;
	}


	
	// Showing the text which is provided 
	showText(text) {
		this.text = text;
		this.alpha = 1;

		return this;
	}

	writeText(deltaTime) {
		this.context.globalAlpha = this.alpha;
		this.context.font = this.canvas.height + "px cursive";
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillStyle = this.color;
		this.context.fillText(
			this.text, 
			this.canvas.width / 2, 
			this.canvas.height / 2,
			this.canvas.width - this.canvas.height * 2);
		this.alpha -= deltaTime;
	}


	update(deltaTime) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if(this.alpha > 0) {
			this.writeText(deltaTime);
		}
	}
}