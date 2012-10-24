/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Coin (engine) {
	this.inherit = Loot;
	this.inherit(engine);

	this.height = 28;
	this.width = 14;
	this.img.src = 'images/coin.png';
	
	this.name = "Coin";
	
	this.payload = 1;
	
	this.hitBox = [
		[0, 0],
		[14, 0],
		[14, 28],
		[0, 28],
		[0, 0]
	];
	
	this.setPayload = function(val) {
		this.payload = val;
	}
}

function SpaceMan (engine) {
	this.inherit = Loot;
	this.inherit(engine);
	
	this.height = 22;
	this.width = 22;
	this.img.src = 'images/spaceman.gif';
	
	this.name = "SpaceMan";
	
	this.payload = new Array();
	
	this.hitBox = [
		[0, 0],
		[22, 0],
		[22, 22],
		[0, 22],
		[0, 0]
	];
	
	this.setPayload = function(val) {
		this.payload.push(val);
	}
	
}