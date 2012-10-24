/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Projectile(engine, owner) {
	this.engine = null;
	this.objType = "Projectile";
	
	this.speed = null;
	this.rotation = null;
	this.owner = null;
	this.payload = null;
	this.coolDown = null;
	this.img = new Image();
	this.img.src = "images/projectile1.png";
	
	this.renderX = null;
	this.renderY = null;
	
	this.plotX = null;
	this.plotY = null;
	
	this.isAntiMatter = false;
	
	this.lifetime = 0;
	
	this.dispose = false;
	
	this.__construct = function (engine, owner) {
		this.engine = engine;
		this.owner = owner;
	}
	
	this.launch = function (rotation, x, y) {
		this.rotation = rotation;
		this.renderX = x;
		this.renderY = y;
	}
	
	this.move = function () {
	
		this.plotX = Math.round(Math.round(this.speed / 10) * Math.cos(this.rotation * Math.PI / 180));
		this.plotY = Math.round(Math.round(this.speed / 10) * Math.sin(this.rotation * Math.PI / 180));
		
		this.renderX += this.plotX;
		this.renderY += this.plotY;
		
		this.plotX = ((this.img.width / 2) * -1) - this.plotX;
		this.plotY = ((this.img.height / 2) * -1) + this.plotY;
	}
	
	this.render = function () {
		try {
			this.engine.ctx.save();  
			
			this.engine.ctx.translate(this.renderX - this.engine.viewPort.xOffset, this.renderY - this.engine.viewPort.yOffset); 
			this.engine.ctx.rotate(this.rotation * Math.PI / 180); 
			this.engine.ctx.drawImage(this.img, this.plotX, this.plotY);
			
			this.engine.ctx.restore();  
			
		} catch(err) { console.debug(err); }
	}
	
	this.collision = function (obj) {
		this.dispose = true;
	}
	
	this.checkLifetime = function () {
		this.lifetime++;
		if(this.lifetime > this.engine.projectileLifetime) {
			this.dispose = true;
		}
	}
	
	this.__construct(engine, owner);
}