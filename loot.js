/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Loot(engine) {

	this.engine = null
	this.img = new Image();
	this.objType = "Loot";
	
	this.invSlot = null;
	
	this.renderX = null;
	this.renderY = null;
	
	this.lifetime = 0;
	
	this.dispose = false;
	
	this.__construct = function (engine) {
		this.engine = engine;
	}
	
	this.checkLifetime = function () {
		this.lifetime++;
		if(this.lifetime > this.engine.lootLifetime) {
			this.dispose = true;
		}
	}
	
	this.render = function () {
		try {
			this.engine.ctx.save();  
			
			this.engine.ctx.drawImage(this.img, (this.renderX - this.engine.viewPort.xOffset), (this.renderY - this.engine.viewPort.yOffset));
			
			this.engine.ctx.restore();  
			
		} catch(err) { console.debug(err); }
	}
	
	this.__construct(engine);
}