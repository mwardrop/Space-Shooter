/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function BasicShield (engine) {
	this.inherit = Shield;
	this.inherit(engine);

	this.name = "Basic Shield";
	this.description = "A basic shield system.";
	
	this.icon = 'images/shield2.png';
	this.bubble.src = 'images/shieldBubble2.png';
	
	this.current = 100;
	this.capacity = 250;
	this.regenRate = 10;
}

function HeavyShield (engine) {
	this.inherit = Shield;
	this.inherit(engine);

	this.name = "Heavy Shield";
	this.description = "A heavy damage shield system.";
	
	this.icon = 'images/shield3.png';
	this.bubble.src = 'images/shieldBubble3.png';
	
	this.current = 500;
	this.capacity = 500;
	this.regenRate = 20;
}

function FastShield (engine) {
	this.inherit = Shield;
	this.inherit(engine);

	this.name = "Fast Shield";
	this.description = "A fast regeneration shield system.";
	
	this.icon = 'images/shield4.png';
	this.bubble.src = 'images/shieldBubble4.png';
	
	this.current = 125;
	this.capacity = 125;
	this.regenRate = 5;
}

function AdvancedShield (engine) {
	this.inherit = Shield;
	this.inherit(engine);

	this.name = "Advanced Shield";
	this.description = "An advanced shield system capable of taking high damage and quickly recharging.";
	
	this.icon = 'images/shield5.png';
	this.bubble.src = 'images/shieldBubble5.png';
	
	this.current = 500;
	this.capacity = 500;
	this.regenRate = 5;
}