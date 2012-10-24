/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Bullet (engine, owner) {
	this.inherit = Projectile;
	this.inherit(engine, owner);

	this.speed = 200;
	this.payload = 50;
	this.coolDown = 20;
	this.img.src = "images/projectile1.png";
}

function AntiMatterBullet (engine, owner) {
	this.inherit = Projectile;
	this.inherit(engine, owner);

	this.speed = 200;
	this.payload = 50;
	this.coolDown = 20;
	this.img.src = "images/projectile2.png";

	this.isAntiMatter = true;
}