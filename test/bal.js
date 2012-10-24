/*
 *
 * T h e  J a v a s c r i p t   B o u n c i n g   B a l l s 
 * ========================================================
 *
 *
 * (C) Feb 2000 Marco Brandizi <brandizi@libero.it>
 *
 * This code is free, you may use or change it, but you cannot copyright
 * nor protect it in anyway from its non-modified version or parts.
 *
 *
 * Application Version:     1.2
 * File name:               balls.js
 * Description:
 *      Contains almost all Javascript code 
 *      
 *
 * File Revisions history:
 *
 *      0.0 The first version, working only with Netscape. I'm very
 *          interested to the big stuff of browser compatibility, so
 *          the idea is to keep this version unreleased and to release
 *      1.0 Completed with browser compatibility
 *	1.1 Sound added
 *	1.2 Documentation revised and improved
 *
 */

var
	BALLRAY = 10,                   // All balls are of the same ray / mass
	NBALLS = 15,                    // N. of balls. MUST BE AT LEAST 3
	BALLQRAY = BALLRAY * BALLRAY,
	BALLQRAYDST =                   // Checks the collision a little
		BALLQRAY * 4 * 1.1,         // before dist = 4 * r^2

	// I calculate them automatically on win resizing, but if the window
	// is too small, or balls are too many, there'll be problems 
	// ( see bounce(...) )
	//
	// The values are properly set with real win size in AnimationStart()
	//
	MaxX = 800,  
	MaxY = 600,             

	MaxShrinkedX = MaxX - BALLRAY,
	MaxShrinkedY = MaxY - BALLRAY,
								
	// The speed units depend on the usual animation technique: 
	// the animation is updated every DELTAT msecs
	// and the balls are advanced of an amount of pixels equal to
	// their speeds.
	// Hence, the speed is measured in pixels crossed every DELTAT msecs
	// (every time-frame)
	// 
	DELTAT = 50,   // msecs
	MAXSPEED = 10,  // pixels per time-frame

	IMGFILE = "ball.gif",
	
	SNDFILE = "boink.wav";

	
var 
	SNDNAME = "boingSound", 
	boingSound, 
	
	browserNE = false,        // Browser Detection: my thought-school
	browserIE = false;        // here is detecting IE or NE       



/*
 * Some useful functions about geometric vectors 
 * 
 ************************************************************************
 */

function TVector ( vx, vy ) 
{
	this.vx = vx
	this.vy = vy
	this.mod = VectMod;
	this.qMod = VectQMod;

	return this;
}


// Module and squared module (both are calculated directly, without
// ^ operator, nor inter-function calling, because of speed reasons)
//
function VectMod () // CLASS METHOD - DO NOT USE DIRECTLY
{
	return Math.sqrt ( this.vx * this.vx + this.vy * this.vy )
}

function VectQMod ()    // CLASS METHOD - DO NOT USE DIRECTLY
{
	return this.vx * this.vx + this.vy * this.vy
}






/*
 * The Ball object
 * 
 ************************************************************************
 */


function TBall ( name, imgName, x, y, vx, vy )
{    
	this.name = name;
	this.imgName = imgName;
	this.x = x;
	this.y = y;
	// this.r = r;

	this.v = new TVector ( vx, vy );
   
	// b.rq = b.r * b.r;
	// b.Visible = false;

	this.bouncedBy = "";        // Used in bounce()
	
	this.bounceWalls = BallBounceWalls;
	if ( browserNE )
	{
	   this.init = BallInitNE;
	   this.show = BallShowNE;
	   this.doStep = BallDoStepNE;
	}
	else
	{
	   this.init = BallInitIE;
	   this.show = BallShowIE;
	   this.doStep = BallDoStepIE;
	}
	this.toString = BallToString;

	// Preload image
	//
	var img = new Image();
	img.src = imgName;

	return this;
}


/*
 * Inits the graphical part of the ball, creating
 * a layer with the same name
 *
 * WARNING: It writes html body, must be called after body ... /body
 * 
 *
 */
 
// Netscape Version
//
function BallInitNE ()    // CLASS METHOD - DO NOT USE DIRECTLY
{

	// Create the layer containing the image
	// 
	document.writeln ( "<LAYER NAME = '" + this.name +
					   "' VISIBILITY = 'hide'>" );
	document.writeln ( "<IMG NAME = '" + this.name + "' SRC = '" +
					   this.imgName + "' ALT = 'aBall' " +
					   "WIDTH= '" + (BALLRAY*2) + "' " +
					   "HEIGHT = '" + (BALLRAY*2) + "'>"
						);
	document.writeln ( "</LAYER>" );
}

