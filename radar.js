/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function Radar(engine) {
	this.objType = "Radar";
	this.engine = null;
	
	this.name = "Radar";
	this.description = "Radar";
	
	this.refreshRate = 0;
	this.range = 0;
	
	this.refreshCount = 0;
	
	this.icon = 'images/radar1.png';
	
	this.interfaceUID = null;
	
	this.__construct = function (engine) {
		this.engine = engine;
	}
	
	this.render = function () {
		this.refreshCount++;
		
		if(this.refreshCount > this.refreshRate) {
			this.refreshCount = 0;
			var player = this.engine.shipManager.player[0];
			var miniMap = $("#minimap");
			var canvas = $("#canvas");
			
			miniMap.empty();
			for(n = 0; n < this.engine.shipManager.npc.length; n++) {
				var npc = this.engine.shipManager.npc[n];
				if(npc.renderX < this.range + (player.renderX) && npc.renderX > (player.renderX) - this.range) {
					if(npc.renderY < this.range + (player.renderY) && npc.renderY > (player.renderY) - this.range) {
						var left = ((npc.renderX - player.renderX) * (miniMap.width() / canvas.width())) * ((canvas.width() / 2) / this.range)  + (miniMap.width() / 2);
						var top = ((npc.renderY - player.renderY) * (miniMap.height() / canvas.height())) * ((canvas.height() / 2) / this.range)  + (miniMap.height() / 2);
						
						$("<div class='radarBlip' id='radarBlip_" + n + "'>&nbsp;</div>").appendTo("#minimap");
						$("#radarBlip_" + n).css({'left' :  left + 'px', 'top' :  top + 'px'});
					}
				}
			}
		}
	}
	
	this.__construct(engine);
}