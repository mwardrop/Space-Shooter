/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
 function Network(engine) {
	this.engine = null;
	
	this.socket = null;
	
	this.connected = false;
	
	this.__construct = function (engine) {
		var self = this;
		this.engine = engine;
		this.socket = new WebSocket("ws://172.16.1.11:8000/server");
		console.debug("Socket Object Created");
		this.socket.onopen = function() {
			self.connected = true;
			self.sendRequest(new Request("ping", ({ "time" : Math.round(new Date().getTime() / 1000) }))); 
			console.debug("Socket Connected");
		}
		this.socket.onerror = function (err) {
			console.debug("Socket Error: " + err);
		}
		this.socket.onmessage = function(msg) {
			self.handleResponse(msg.data);
		};
		this.socket.onclose = function () {
			console.debug("Socket Closed");
		}
		
	}
 
	this.handleResponse = function (data) {
		console.debug("Socket Message Received: " + data);
		
		try {
			var response = JSON.parse(data);
			switch(response.cmd) {
				case "part":
					break;
				case "join":
					this.engine.overlay.chat.joinChannel(response.args['target']);
					break;
				case "names":
					break;
				case "name":
					break;
				case "msg":
					this.engine.overlay.chat.parseMsg(response.args);
					break;
				case "pos":
					
					break;
				case "uid":
					//this.engine.shipManager.player[0].uid = response.args['uid'];
					this.engine.player.uid = response.args['uid'];
			}
			
		} catch(err) { console.debug(err); }
	}
	
	this.sendRequest = function (request) {
		this.socket.send(JSON.stringify(request.data));
		console.debug("Request Sent");
	}
	
	this.start = function() {
		console.debug("Network Started");
		this.sendRequest(new Request("name", ({ "name" : this.engine.player.username }))); 
		console.debug("Username Sent");
		this.networkLoop();
	}
	
	this.networkLoop = function () {
		console.debug("Network Loop Iteration");
		this.sendState();
		
		var self = this;
		if(this.engine.state == 1) { setTimeout(function() { self.networkLoop(); }, 100); }
	}
	
	this.sendState = function () {
	
	}
	
	this.__construct(engine);
 }
 
 function Request(cmd, args) {
	this.data = {
				 "cmd" : this.cmd,
				 "args" : {}
				};
	
	this.__construct = function(cmd, args) {
		if (cmd) { this.data["cmd"] = cmd; }
		if (args) { this.data["args"] = args; }
	};
	
	this.setCmd = function(cmd) {
		this.data['cmd'] = cmd;
	};
	
	this.setArg = function(arg, value) {
		this.data['args'][arg] = value;
	};
	
	this.__construct(cmd, args);
}