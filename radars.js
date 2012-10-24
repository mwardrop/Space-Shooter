/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function BasicRadar (engine) {
	this.inherit = Radar;
	this.inherit(engine);

	this.name = "Basic Radar";
	this.description = "A basic radar system.";
	
	this.range = 1000;
	this.refreshRate = 75;
	this.refreshCount = 75;
}

function LongRangeRadar (engine) {
	this.inherit = Radar;
	this.inherit(engine);

	this.name = "Long Range Radar";
	this.description = "A radar system with increased range.";
	
	this.range = 2000;
	this.refreshRate = 75;
	this.refreshCount = 75;
}

function FastRefreshRadar (engine) {
	this.inherit = Radar;
	this.inherit(engine);

	this.name = "Fast Refresh Radar";
	this.description = "A radar system with increased refresh rate.";
	
	this.range = 1000;
	this.refreshRate = 25;
	this.refreshCount = 25;
}

function AdvancedRadar (engine) {
	this.inherit = Radar;
	this.inherit(engine);

	this.name = "Advanced Radar";
	this.description = "A radar system with increased range and refresh rate.";
	
	this.range = 2000;
	this.refreshRate = 25;
	this.refreshCount = 25;
}