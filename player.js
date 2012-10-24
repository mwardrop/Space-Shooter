/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function Player(engine) {
	this.engine = null;
	
	this.username = null;
	this.uid = null;
	
	this.__construct = function (engine) {
		this.engine = engine;
		
	}
	
	this.keyEvents = function () {
	if(this.engine.shipManager.player[0]) {
		if(this.engine.hasFocus == true) {
			if(this.engine.keyState[37] == true) {
				this.engine.shipManager.player[0].rotate("left");
			} 
			if (this.engine.keyState[39] == true) {
				this.engine.shipManager.player[0].rotate("right");
			} 
			if (this.engine.keyState[38] == true) {
				this.engine.shipManager.player[0].increaseSpeed();
			}
			if (this.engine.keyState[40] == true) {
				this.engine.shipManager.player[0].decreaseSpeed();
			}
			if (this.engine.keyState[32] == true) {
				this.engine.shipManager.player[0].attack();
			}
			if (this.engine.keyState[49] == true) {
				this.engine.shipManager.player[0].doAction(0);
			}
			if (this.engine.keyState[50] == true) {
				this.engine.shipManager.player[0].doAction(1);
			}
			if (this.engine.keyState[51] == true) {
				this.engine.shipManager.player[0].doAction(2);
			}
			if (this.engine.keyState[52] == true) {
				this.engine.shipManager.player[0].doAction(3);
			}
			if (this.engine.keyState[53] == true) {
				this.engine.shipManager.player[0].doAction(4);
			}
			if (this.engine.keyState[54] == true) {
				this.engine.shipManager.player[0].doAction(5);
			}
			if (this.engine.keyState[13] == true) {
				this.engine.overlay.chat.chatInput.focus();
			}
		} else {
			
		}
		}
	}
	
	this.__construct(engine);
}