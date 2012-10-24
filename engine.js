/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Engine() {
	// Get the canvas element
	this.canvas = document.getElementById('canvas');  
	this.ctx = this.canvas.getContext('2d');  
	
	// FPS related counter stuff
	this.fpsCount = 0;
	this.fps = 0;
	this.showFps = true;

	this.showCoords = false;
	// Running or Paused (do I really need this?)
	this.state = 0;
	
	// Declare game objects
	this.shipManager = null;
	this.map = null;
	this.viewPort = null;
	this.player = null;
	this.math = null;
	this.overlay = null;
	
	this.network = null;
	this.chat = null;
	
	this.projectiles = new Array(); // Stores all the projectiles
	this.lootDrops = new Array(); // Stores all loot drops that are floating around
	
	this.debugMsgs = new Array();
	
	// This array keeps track of the state of keys during a game loop
	this.keyState = new Array();

	this.hasFocus = true;
	
	this.showHitBox = false;
	
	this.projectileLifetime = 300;
	this.lootLifetime = 1000;
	
	this.animationDelay = 3;
	
	this.__construct = function () {
		
		this.math = new MathFunctions(this);
		this.shipManager = new ShipManager(this);
		this.map = new Map(this);
		this.viewPort = new ViewPort(this);
		this.player = new Player(this);
		this.overlay = new Overlay(this);
		//this.network = new Network(this);
		
	}
	
	this.__keyBindings = function () {
		var self = this;
		this.keyState = ({ 	
			37 : false,  // Left Arrow
			38 : false,  // Up Arrow
			39 : false,  // Right Arrow 
			40 : false,  // Down Arrows
			32 : false,  // Space Bar
			16 : false,  // Shift
			13 : false,  // Enter
			49 : false,  // 1
			50 : false,  // 2
			51 : false,  // 3
			52 : false,  // 4
			53 : false,  // 5
			54 : false   // 6
		}); 
		
		$(document).keydown(function(event) {
			for( key in self.keyState ) {
				if(key == parseInt(event.keyCode)) {
					self.keyState[parseInt(event.keyCode)] = true;
					if(self.hasFocus == true) {
						event.preventDefault();
					}
				}
			}
		});
		$(document).keyup(function(event) {
			for( key in self.keyState ) {
				if(key == parseInt(event.keyCode)) {
					self.keyState[parseInt(event.keyCode)] = false;
					if(self.hasFocus == true) {
						event.preventDefault();
					}
				}
			}
		});
	}
	
	this.startGame = function(mode, ship) {
	
		
	
		this.ctx.font = "8pt sans-serif";
		
		this.__keyBindings();
		

		this.loadPlayerShip(ship);
		
		var enemyCount = 2;
		for(i=0; i< enemyCount; ++i) {
			this.shipManager.npc.push(new Drone(this, true));
			this.shipManager.npc[i].renderX = 300 * i;
			this.shipManager.npc[i].renderY = 300;
			this.shipManager.npc[i].rotation = 0;
			this.shipManager.npc[i].npc.enabled = true;
			this.shipManager.npc[i].team = "Computer";
			this.shipManager.npc[i].coins = 1;
			this.shipManager.npc[i].addShield(new BasicShield(this));
			//this.shipManager.npc[i].addWeapon(new Cannon(this, this.shipManager.npc[i]), 0);
		}
		this.overlay.initialize();
		this.setState("running");
		this.fpsLoop();
		this.mainLoop();
		//this.network.start();
	}
	
	this.mainLoop = function () {
		
		this.fpsCount++;
		
		this.ctx.fillStyle = "rgb(0,0,0)";  
        this.ctx.fillRect (0, 0, this.viewPort.width, this.viewPort.height); 
		
		this.player.keyEvents();
		
		this.map.render();
		
		this.viewPort.scrollXY();
		
		for(i=0; i < this.projectiles.length; ++i) {
			if(this.projectiles[i].dispose == true) {
				this.projectiles.splice(i, 1);
				i--;
			} else {
				this.projectiles[i].move();
				this.projectiles[i].render();
				this.projectiles[i].checkLifetime();
			}
		}
		// Render Ships (Handles movement and collision)
		this.shipManager.render();
		
		if (this.showFps == true) {
			 
			this.debug("FPS: " + this.fps);
		}
		if (this.showCoords == true) {
			this.debug("X: " + this.shipManager.player[0].renderX);
			this.debug("Y: " + this.shipManager.player[0].renderY);
			this.debug("R: " + this.shipManager.player[0].rotation);
		}
		
		this.overlay.update();
		
		this.printDebug(); 
		// Scope reference
        var self = this;
		// Loop this function if the game is in play state, otherwise stop the loop
        if(this.state == 1) { setTimeout(function() { self.mainLoop(); }, 25); }
	}
	
	this.fpsLoop = function () {
		this.fps = this.fpsCount;
		this.fpsCount = 0;
		
		// Scope reference
        var self = this;
		// Loop this function if the game is in play state, otherwise stop the loop
        if(this.state == 1) { setTimeout(function() { self.fpsLoop(); }, 1000); }
	}
	
	this.setState = function (state) {
		switch(state) {
			case "paused":
				this.state = 0;
				break;
			case "running":
				this.state = 1;
				break;
			case "end":
				this.state = 2;
				break;
			default:
				alert("unknown game state");
		}
	}
	
	this.debug = function(msg) {
		this.debugMsgs.push(msg);
	}
	
	this.printDebug = function() {
		this.ctx.fillStyle = "rgb(0, 255, 0)"; 
		for(i=0; i < this.debugMsgs.length; ++i) {
			this.ctx.fillText(this.debugMsgs[i], 10, 20 + (i * 10));
		}
		this.debugMsgs = new Array();
	}
	
	this.resizeCanvas = function(width, height) {
		this.viewPort.width = width;
		this.viewPort.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
	}
	
	this.processKeyTyping = function(input) {
	
	}
	
	this.loadPlayerShip = function(ship) {
	
		var playerShip = null;
		switch (parseInt(ship)) {
			case 0:
				playerShip = new Falcon(this, false);
				break;
			case 1:
				playerShip = new Bulldog(this, false);
				break;
			case 2:
				playerShip = new RoseThorne(this, false);
				break;
			default:
				playerShip = new Falcon(this, false);
		}
		
		this.shipManager.player.push(playerShip);
		this.shipManager.player[0].renderX = 0;
		this.shipManager.player[0].renderY = 0;
		this.shipManager.player[0].uid = this.player.uid;
		this.shipManager.player[0].team = "Human";
		this.shipManager.player[0].addWeapon(new Cannon(this, this.shipManager.player[0]), 0);
		this.shipManager.player[0].addWeapon(new AntiMatterCannon(this, this.shipManager.player[0]), 1);
		this.shipManager.player[0].addInv(new BasicRadar(this), 0);
		this.shipManager.player[0].addInv(new AdvancedRadar(this), 1);
		this.shipManager.player[0].addInv(new AntiMatterCannon(this, this.shipManager.player[0]), 2);
		this.shipManager.player[0].addInv(new AdvancedShield(this), 3);
		this.shipManager.player[0].addShield(new BasicShield(this));
	}
	
	this.endGame = function() {
		this.setState("end");
		$("#login").fadeOut();
		$("#chat").fadeOut();
		$("#inventory").fadeOut();
		$("#interface").fadeOut();
		$("#canvas").fadeOut();
		
		$("#gameOver").fadeIn();
	
	}

	this.__construct();
}