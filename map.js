/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Map(engine) {

	this.engine = null;
	this.background = new Image();
	
	
	this.__construct = function (engine) {
		this.engine = engine;
		this.background.src = "images/starfield.jpg";
	}
	
	this.render = function() {
		this.renderBackground();
	}
	
	this.renderBackground = function () {
		try {
		
			// The background moves based on the viewport offset, we render 4 copies of the offset background,
			// one for each corner of the viewport, this causes the scrolling background effect.
			var quadrants = new Array(
				Math.floor(this.engine.viewPort.xOffset / this.background.width),
				Math.floor((this.engine.viewPort.xOffset + this.engine.viewPort.width) / this.background.width),
				Math.floor(this.engine.viewPort.yOffset / this.background.height),
				Math.floor((this.engine.viewPort.yOffset + this.engine.viewPort.height) / this.background.height)
			);
			
			this.engine.ctx.drawImage(this.background, 
				((quadrants[0] * this.background.width)) - this.engine.viewPort.xOffset, ((quadrants[2] * this.background.height)) - this.engine.viewPort.yOffset);
			this.engine.ctx.drawImage(this.background, 
				((quadrants[1] * this.background.width)) - this.engine.viewPort.xOffset, ((quadrants[2] * this.background.height)) - this.engine.viewPort.yOffset);
			
			this.engine.ctx.drawImage(this.background, 
				((quadrants[0] * this.background.width)) - this.engine.viewPort.xOffset, ((quadrants[3] * this.background.height)) - this.engine.viewPort.yOffset);
			this.engine.ctx.drawImage(this.background, 
				((quadrants[1] * this.background.width)) - this.engine.viewPort.xOffset, ((quadrants[3] * this.background.height)) - this.engine.viewPort.yOffset);		
		
		} catch(err) { console.debug(err); }
	}
	
	this.__construct(engine);
}