// IE Version
//
function BallInitIE ()    // CLASS METHOD - DO NOT USE DIRECTLY
{
	// Create the layer containing the image
	// 
	var StyleStr = "visibility:hidden; position:absolute; width:" + (BALLRAY*2) +
	"; height:" + (BALLRAY*2) + ";"
	
	document.writeln ( "<DIV NAME = '" + this.name + "' ID = '" + this.name +
					   "' STYLE = '" + StyleStr + "'>" );
	document.writeln ( "<IMG NAME = '" + this.name + "Img" + "' SRC = '" +
					   this.imgName + "' ALT = 'aBall' " +
					   "WIDTH= '" + (BALLRAY*2) + "' " +
					   "HEIGHT = '" + (BALLRAY*2) + "'>"
						);
	document.writeln ( "</DIV>" );
}

/*
 * Shows the ball, using its layer
 * For each ball we need a layer with the name of the ball itself
 * Maybe we'll use directly the row below, in order to increase speed
 *
 */
function BallShowNE ()  // CLASS METHOD - DO NOT USE DIRECTLY
{
	document.layers[ this.name ].moveToAbsolute
		(this.x - BALLRAY, this.y - BALLRAY);
	document.layers[ this.name ].visibility = "show";
}

function BallShowIE ()  // CLASS METHOD - DO NOT USE DIRECTLY
{
	
	document.all [ this.name ].style.left  = this.x - BALLRAY;
	document.all [ this.name ].style.top = this.y - BALLRAY;
	document.all [ this.name ].style.visibility = "visible";
}



/*
 * Hides the ball
 * Maybe... as above...
 *
 */
function BallHideNE () // CLASS METHOD - DO NOT USE DIRECTLY
{
	document.layers[ this.name ].visibility = "hide";
}

function BallHideIE () // CLASS METHOD - DO NOT USE DIRECTLY
{
	document.all [this.name].visibility = "hidden";
}



/*
 * Changes the ball coordinates accordingly to its speed 
 * and moves the ball
 *
 * Does not check for collisions or walls
 *
 */
function BallDoStepNE () // CLASS METHOD - DO NOT USE DIRECTLY
{
	this.x += this.v.vx;
	this.y += this.v.vy;

	// The speed is in pixels each delta-time
	//
	document.layers[ this.name ].moveToAbsolute
		(this.x - BALLRAY, this.y - BALLRAY);
}

function BallDoStepIE () // CLASS METHOD - DO NOT USE DIRECTLY
{
	this.x += this.v.vx;
	this.y += this.v.vy;

	// The speed is in pixels each delta-time
	//
	document.all [ this.name ].style.left  = this.x - BALLRAY;
	document.all [ this.name ].style.top = this.y - BALLRAY;
}



/*
 * Checks the collision with walls and changes velocity in case
 *
 */
function BallBounceWalls ()  // CLASS METHOD - DO NOT USE DIRECTLY
{

	var retval = false;

	if ( this.v.vx < 0 && this.x <= BALLRAY )   // The left wall
	{
		this.x = 0;
		this.v.vx = - this.v.vx;
		retval = true;
	}
	else if ( this.v.vx > 0 && this.x >= MaxShrinkedX )    // The right wall
	{
		this.x = MaxShrinkedX;
		this.v.vx = - this.v.vx;
		retval = true;
	}


	if ( this.v.vy < 0 && this.y <= BALLRAY )   // The top wall
	{
		this.y = 0;             
		this.v.vy = - this.v.vy;
		retval = true;
	}
	else if ( this.v.vy > 0 && this.y >= MaxShrinkedY )    // The bottom wall
	{
		this.y = MaxShrinkedY;
		this.v.vy = - this.v.vy;
		retval = true;
	}

	if ( retval )
		this.bouncedBy = "";

	return retval;

}


function BallToString () // CLASS METHOD - DO NOT USE DIRECTLY
{
	return "Ball '" + this.name + "'" +
		"  (" + this.x + ", " + this.y + ")" + 
		"   <)" + this.v.vx + ", " + this.v.vy 
		
}

/*
 * Balls collisions, checking and handling
 * 
 ************************************************************************
 */

