/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
 function Chat(engine) {
	this.engine = null;
	
	this.chatTabs = null;
	this.chatContainer = null;
	this.chatInput = null;
	
	this.__construct = function (engine) {
		this.engine = engine;
		
		this.chatTabs = $("#chatTabs");
		this.chatContainer = $("#chat");
		this.chatInput = $("input[name=chatInput]");
			
	}
	
	this.initialize = function () {
		this.chatTabs.tabs();
		this.chatContainer.draggable({ handle: "#chatHandle" });
		this.chatContainer.draggable({ containment: "#canvas", scroll: false });
		var self = this;
		this.chatContainer.resizable({
			resize: function(event, ui) { 
				self.resize();
			}
		});
		this.chatInput.focus(function() {
			self.engine.hasFocus = false;
		});
		this.chatInput.keypress( function (event) {
			if(parseInt(event.keyCode) == 13) {
				self.parseInput(self.chatInput.val());
				self.chatInput.val("");
			}
		});
		
		
		$("#chat").css("left", (self.engine.viewPort.width / 2) - ($("#chat").width() / 2));
		$("#chat").css("top", (self.engine.viewPort.height - $("#chat").height() - 200));
		
		
		this.joinChannel("Client");
		var greeting = "Welcome!<br />";
		greeting += "<b>Available Commands:</b><br />";
		greeting += "/show(hide)hitbox - Enable / disable rendering hitboxes<br />";
		greeting += "/show(hide)fps - Enable / disable rendering FPS<br />";
		greeting += "/show(hide)coords - Enable / disable rendering X,Y Coords and Rotation<br />";
		var msg = ({
			"msg" : greeting,
			"source" : "Client",
			"target" : "Client"
		});
		this.parseMsg(msg);
	}

	this.resize = function(visible) {
		this.chatContainer.find(".chatWindow").css("height", this.chatContainer.height() - 75);
		this.chatContainer.find(".chatWindow").attr({ scrollTop: this.chatContainer.find(".chatWindow").attr("scrollHeight") });
	}
	
	this.parseMsg = function(msg) {
		var date = new Date();
		var time = "<span class='chat_time'>[" + date.getHours() + ":" + date.getMinutes() + "] </span>";
		var source = "<span class='chat_source'>" + msg.source + ": </span>";
		var message = "<span class='chat_msg'>" + msg.msg + "</span>";
		$("#channel_" + msg.target).append(time + source + message + "<br />");
		$("#channel_" + msg.target).attr({ scrollTop: $("#channel_" + msg.target).attr("scrollHeight") });
	}
	
	this.joinChannel = function(channel) {
		$("<div id='channel_" + channel + "' class='chatWindow'></div>").appendTo(this.chatTabs);
		this.chatTabs.tabs("add", "#channel_" + channel, channel);
		this.resize();
	}
	
	this.getActiveChannel = function () {
		var tabName = $("#chatHandle").find(".ui-state-active").find("span").html();
		return tabName;
	}
	
	this.parseInput = function (input) {
		
		switch(input) {
			case "/showhitbox" :
				this.engine.showHitBox = true;
				break;
			case "/hidehitbox" :
				this.engine.showHitBox = false;
				break;
			case "/showfps" :
				this.engine.showFps = true;
				break;
			case "/hidefps" :
				this.engine.showFps = false;
				break;
			case "/showcoords":
				this.engine.showCoords = true;
				break;
			case "/hidecoords":
				this.engine.showCoords = false;
				break;
			case "/join":
				// Join Channel
				break;
			case "/part":
				// Part Channel
				break;
			default :
				if(input != "") {
					this.engine.network.sendRequest(new Request("msg", 
						({ 
							"source" : this.engine.player.username,
							"target" : this.getActiveChannel(),
							"msg" : input
						})
					)); 
				}
		}
	}
	
	this.partChannel = function(channel) {
	
	}
 
	this.__construct(engine);
 }