/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function NPC(engine, ship) {
	this.engine = null;
	this.ship = null;
	
	this.target = null;
	
	this.distance = null;
	
	this.rotation = null;
	this.rCount = 0;
	this.rotationLock = false;
	
	this.enabled = true;
	
	this.__construct = function (engine, ship) {
		this.engine = engine;
		this.ship = ship;
	}
	
	this.move = function () {
		this.findTarget();
		if(this.target != null && this.enabled == true) {
			this.adjustRotation();
			this.adjustSpeed();
		}
		if(this.rotationLock == true) { this.attack(); }
	}
	
	this.attack = function () {
		this.ship.doAction(0);
	}
	
	this.adjustRotation = function () {
		var coord = [ this.ship.renderX, this.ship.renderY ];
		var target = [ this.engine.shipManager.player[0].renderX, this.engine.shipManager.player[0].renderY ];
		
		var rotation = this.engine.math.getAngle(coord, target);
		
		// This gives a 90 degree buffer zone around the 0 / 360 line, keeps the rotation from reversing when crossing
		if(this.rotation > 315 && rotation < 45) { this.rCount++; }
		if(this.rotation < 45 && rotation > 315) { this.rCount--; }
		
		this.rotation = rotation;
		
		if(Math.abs(this.rotation - this.ship.rotation) > 10) {
			if(this.rotation + (this.rCount * 360) > this.ship.rotation) {
				this.ship.rotate("right");
			} else if(this.rotation + (this.rCount * 360) < this.ship.rotation){
				this.ship.rotate("left");
			}
			this.rotationLock = false;
		} else {
			this.rotationLock = true;
		}
		
		
	}
	
	this.adjustSpeed = function () {
		this.ship.increaseSpeed();
	}
	
	this.findTarget = function () {
		// Todo: find more targets
		this.target = this.engine.shipManager.player[0];
	}
	
	this.__construct(engine, ship);
}