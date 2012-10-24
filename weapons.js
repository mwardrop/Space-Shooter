/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Cannon (engine, owner) {
	this.inherit = Weapon;
	this.inherit(engine, owner);

	this.name = "Cannon";
	this.description = "Entry level cannon.";
	this.icon = "images/weapon1.png";
	
	this.projectile = Bullet;
}

function AntiMatterCannon (engine, owner) {
	this.inherit = Weapon;
	this.inherit(engine, owner);

	this.name = "Anti Matter Cannon";
	this.description = "Entry level anti matter cannon";
	this.icon = "images/weapon2.png";
	
	this.projectile = AntiMatterBullet;
}