function bounce ( ball1, ball2 )
{      
	// The following checkings based on ball.bouncedBy 
	// avoids the "I-bounced-you-you-bounced-me" syndrome. Anyway:
	// 1) You must have at least 3 balls (not too few), since
	// otherwise successive crashes between the same balls won't be tracked
	// 2) You can't have neither too much balls, nor a window too small, 
	// because the stuff works well when there aren't groups of attached 
	// balls
	//
	
	var d = qdist ( ball1.x, ball1.y, ball2.x, ball2.y );
	// var sr = this.rq + ball2.rq;
	
	if ( d >= BALLQRAYDST )
		return false;

	if ( ball1.bouncedBy == ball2.name )
		return false;

	/*  sOrt is the Center1 -> Center2 vector
		sPar is its orthogonal, with right-hand rule orientation */

	var sPar = new TVector ( ball2.x - ball1.x, ball2.y - ball1.y ), 
		sOrt = new TVector ( ball1.y - ball2.y, ball2.x - ball1.x );

   
	/*  Calculates components of the vector ortogonal to the Center1->Center2
		vector */

	var sParMod = sPar.mod();

	var cosTh = sPar.vx / sParMod,
		sinTh = sPar.vy / sParMod;


	/*
	 *  Calculates the components of velocities along sPar and sOrt
	 */
  
	var vc1 = new TVector ( ball1.v.vx * cosTh + ball1.v.vy * sinTh, 
							ball1.v.vy * cosTh - ball1.v.vx * sinTh );

	var vc2 = new TVector ( ball2.v.vx * cosTh + ball2.v.vy * sinTh,
							ball2.v.vy * cosTh - ball2.v.vx * sinTh );


	// Checks for signs to see if we're effectively crashing together
	//
	if ( (vc1.vx < 0 && vc2.vx > 0) || ( !vc1.vx && !vc2.vx) )
		return false;


	// Calculates new components, case of same masses
	//

	var
		vc1n = vc1, 
		vc2n = vc2;

	vc1n.vx = vc2.vx;
	vc2n.vx = vc1.vx;


	// Brings back the new speed values into xy system
	//
	ball1.v.vx = vc1n.vx * cosTh - vc1n.vy * sinTh;
	ball1.v.vy = vc1n.vx * sinTh + vc1n.vy * cosTh;

	ball2.v.vx = vc2n.vx * cosTh - vc2n.vy * sinTh;
	ball2.v.vy = vc2n.vx * sinTh + vc2n.vy * cosTh;
		
	// Registers bouncing
	//
	ball1.bouncedBy = ball2.name;
	ball2.bouncedBy = ball1.name;

	return true;
}




/*
 * Managing the animation
 * 
 ************************************************************************
 */


/*
 * Redefines margins on window resize event
 *
 */
function HandleWinResize()
{

	// put away the scrollbars space
	//   
	if ( browserNE )
	{
		MaxX = this.innerWidth - 30; MaxY = this.innerHeight - 30;
	}
	else 
	{
		MaxX = document.body.clientWidth - 30; MaxY = document.body.clientHeight - 30;
	}
	
	MaxShrinkedX = MaxX - BALLRAY;
	MaxShrinkedY = MaxY - BALLRAY;
	
}


/*
 * Creates the balls
 * CALL THE FUNCTION INSIDE head ... /head
 */

var
	theBalls = new Array(),
	threadID;
	

function AnimationSetup ()
{
	// Browser Detection
	// 
	browserDetection();
	
	// I noticed IE is slower ( it's Microsoft... :-> )
	//
	if (browserIE) MAXSPEED *= 1.3;
	
	for ( var i = 0; i < NBALLS; i++ )
	{
		// In this improvement I like to change color...
		IMGFILE = "ball" + (i % 3 + 1) + ".gif";
		
		theBalls[i] = new
			TBall ( "Ball" + i, IMGFILE, 
			  intRnd(BALLRAY, MaxShrinkedX), intRnd(BALLRAY, MaxShrinkedY),
			  intRnd(1, MAXSPEED), intRnd(1, MAXSPEED)
			);
	}
	
	// Creates sound object 
	boingSound = new Sound ( SNDNAME, SNDFILE );

}    


/*
 * Starts the animation, may be called by  < body onLoad = ...
 *
 */
function AnimationStart ()
{
	// Forces a size update after document body has been 
	// loaded
	// The size is not calculated at load, since fucked! IE wants first the body
	// be loaded 
	//
	HandleWinResize(); 
	
	for ( var i = 0; i < NBALLS; i++ )
	{
		theBalls[i].init();
		theBalls[i].show();
	}

	// Inits sound object
	boingSound.init();

	// We need to recalculate margin every time resize occours
	window.onResize = HandleWinResize;     // NE
	window.onresize = HandleWinResize;     // Fucked IE

	// Start!
	// setInterval is faster, setTimeout is down-compatible
	//
	threadID = window.setInterval (AnimationLoop, DELTAT)
}


/*
 * The animation loop: updates the positions and checks for all
 * possible collisions, beetween balls and against the walls
 *
 */
