/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Weapon (engine, owner) {
	this.engine = null;
	this.owner = null;
	
	this.objType = "Weapon";
	
	this.icon = null;
	
	this.interfaceUID = null;
	
	this.__construct = function (engine, owner) {
		this.engine = engine;
		this.owner = owner;
	}
	
	this.attack = function () {
		var projectile = new this.projectile(this.engine, this.owner);
		projectile.launch(this.owner.rotation, this.owner.renderX, this.owner.renderY);
		projectile.move();
		if(this.owner.npc) { 
			this.owner.attackCoolDown = (projectile.coolDown * 2); 
		} else {
			this.owner.attackCoolDown = projectile.coolDown;
		}
		this.engine.projectiles.push(projectile);
	}
	
	this.__construct(engine, owner);
}