/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function Ship(engine, npc) {
	this.objType = "Ship";
	this.engine = null;
	
	this.uid = null;
	
	this.name = null;
	
	this.inventory = ({ 0 : null, 1 : null, 2 : null, 3 : null, 4 : null, 5 : null,
						6 : null, 7 : null, 8 : null, 9 : null, 10 : null, 11 : null,
						12 : null, 13 : null, 14 : null, 15 : null, 16 : null, 17 : null,
						18 : null, 19 : null, 20 : null, 21 : null, 22 : null, 23 : null});
	this.coins = 0;
	
	this.renderX = null;
	this.renderY = null;
	this.height = null;
	this.width = null;
	this.rotation = null;
	this.speed = null;
	this.maxSpeed = null;
	this.thrusters = ({
		"front" : null,
		"back" : null,
		"side" : null
	});
	this.acceleration = null;
	this.accDelay = 0;
	
	this.plotY = null;
	this.plotX = null;
	
	this.health = null;
	this.maxHealth = null;
	this.armor = null;
	this.attack = null;
	this.level = null;
	this.shield = null;
	this.weapons = ({
		0 : null,
		1 : null,
		2 : null
	});
	this.acc = ({
		0 : null,
		1 : null,
		2 : null
	});
	this.healthBoost = null;
	this.shieldBoost = null;
	this.attackCoolDown = 0;
	
	this.weight = null;
	
	this.collisionDelay = 0;
	
	this.shipCollisions = new Array();
	
	this.col = false;
		
	this.hitBox = new Array();
	this.hitBoxRotated = new Array();

	this.img = new Image();
	this.img.offset = 0;
	
	this.npc = null;
	
	this.dispose = false;
	
	this.dead = false;
	
	this.deathAnimTimer = 0;
	
	this.team = null;
	
	this.radar = null;
	
	this.__construct = function(engine, npc) {
		this.engine = engine;
		if(npc == true) {
			this.npc = new NPC(this.engine, this);
		}
	}
	
	this.doAction = function(code) {
		if(code < 3) {
			if(this.weapons[code]) {
				this.attack(this.weapons[code]);
			}
		} else {
		
		}
	}
	
	this.addWeapon = function(weapon, slot) {
		this.weapons[slot] = weapon;
	}
	
	this.addAcc = function(acc, slot) {
		this.acc[slot] = acc;
	}
	
	this.addInv = function(item, slot) {
		this.inventory[slot] = item;
	}
	
	this.removeWeapon = function(slot) {
		var weapon = this.weapons[slot];
		this.weapons[slot] = null;
		return weapon;
	}
	
	this.removeAcc = function(slot) {
		var acc = this.acc[slot];
		this.acc[slot] = null;
		return acc;
	}
	
	this.removeInv = function(slot) {
		var item = this.inventory[slot];
		this.inventory[slot] = null;
		return item;
	}
	
	this.addRadar = function(radar) {
		this.radar = radar;
	}
	
	this.removeRadar = function() {
		var radar = this.radar;
		this.radar = null;
		return radar;
	}
	
	this.addShield = function (shield) {
		this.shield = shield
	}
	
	this.removeShield = function () {
		var shield = this.shield;
		this.shield = null;
		return shield;
	}
	
	this.increaseSpeed = function() {
		if(this.col == false && this.dead == false) {
			if(this.speed < this.maxSpeed) {
				if(this.accDelay <= 0) {
					this.speed += this.thrusters["back"];
					if(this.speed > this.maxSpeed) {
						this.speed = this.maxSpeed;
					}
					this.img.offset = 1;
					this.accDelay = this.acceleration;
				}
			}
		}
	}
	
	this.decreaseSpeed = function () {
		if(this.col == false && this.dead == false) {
			if(this.speed > -this.maxSpeed) {
				if(this.accDelay <= 0) {
					this.speed -= this.thrusters["front"];
					if(this.speed > this.maxSpeed) {
						this.speed = this.maxSpeed;
					}
					this.img.offset = 4;
				}
			}
		}
	}
	
	this.rotate = function (direction) {
		if(this.col == false && this.dead == false) {
			switch(direction) {
				case "left":
					this.rotation -= this.thrusters["side"];
					this.img.offset = 2;
					break;
				case "right":
					this.rotation += this.thrusters["side"];
					this.img.offset = 3;
					break;
			}
			if(this.rotation > 360) { this.rotation = 0; }
			if(this.rotation < 0) {this.rotation = 360; }
		}
	}
	
	this.collision = function (obj, sec) {
	
		if(obj.objType == "Projectile") {
			if(this.team != obj.owner.team) {
				this.takeDamage(obj);
				obj.collision(this);
			}
		}
		if(obj.objType == "Loot") {
			switch(obj.name) {
				case "Coin" :
					this.coins += obj.payload;
					obj.dispose = true;
				break;
			}
		}
	}
	
	this.attack = function (weapon) {
		if(this.attackCoolDown <= 0 && this.dead == false) {
			if(weapon) {
				weapon.attack();
			}
		}
	}
	
	this.takeDamage = function(obj) {
		if(this.shield != null) {
			if(this.shield.current <= 0) {
				if(obj.isAntiMatter == false) {
					obj.payload = obj.payload * 1.5;
				} else {
					obj.payload = obj.payload * 0.5;
				}
				this.health -= obj.payload;
			} else {
				if(obj.isAntiMatter == true) {
					obj.payload = obj.payload * 1.5;
				} else {
					obj.payload = obj.payload * 0.5;
				}
			
				this.shield.current -= obj.payload;
				this.shield.hitCounter = this.shield.hitCountdown
				
				if(this.shield.current < 0) {
					this.health += this.shield.current;
					this.shield.current = 0;
				}
				
			}
		} else {
			if(obj.isAntiMatter == false) {
				obj.payload = obj.payload * 1.5;
			} else {
				obj.payload = obj.payload * 0.5;
			}
			this.health -= obj.payload;
		}
		
		if(this.health <= 0) {
			this.dead = true;
		}
	}
	
	this.rotateHitBox = function () {
		var center = this.engine.math.polyCenter(this.hitBox, this.engine.math.polyArea(this.hitBox));
		this.hitBoxRotated = this.engine.math.rotatePoly(this.hitBox, center, this.rotation * (Math.PI / 180));
	}
	
	this.move = function () {
		
		if(this.collisionDelay <= 0) {
			this.col = false;
		} else {
			this.collisionDelay--;
		}
		
		if(this.npc != null) { 
			this.npc.move(); // If it's an NPC have it compute its movement
		}
		
		if(this.speed > this.maxSpeed) {
			this.decreaseSpeed();
		}
		
		if(this.attackCoolDown > 0) {
			this.attackCoolDown--;
		}
		
		if(this.accDelay > 0) {
			this.accDelay--;
		}
		
		this.plotX = Math.round(Math.round(this.speed / 10) * Math.cos(this.rotation * Math.PI / 180));
		this.plotY = Math.round(Math.round(this.speed / 10) * Math.sin(this.rotation * Math.PI / 180));
		
		this.renderX += this.plotX;
		this.renderY += this.plotY;
		
		this.plotX = ((this.width / 2) * -1) - this.plotX;
		this.plotY = ((this.height / 2) * -1) + this.plotY;
	}
	
	this.render = function () {
		try {
			this.engine.ctx.save();  

			this.engine.ctx.translate(this.renderX - this.engine.viewPort.xOffset, this.renderY - this.engine.viewPort.yOffset); 
			this.engine.ctx.rotate(this.rotation * Math.PI / 180); 
			this.engine.ctx.drawImage(this.img, (this.width * this.img.offset), 0, this.width, this.height, this.plotX, this.plotY, this.width, this.height);
			
			if(this.shield) {
				this.shield.render(this.plotX, this.plotY);
			}
			
			this.engine.ctx.restore();  
			
			if(this.engine.showHitBox == true) {
				this.drawHitBox();
			}
			
			if(this.dead == true) {
				this.deathAnimTimer++;
				if(this.img.offset < 13) {
					this.img.offset = 5 + Math.floor(this.deathAnimTimer / this.engine.animationDelay);
				} else {
					this.dispose = true;
				}
			} else {
				this.img.offset = 0;
			}
			if(this.npc == null) {
				if(this.radar != null) {
					this.radar.render();
				} else {
					$("#minimap").empty();
				}
			}
			
		} catch(err) { console.debug(err); }
		
	}
	
	this.drawHitBox = function () {
		
		
		this.engine.ctx.beginPath();
		this.engine.ctx.moveTo(this.hitBoxRotated[0][0] + this.renderX - this.engine.viewPort.xOffset - (this.width / 2), this.hitBoxRotated[0][1] + this.renderY - this.engine.viewPort.yOffset - (this.height / 2));
		for(i = 1; i < this.hitBoxRotated.length; ++i) {
			this.engine.ctx.lineTo(this.hitBoxRotated[i][0] + this.renderX - this.engine.viewPort.xOffset - (this.width / 2), this.hitBoxRotated[i][1] + this.renderY - this.engine.viewPort.yOffset - (this.height / 2));
		}
		this.engine.ctx.closePath();
		this.engine.ctx.strokeStyle = "rgb(255, 0, 0)"; 
		this.engine.ctx.stroke();
	}
	
	this.dumpLoot = function () {
		// Drop Coins
		if(this.coins > 0) {
			var coins = new Coin(this.engine);
			coins.setPayload(this.coins);
			coins.renderX = (Math.floor(Math.random() * (50-(-50) + 1) + (-50)) + this.renderX);
			coins.renderY = (Math.floor(Math.random() * (50-(-50) + 1) + (-50)) + this.renderY);
			this.engine.lootDrops.push(coins);
		}
	}
	
	
	this.__construct(engine, npc);
}