function AnimationLoop ()
{
	for ( var i = 0; i < NBALLS; i++ )
	{

		// Bouncing the walls?
		//
		if ( theBalls[i].bounceWalls() )
		{
			theBalls[i].doStep();
			
			// A crash against walls, BOING!
			// boingSound.play();		  
		}

		// Compare current ball with all other ones
		// As stated above, first a possible collision is checked, then
		// in case it's processed further 
		//
		for (var j = i + 1; j < NBALLS; j++ )
			if ( bounce ( theBalls[i], theBalls[j] ) )
			   // They crashed toghether, BOING!
			   boingSound.play();		 
			
		// Come on!
		//
		theBalls[i].doStep();

	}

	// And after the long loop, we'll redo it from start, called
	// by setInterval
	//
}


/*
 * If you are perfectionist, you may use them in window.onClose
 * or something...
 *
 */
function AnimationStop()
{
	window.clearInterval ( threadID );

	// Restartable with AnimationStart()
}

function AnimationEnd()
{
	AnimationStop();

	for ( var i = 0; i < NBALLS; i++ )
		theBalls[i].hide();

	// Yes, restartable too, though it has to be considered a
	// destroyer
}


/*
 * The Sound object, used to...  guess it! :-)
 * 
 ************************************************************************
 */

function Sound (name, fileName)
{
    this.name = name;
	this.fileName = fileName;
	
	this.init = SoundInit;
	if (browserIE)			  
	{
	    this.play = SoundPlayIE;
    	this.stop = SoundStopIE;
    }
	else
	{
	    this.play = SoundPlayNE;
    	this.stop = SoundStopNE;
	}
	return this;
}


function SoundInit ()	  	 // CLASS METHOD - DO NOT USE DIRECTLY
{
	if ( browserIE)
		document.writeln ( "<BGSOUND ID='" + this.name+ "' NAME = '" + this.name + "'>" );
	else
		document.writeln ( "<EMBED NAME='" + this.name + "' SRC='" + this.fileName + 
		"' HIDDEN='TRUE' AUTOSTART='FALSE' MASTERSOUND>");
}

// Well, really I don't know so much about Javascritpt mmedia
// I have adapted the code from www.irt.org

function SoundPlayIE ()	 	// CLASS METHOD - DO NOT USE DIRECTLY
{
	document.all[ this.name ].src = this.fileName; 
}

function SoundPlayNE ()	 	// CLASS METHOD - DO NOT USE DIRECTLY
{
	if ( navigator.mimeTypes['audio/x-wav'].enabledPlugin.name == 'LiveAudio' ) 
		document.embeds[ this.name ].play (LOOP=1);
}


// Not yet tested...
function SoundStopIE () 	   // CLASS METHOD - DO NOT USE DIRECTLY
{
    document.all[ this.name ].src=''; 
}

function SoundStopNE () 	   // CLASS METHOD - DO NOT USE DIRECTLY
{
    document.embeds[ this.name ].stop();
}



/*
 * Miscellanea
 * 
 ************************************************************************
 */

// Squared distance
//
function qdist (x1, y1, x2, y2)
{
	dx = x2 - x1;
	dy = y2 - y1;
	return dx * dx + dy * dy;
}

// Uhm... It seems not to exist...
//
function toInt ( x )
{
	return ( x > 0 ? Math.floor( x ) : Math.ceil ( x ) )
}


// Returns an integer random number, falling in the specified (inclusive)
// range
//
function intRnd ( low, high )
{
	return toInt ( Math.random() * (high - low + 1) ) + low 
}
			
			
//
// We want IE or NE, version 4 or upper
//
// Along the code, the browsers flags drive decisions under the schema:
//
// if (browserNE)
//    is Netscape
// else
//     is Explorer or (we wish) an ECMA compatible browser
// 
// (Yes, I hate uSoft but I know IE model is a succesful standard...)
//
function browserDetection()
{
	
	var appName = navigator.appName,
		appVer = navigator.appVersion,
		rightVer = false;

	appName = appName.toUpperCase();
	appVer = parseFloat ( appVer.substr (0, 4) );
	if ( isNaN( appVer ) ) appVer = 0;
		 
	if ( appName.search("NETSCAPE") != -1 )
	{
		browserNE = true;           // Good guy... ;-)
		browserIE = false; 
		rightVer = appVer >= 4;
	}
	else if ( appName.search("EXPLORER") != -1 )
	{
		browserNE = false;          // Long life to Judge Jackson! :->>
		browserIE = true; 
		rightVer = appVer >= 4;
	}
	
	if (!rightVer)
	   alert ( "WARNING: I work only with Netscape or Explorer, ver. 4 or upper");

}
