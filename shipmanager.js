/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function ShipManager(engine) {
	this.templates = new Array(); // Contains Ship Template Objects loaded from ships.json
	
	this.npc = new Array(); // Contains Ships active on the map
	
	this.player = new Array();
	
	this.engine = null;
	
	this.spawnCount = 0;
	
	this.__construct = function(engine) {
		this.engine = engine;
	}
	
	this.render = function () {
	
		this.checkCollisions();
		
		for(n = 0; n < this.player.length; n++) {
			if(this.player[n].dispose == true) {
				if(n == 0) {
					this.engine.endGame(); // Player is dead
				} else {
					this.player.splice(n, 1);
					n--;	
				}				
			} else {
				this.player[n].move();
				this.player[n].rotateHitBox();
				this.player[n].render();
			}
		}
		
		for(n = 0; n < this.npc.length; n++) {
			if(this.npc[n].dispose == true) {
				this.npc[n].dumpLoot();
				this.npc.splice(n, 1);
				n--;			
			} else {n
				this.npc[n].move();
				this.npc[n].rotateHitBox();
				this.npc[n].render();
			}	
		}
	}
	
	this.checkCollisions = function() {
		try {
			var ships = this.player.concat(this.npc);
			for ( a = 0; a < ships.length; ++a ) { // Check each ship (A)
				var hitBox = new Array();
					this.engine.ctx.beginPath();
					for(i=0; i < ships[a].hitBox.length; ++i) {
						hitBox[i] = new Array(
							(ships[a].hitBoxRotated[i][0] + ships[a].renderX - this.engine.viewPort.xOffset - (ships[a].width / 2)),
							(ships[a].hitBoxRotated[i][1] + ships[a].renderY - this.engine.viewPort.yOffset - (ships[a].height / 2))
						);
						if(i == 0) {
							this.engine.ctx.moveTo(hitBox[i][0], hitBox[i][1]);
						} else {
							this.engine.ctx.lineTo(hitBox[i][0], hitBox[i][1]);
						}
					}
				
				for(i=0; i < this.engine.projectiles.length; ++i) {
					var point = new Array(
						(this.engine.projectiles[i].renderX - this.engine.viewPort.xOffset - 10),
						(this.engine.projectiles[i].renderY - this.engine.viewPort.yOffset)
					);
					var hit = this.engine.math.pointInPoly(hitBox, point);
					if(hit == true) {
						ships[a].collision(this.engine.projectiles[i]);
						break;
					}	

				}

				
				for(i=0; i < this.engine.lootDrops.length; ++i) {
					for(n=0; n < this.engine.lootDrops[i].hitBox.length; ++n) { 
						var point = new Array(
							this.engine.lootDrops[i].hitBox[n][0] + this.engine.lootDrops[i].renderX - this.engine.viewPort.xOffset,
							this.engine.lootDrops[i].hitBox[n][1] + this.engine.lootDrops[i].renderY - this.engine.viewPort.yOffset
						);
						var hit = this.engine.math.pointInPoly(hitBox, point);
						if(hit == true) {
							ships[a].collision(this.engine.lootDrops[i]);
							break;
						}	
					}
					if(this.engine.lootDrops[i].dispose == true) {
						this.engine.lootDrops.splice(i, 1);
						i--;
					} else {
						this.engine.lootDrops[i].render();
						this.engine.lootDrops[i].checkLifetime();
					}
				}
			}
		} catch(err) { console.debug(err); }
	}
	
	this.drawHitBox = function (obj) {
		this.engine.ctx.beginPath();
		this.engine.ctx.moveTo(obj.hitBox[0][0] + obj.renderX - this.engine.viewPort.xOffset, obj.hitBox[0][1] + obj.renderY - this.engine.viewPort.yOffset);
		for(i = 1; i < obj.hitBox.length; ++i) {
			this.engine.ctx.lineTo(obj.hitBox[i][0] + obj.renderX - this.engine.viewPort.xOffset, obj.hitBox[i][1] + obj.renderY - this.engine.viewPort.yOffset);
		}
		this.engine.ctx.closePath();
		this.engine.ctx.strokeStyle = "rgb(255, 0, 0)"; 
		this.engine.ctx.stroke();
		}
	
	this.getUID = function() {
		this.spawnCount++;
		return this.spawnCount;
	}
	
	this.__construct(engine);
}