/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
 function InventoryManager(engine) {
	this.engine = null;
	this.spawnCount = 0;
	
	this.__construct = function(engine) {
		this.engine = engine;
	}
	
	this.initialize = function () {
		var self = this;
		$("#inventory").tabs();
		$("#inventory").draggable({ handle: "#invHandle" });
		$("#inventory").draggable({ containment: "#canvas", scroll: false });
		
		$("#inventory").focus(function() {
			self.engine.hasFocus = false;
		});
		
		
		$("#inventory").css("left", (self.engine.viewPort.width / 2) - ($("#inventory").width() / 2));
		$("#inventory").css("top", (self.engine.viewPort.height - $("#inventory").height() - 200));
	}
	
	this.getUID = function() {
		this.spawnCount++;
		return this.spawnCount;
	}
 
	this.__construct(engine);
 }