/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function Shield(engine) {
	this.objType = "Shield";
	this.engine = null;
	
	this.icon = 'images/shield1.png';
	
	this.bubble = new Image();
	this.bubble.src = 'images/shieldBubble1.png';
	
	this.current = 0;
	this.capacity = 0;
	this.regenRate = 0;
	this.regenCounter = 0;
	
	this.rotate = 0;
	this.hitCounter = 0;
	this.hitCountdown = 10;
	
	this.interfaceUID = null;
	
	this.__construct = function (engine) {
		this.engine = engine;
	}
	
	this.render = function (x, y) {
		if(this.regenCounter >= this.regenRate && this.current < this.capacity) {
			this.current++;
			this.regenCounter = 0;
		}
		this.regenCounter++;
	
		this.rotate += Math.floor(Math.random()*11);
		if(this.rotate >= 360) {
			this.rotate = 0;
		}
		
		if(this.hitCounter > 0) {
			this.engine.ctx.rotate(this.rotate * Math.PI / 180); 
			this.engine.ctx.drawImage(this.bubble, x, y);
			this.hitCounter--;
		}
	}
	
	this.__construct(engine);
	
}