/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Falcon (engine, npc) {
	this.inherit = Ship;
	this.inherit(engine, npc);

	this.height = 60;
	this.width = 60;
	this.health = 250;
	this.maxHealth = 250;
	this.armor = 100;
	this.level = 10;
	this.weight = 10;
	this.maxSpeed = 100;
	this.thrusters["front"] = 5;
	this.thrusters["back"] = 5;
	this.thrusters["side"] = 3;
	this.acceleration = 3;
	
	this.uid = this.engine.shipManager.getUID();
	
	this.img.src = 'images/falcon.png';
	
	this.name = "Falcon";
	
	this.hitBox = [
		[7, 35],
		[20, 47],
		[44, 47],
		[53, 39],
		[53, 21],
		[44, 12],
		[20, 12],
		[7, 25],
		[7, 5]
	];
}

function Bulldog (engine, npc) {
	this.inherit = Ship;
	this.inherit(engine, npc);

	this.height = 60;
	this.width = 60;
	this.health = 1000;
	this.maxHealth = 1000;
	this.armor = 100;
	this.level = 10;
	this.weight = 10;
	this.maxSpeed = 100;
	this.thrusters["front"] = 5;
	this.thrusters["back"] = 5;
	this.thrusters["side"] = 3;
	this.acceleration = 3;
	
	this.uid = this.engine.shipManager.getUID();
	
	this.img.src = 'images/bulldog.png';
	
	this.name = "Bulldog";
	
	this.hitBox = [
		[7, 35],
		[20, 47],
		[44, 47],
		[53, 39],
		[53, 21],
		[44, 12],
		[20, 12],
		[7, 25],
		[7, 5]
	];
}

function RoseThorne (engine, npc) {
	this.inherit = Ship;
	this.inherit(engine, npc);

	this.height = 60;
	this.width = 60;
	this.health = 1000;
	this.maxHealth = 1000;
	this.armor = 100;
	this.level = 10;
	this.weight = 10;
	this.maxSpeed = 100;
	this.thrusters["front"] = 5;
	this.thrusters["back"] = 5;
	this.thrusters["side"] = 3;
	this.acceleration = 3;
	
	this.uid = this.engine.shipManager.getUID();
	
	this.img.src = 'images/rosethorne.png';
	
	this.name = "Rose Thorne";
	
	this.hitBox = [
		[7, 35],
		[20, 47],
		[44, 47],
		[53, 39],
		[53, 21],
		[44, 12],
		[20, 12],
		[7, 25],
		[7, 5]
	];
}

function Drone (engine, npc) {
	this.inherit = Ship;
	this.inherit(engine, npc);

	this.height = 60;
	this.width = 60;
	this.health = 100;
	this.maxHealth = 100;
	this.armor = 100;
	this.level = 10;
	this.weight = 10;
	this.maxSpeed = 50;
	this.thrusters["front"] = 3;
	this.thrusters["back"] = 3;
	this.thrusters["side"] = 2;
	this.acceleration = 4;
	
	this.uid = this.engine.shipManager.getUID();
	
	this.img.src = 'images/drone.png';
	
	this.name = "Drone";
	
	this.hitBox = [
		[7, 35],
		[20, 47],
		[44, 47],
		[53, 39],
		[53, 21],
		[44, 12],
		[20, 12],
		[7, 25],
		[7, 5]
	];
}