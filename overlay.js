/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
 function Overlay(engine) {
 
	this.engine = null;
	this.chat = null;
	this.inventory = null;
	
	this.shieldEnergyDOM = null;
	this.healthEnergyDOM = null;
	this.coinCountDOM = null;
	
	this.healthCountDOM = null;
	this.shieldCountDOM = null;
	
	this.__construct = function(engine) {
		this.engine = engine;
		this.chat = new Chat(this.engine);
		this.inventory = new InventoryManager(this.engine);
	}
	
	this.initialize = function () {
		
		$("#login").fadeOut();
		var self = this;
		$(window).resize(function(){
			self.engine.resizeCanvas($(window).width(), $(window).height());
			$("#interface").css("left", (self.engine.viewPort.width / 2) - ($("#interface").width() / 2));
			$("#interface").css("top", (self.engine.viewPort.height - $("#interface").height()));
		});
		
		$(window).scroll(function () { 
			scroll(0,0);
		});
		$(window).resize(); // Initially center the game container
		
		this.chat.initialize();
		this.inventory.initialize();
		
		this.keyBindings();
		
		this.shieldEnergyDOM = $("#shield_energy");
		this.healthEnergyDOM = $("#life_energy");
		this.coinCountDOM = $("#coin_count");
		
		this.healthCountDOM = $("#health_count");
		this.shieldCountDOM = $("#shield_count");
		
		// Load Weapons
		for(i=0; i < 3; ++i) {
			if(this.engine.shipManager.player[0].weapons[i]) {
				var uid = this.inventory.getUID();
				this.engine.shipManager.player[0].weapons[i].interfaceUID = uid;
				$("<div class='inv_icon' id='inv_item_" + uid + "'></div>").appendTo("#wep_" + (i + 1));
				$("#inv_item_" + uid).css("background-image", "url('" + this.engine.shipManager.player[0].weapons[i].icon + "')");
				$("#inv_item_" + uid).draggable({	revert: 'invalid', 
													start: function(event, ui) {
														$(this).data('startPosition', $(this).parent().offset());
													}
												});
				$("#inv_item_" + uid).hover(
					function (e) {
						self.mouseHoverOn(this, e);
					},
					function () {
						self.mouseHoverOff();
					}
				);
			}
		}
		
		// Load Accessories
		for(i=0; i < 3; ++i) {
			if(this.engine.shipManager.player[0].acc[i]) {
				var uid = this.inventory.getUID();
				this.engine.shipManager.player[0].acc[i].interfaceUID = uid;
				$("<div class='inv_icon' id='inv_item_" + uid + "'></div>").appendTo("#acc_" + (i + 1));
				$("#inv_item_" + uid).css("background-image", "url('" + this.engine.shipManager.player[0].acc[i].icon + "')");
				$("#inv_item_" + uid).draggable({	revert: 'invalid', 
													start: function(event, ui) {
														$(this).data('startPosition', $(this).parent().offset());
													}
												});
				$("#inv_item_" + uid).hover(
					function (e) {
						self.mouseHoverOn(this, e);
					},
					function () {
						self.mouseHoverOff();
					}
				);
			}
		}
		
		// Load Inventory
		for(i=0; i < 23; ++i) {
			if(this.engine.shipManager.player[0].inventory[i]) {
				var uid = this.inventory.getUID();
				this.engine.shipManager.player[0].inventory[i].interfaceUID = uid;
				$("<div class='inv_icon' id='inv_item_" + uid + "'></div>").appendTo("#inv_" + (i + 1));
				$("#inv_item_" + uid).css("background-image", "url('" + this.engine.shipManager.player[0].inventory[i].icon + "')");
				$("#inv_item_" + uid).draggable({	revert: 'invalid', 
													start: function(event, ui) {
														$(this).data('startPosition', $(this).parent().offset());
													}
												});
				$("#inv_item_" + uid).hover(
					function (e) {
						self.mouseHoverOn(this, e);
					},
					function () {
						self.mouseHoverOff();
					}
				);
			}
		}
		
		// Load Radar
		if(this.engine.shipManager.player[0].radar) {
			var uid = this.inventory.getUID();
			this.engine.shipManager.player[0].radar.interfaceUID = uid;
			$("<div class='inv_icon' id='inv_item_" + uid + "'></div>").appendTo("#radar");
			$("#inv_item_" + uid).css("background-image", "url('" + this.engine.shipManager.player[0].radar.icon + "')");
			$("#inv_item_" + uid).draggable({	revert: 'invalid', 
													start: function(event, ui) {
														$(this).data('startPosition', $(this).parent().offset());
													}
												});
				$("#inv_item_" + uid).hover(
					function (e) {
						self.mouseHoverOn(this, e);
					},
					function () {
						self.mouseHoverOff();
					}
				);
		}
		
		// Load Shields
		if(this.engine.shipManager.player[0].shield) {
			var uid = this.inventory.getUID();
			this.engine.shipManager.player[0].shield.interfaceUID = uid;	
			$("<div class='inv_icon' id='inv_item_" + uid + "'></div>").appendTo("#shield");
			$("#inv_item_" + uid).css("background-image", "url('" + this.engine.shipManager.player[0].shield.icon + "')");
			$("#inv_item_" + uid).draggable({	revert: 'invalid', 
													start: function(event, ui) {
														$(this).data('startPosition', $(this).parent().offset());
													}
												});
				$("#inv_item_" + uid).hover(
					function (e) {
						self.mouseHoverOn(this, e);
					},
					function () {
						self.mouseHoverOff();
					}
				);			
		}
		
		$(".inv_slot").droppable({
			drop: function( event, ui ) {
				var oId = ui.draggable.parent().attr("id").slice(4,6);
				var oIntType = ui.draggable.parent().attr("id").slice(0,3);
				var nId = $(this).attr("id").slice(4,6);
				var nIntType = $(this).attr("id").slice(0,3);
				//alert(ui.draggable.parent().attr("id") + " - " + $(this).attr("id"));
				switch(oIntType) {
					case "wep":
						var weapon = self.engine.shipManager.player[0].removeWeapon(oId - 1);
						self.engine.shipManager.player[0].addInv(weapon, nId - 1);
						break;
					case "acc":
						var acc = self.engine.shipManager.player[0].removeAcc(oId - 1);
						self.engine.shipManager.player[0].addInv(acc, nId - 1);
						break;
					case "inv":
						var item = self.engine.shipManager.player[0].removeInv(oId - 1);
						self.engine.shipManager.player[0].addInv(item, nId - 1);
						break;
					case "rad":
						var radar = self.engine.shipManager.player[0].removeRadar();
						self.engine.shipManager.player[0].addInv(radar, nId - 1);
						break;
					 case "shi":
						var shield = self.engine.shipManager.player[0].removeShield();
						self.engine.shipManager.player[0].addInv(shield, nId - 1);
						break;
				}
				
			
				var top = $(this).offset().top;
				var left = $(this).offset().left;
				if(ui.draggable.parent().attr("id") != "inv_con"){
					$(this).append(ui.draggable);
				}
				ui.draggable.offset({ top: top, left: left });
			}
		});
		
		$(".int_slot").droppable({
			drop: function( event, ui ) {
				var oId = ui.draggable.parent().attr("id").slice(4,6);
				var oIntType = ui.draggable.parent().attr("id").slice(0,3);
				var nId = $(this).attr("id").slice(4,6);
				var nIntType = $(this).attr("id").slice(0,3);
				
				if(nIntType == oIntType || oIntType == "inv") {
					var top = $(this).offset().top;
					var left = $(this).offset().left;
					
					switch(oIntType) {
						case "wep":
							if(self.engine.shipManager.player[0].weapons[nId - 1] == null) {
								var weapon = self.engine.shipManager.player[0].removeWeapon(oId - 1);
								self.engine.shipManager.player[0].addWeapon(weapon, nId - 1);
								$(this).append(ui.draggable);
								ui.draggable.offset({ top: top, left: left });
							} else {
								ui.draggable.css("position", "fixed");
								ui.draggable.animate(ui.draggable.data('startPosition'), 500);
							}
							break;
						case "acc":
							if(self.engine.shipManager.player[0].acc[nId - 1] == null) {
								var acc = self.engine.shipManager.player[0].removeAcc(oId - 1);
								self.engine.shipManager.player[0].addAcc(acc, nId - 1);
								$(this).append(ui.draggable);
								ui.draggable.offset({ top: top, left: left });
							} else {
								ui.draggable.css("position", "fixed");
								ui.draggable.animate(ui.draggable.data('startPosition'), 500);
							}
							break;
						case "inv":
							var item = self.engine.shipManager.player[0].removeInv(oId - 1);
							
							if(item.objType == "Weapon" && nIntType == "wep") {
								self.engine.shipManager.player[0].addWeapon(item, nId - 1);
								$(this).append(ui.draggable);
								ui.draggable.offset({ top: top, left: left });
							} else if (item.objType == "Radar" && nIntType == "rad") {
								self.engine.shipManager.player[0].addRadar(item);
								$(this).append(ui.draggable);
								ui.draggable.offset({ top: top, left: left });
							} else if (item.objType == "Shield" && nIntType == "shi") {
								self.engine.shipManager.player[0].addShield(item);
								$(this).append(ui.draggable);
								ui.draggable.offset({ top: top, left: left });
							} else {
								self.engine.shipManager.player[0].addInv(item, oId - 1);
								ui.draggable.css("position", "fixed");
								ui.draggable.animate(ui.draggable.data('startPosition'), 500);
							}
							break;
						case "rad":
							ui.draggable.css("position", "fixed");
							ui.draggable.animate(ui.draggable.data('startPosition'), 500);
							break;
						case "shi":
							ui.draggable.css("position", "fixed");
							ui.draggable.animate(ui.draggable.data('startPosition'), 500);
							break;							
					}

				} else {
					ui.draggable.css("position", "fixed");
					ui.draggable.animate(ui.draggable.data('startPosition'), 500);
				}

			}
		});
		
		$("#canvas").fadeIn();	
		//$("#chat").fadeIn();
		$("#interface").fadeIn();
		//$("#inventory").fadeIn();
	}
	
	this.keyBindings = function () {
		var self = this
		$(document).keypress( function (event) {
			if(self.engine.hasFocus == true) {
				switch(parseInt(event.keyCode)) {
					case 99:
						var display = $("#chat").is(":visible");
						if (display == true) {
							$("#chat").fadeOut();
						} else {
							$("#chat").fadeIn();
						}
						event.preventDefault();
						break;
					case 105:
						var display = $("#inventory").is(":visible");
						if (display == true) {
							$("#inventory").fadeOut();
						} else {
							
							$("#inventory").fadeIn();
						}
						event.preventDefault();
						break;
				}
			}
		});
	}
	
	this.update = function () {
		if(this.engine.shipManager.player[0].shield != null) {
			this.shieldEnergyDOM.width((this.engine.shipManager.player[0].shield.current * 145) / this.engine.shipManager.player[0].shield.capacity);
			
			this.shieldCountDOM.find(".current").html(this.engine.shipManager.player[0].shield.current);
			this.shieldCountDOM.find(".total").html(this.engine.shipManager.player[0].shield.capacity);
		} else {
			this.shieldEnergyDOM.width(0);
			
			this.shieldCountDOM.find(".current").html(0);
			this.shieldCountDOM.find(".total").html(0);
		}
		this.healthEnergyDOM.width((this.engine.shipManager.player[0].health * 145) / this.engine.shipManager.player[0].maxHealth);
		this.healthEnergyDOM.css("background-position", (this.engine.shipManager.player[0].health * 145) / this.engine.shipManager.player[0].maxHealth + "px 0px");
		
		this.healthCountDOM.find(".current").html(this.engine.shipManager.player[0].health);
		this.healthCountDOM.find(".total").html(this.engine.shipManager.player[0].maxHealth);		
		
		this.coinCountDOM.html(this.engine.shipManager.player[0].coins);
	}
	
	this.invDrop = function () {
	
	}
	
	this.mouseHoverOn = function(obj, e) {
		var toolTip = $("#toolTip");
		toolTip.empty();
		
		var id = parseInt($(obj).parent().attr("id").slice(4,6));
		var intType = $(obj).parent().attr("id").slice(0,3);
		
		var item = null;
		switch(intType) {
			case "wep":
				item = this.engine.shipManager.player[0].weapons[id - 1];
				break;
			case "rad":
				item = this.engine.shipManager.player[0].radar;
				break;
			case "acc":
				item = this.engine.shipManager.player[0].acc[id - 1];
				break;
			case "inv":
				item = this.engine.shipManager.player[0].inventory[id - 1];
				break;
			case "shi":
				item = this.engine.shipManager.player[0].shield;
				break;
		}

		toolTip.append("<h1>" + item.name + "</h1>");
		toolTip.append("<b>" + item.objType + "</b><br /><br />");
		toolTip.append(item.description);
		
		toolTip.css("top", e.pageY - toolTip.height() + 2 + "px");
		toolTip.css("left", e.pageX + 10 + "px");
		
		toolTip.show();
		
	}
	
	this.mouseHoverOff = function() {
		$("#toolTip").hide();
	}
	
	this.__construct(engine);
}