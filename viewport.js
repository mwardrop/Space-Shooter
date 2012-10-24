/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function ViewPort(engine) {

	this.engine = null;
	
	this.xOffset = 0;
	this.yOffset = 0;
	
	this.scrollBounds = 200;
	
	this.height = 600;
	this.width = 1200;
	
	this.__construct = function(engine) {
		this.engine = engine;
	}
	
	this.scrollXY = function () {
	if(this.engine.shipManager.player[0]) {
		if(this.engine.shipManager.player[0].renderX > ((this.width - this.scrollBounds) + this.xOffset)) {
			this.xOffset = (this.engine.shipManager.player[0].renderX - (this.width - this.scrollBounds));
		}
		if((this.engine.shipManager.player[0].renderX - this.xOffset) < this.scrollBounds) {
			this.xOffset = (this.engine.shipManager.player[0].renderX - this.scrollBounds);
		}
		
		if(this.engine.shipManager.player[0].renderY > ((this.height - this.scrollBounds) + this.yOffset)) {
			this.yOffset = (this.engine.shipManager.player[0].renderY - (this.height - this.scrollBounds));
		}
		if((this.engine.shipManager.player[0].renderY  - this.yOffset) < this.scrollBounds) {
			this.yOffset = (this.engine.shipManager.player[0].renderY - this.scrollBounds);
		}
		}
	}
	this.__construct(engine);
}