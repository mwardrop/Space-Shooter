/*!
 * Space Shooter
 * http://www.mitchwardrop.com/
 *
 * Copyright 2010, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
 function MathFunctions(engine) {
 
	this.engine = null;
	
	this.__construct = function (engine) {
		this.engine = engine;
	}
 	this.pointInPoly = function(poly, pt) {
		for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
			((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
			&& (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
			&& (c = !c);
		return c;
	}
	
	this.rotatePoly = function (poly, origin,ang) {
		var rv = [];
		for (p in poly) {
			rv.push(this.rotatePoint(poly[p],origin,ang));
		};
		return rv;
	};
	
	this.polyCenter = function (poly, area) {
		var n = 0;
		var ox = 0;
		var oy = 0;
		for (i = 0; i < poly.length; i++) {
			n = (i+1) % poly.length;
			ox += (poly[i][0] + poly[n][0]) * (poly[i][0] * poly[n][1] - poly[n][0] * poly[i][1]);
			oy += (poly[i][1] + poly[n][1]) * (poly[i][0] * poly[n][1] - poly[n][0] * poly[i][1]);
		}
		return [ (ox / ( 6.0 * area)), (oy / ( 6.0 * area)) ]; 
	}
	
	this.polyArea = function (poly) {
		var n = 0;
		var area = 0;
		for (i = 0; i < poly.length; i++) {
			n = (i+1) % poly.length;	// modulo to get 0 if i is last vertex
			area += poly[i][0] * poly[n][1] - poly[n][0] * poly[i][1];
		}

		area = (area) / 2.0;
		return area;
	}
	
	this.rotatePoint = function (point,origin,ang) {
		var x = origin[0] + ((point[0] - origin[0]) * Math.cos(ang) - (point[1] - origin[1]) * Math.sin(ang));
		var y = origin[1] + ((point[0] - origin[0]) * Math.sin(ang) + (point[1] - origin[1]) * Math.cos(ang));
		return [ x, y ];
	};
	
	// SohCahToa
	this.getAngle = function(pointA, pointB) {
		var pointC = [ pointB[0], pointA[1] ];
		
		var A2B = this.getDistance(pointA, pointB); 
		var A2C = this.getDistance(pointA, pointC);
		
		var rotation = Math.round(Math.acos(A2C / A2B) * 360 / (Math.PI * 2));
		
		if(pointA[0] > pointB[0] && pointA[1] < pointB[1]) { rotation = 180 - rotation; }
		else if(pointA[0] > pointB[0] && pointA[1] > pointB[1]) { rotation = 180 + rotation; }
		else if(pointA[0] < pointB[0] && pointA[1] > pointB[1]) { rotation = 360 - rotation; }
		else { rotation = rotation; }
		
		return rotation;
	}
	
	this.getDistance = function(pointA, pointB) {
		return Math.sqrt(Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2));
	}
	
	this.__construct(engine);
 
 }