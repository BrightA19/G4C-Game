/*
These are Sprites I created. Check the Sprite constructor.
These will be used in the game, and controlled mainly in the start and update methods of game.level[#].
*/
var background = new Sprite(0, 0, "./img/SplashScreen.png", 600, 500, "img");
var dog = new Sprite(225, 445, "./img/Dog.png", 37.5, 37.5, "img");
var player = new Sprite(350, 200, "./img/Player.png", 37.5, 48, "img");

// There can be no enemies or multiple enemies, depending on game.level[#]. Therefore, the array is null.
var enemy = [];

// Speed of player.
player.speed = 3;


// This is the game object, where setup and common code appears and other stuff occurs.
var game = {
  
  // This is the levels of the game, which is defined in another file (levels.js).
  level: [],
  
  // This is where setup occurs. It is executed in "index.html", during the "onload" event.
  start: function() {
    
    // Initialize variables to elements (game canvas, div).
    this.div = document.getElementById("cLoc");
    this.cvs = document.getElementById("c");
    
    // The methods for drawing on the canvas is saved in ctx.
    this.ctx = this.cvs.getContext("2d");
    
    // Setting the width and the height from the canvas size ...
    this.width = this.cvs.width;
    this.height = this.cvs.height;
    
    /*
    Properties containing the state of keys (T/F) and coordinates of mouse (as [x, y]).
    clickXY has coordinates when the mouse is down.
    hoverXY has coordinates when the mouse is over the canvas.
    See event listeners below.
    */
    this.keys = [];
    this.clickXY = [];
    this.hoverXY = [];
    
    /*
    A bunch of event listeners, such as keys and mouse
    This sets "keys", "clickXY", and "hoverXY"
    */
    
    // Key event listeners
    this.div.addEventListener("keydown", function(e) {
      e.preventDefault();
      game.keys[e.keyCode] = true;
    });
    this.div.addEventListener("keyup", function(e) {
      game.keys[e.keyCode] = false;
    });
    
    // Mouse clicks and hover event listeners
    this.div.addEventListener("mousedown", function(e) {
      game.clickXY[0] = e.clientX - game.cvs.offsetLeft;
      game.clickXY[1] = e.clientY - game.cvs.offsetTop;
    });
    this.div.addEventListener("mouseup", function(e) {
      game.clickXY = [];
    });
    this.div.addEventListener("mousemove", function(e) {
      game.hoverXY[0] = e.clientX - game.cvs.offsetLeft;
      game.hoverXY[1] = e.clientY - game.cvs.offsetTop;
    });
    this.div.addEventListener("mouseout", function(e) {
      game.hoverXY = [];
    });
    
    // Set the current level. The first level is 0
    this.currentLevel = 0;
    
    
    /*
    This changes the currentLevel to 0.
    Since it is already 0, it just executes game.level[game.currentLevel].start
    */
    this.changeLevel(0);
    
  },
  
  // Clear method used in game.level[#].update
  clear: function() {
    
    // This clears the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
  },
  
  /*
  Changes the level, and starts it (game.level[#].start).
  Format: changeLevel(choice), where choice is "next", "previous", or a level number.
  !! currentLevel must be declared in order to use "next" and "previous"
  */
  changeLevel: function(choice) {
    
    this.level[this.currentLevel].stop();
    switch (choice) {
      case "next":
        this.currentLevel++;
        break;
      case "previous":
        this.currentLevel--;
        break;
      default:
        this.currentLevel = choice;
        break;
    }
    
    // Executes game.level[#].start
    this.level[this.currentLevel].start();
    
  },
  
  /*
  A text sprite that displays the level number in the game.
  !! currentLevel must be declared.
  */
  announceLvl: function() {
    var txt = new Sprite(250, 250, "#AAA", "Level " + this.currentLevel, "60px 'Comic Sans MS'", "txt");
    txt.update();
  },
  
  /*
  These two methods stop the current level being run
  (game.level[game.currentLevel].stop)
  gameOver displays a text sprite "Game Over!"
  youWin displays a text sprite "You Win!"
  */
  gameOver: function() {
    
    // Stop current level
    this.level[this.currentLevel].stop();
    
    var txt = new Sprite(250, 250, "#F44", "Game Over!", "60px 'Comic Sans MS'", "txt");
    txt.update();
    
  },
  youWin: function() {
    
    // Stop current level
    this.level[this.currentLevel].stop();
    
    var txt = new Sprite(250, 250, "#FC0", "You Win!", "60px 'Comic Sans MS'", "txt");
    txt.update();
    
  },
  
  /*
  With format: "click( [x,y] , [x2,y2] )",
    this checks if the mouse is down between these two coordinates
  */
  click: function(coord1, coord2) {
    if (
      game.clickXY[0] >= coord1[0] &&
      game.clickXY[0] <= coord2[0] &&
      game.clickXY[1] >= coord1[1] &&
      game.clickXY[1] <= coord2[1]
    ) {
      return true;
    } else {
      return false;
    }
  },
  
  /*
  With format: "hover( [x,y] , [x2,y2] )",
    this checks if the mouse is between these two coordinates
  */
  hover: function (coord1, coord2) {
    if (
      game.hoverXY[0] >= coord1[0] &&
      game.hoverXY[0] <= coord2[0] &&
      game.hoverXY[1] >= coord1[1] &&
      game.hoverXY[1] <= coord2[1]
    ) {
      return true;
    } else {
      return false;
    }
  }
  
};

// Sprite constructor (images, text)
function Sprite(x, y, color, w, h, type) {
  
  // Set properties
  this.type = type;
  if (type == "img") {
    this.img = new Image();
    this.img.src = color;
  }
  if (type == "txt") {
    this.color = color;
    this.txt = w;
    this.font = h;
  }
  this.width = w;
  this.height = h;
  this.velX = 0;
  this.velY = 0;
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.friction = 0.7;
  
  // Method to draw Sprite
  this.update = function() {
    if (type == "img") {
      
      game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      
    } else if (type == "txt") {
      
      game.ctx.fillStyle = color;
      game.ctx.font = this.font;
      game.ctx.textAlign = "center";
      game.ctx.fillText(this.txt, this.x, this.y);
      
    } else {
      
      game.ctx.fillStyle = color;
      game.ctx.fillRect(this.x, this.y, this.width, this.height);
      
    }
    
  };
  
  /*
  Rotate non text or image sprite (got help from w3school.com's canvas game tutorial)
  Format: rotate(choice, measure), where if choice is "add", measure is added to
  the sprite's angle property. Anything other than "add", angle is set to measure
  */
  this.rotate = function(choice, measure) {
    
    // Save current state of canvas
    game.ctx.save();
    
    // Move the canvas to the center of the sprite
    game.ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));

    if (choice == "add") {
      this.angle += measure;
    } else {
      this.angle = measure;
    }
    if (this.angle >= 360) {
      this.angle -= 360;
    }
    // Rotate the canvas (rotate uses radians, so a conversion to degrees is used)
    game.ctx.rotate(this.angle * (Math.PI / 360));
    
    // Draw sprite
    game.ctx.fillStyle = color;
    game.ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    
    // Update and restore the canvas
    game.ctx.restore();
    
  };
  
  // Moves player sprite according to the state of arrow keys in game.keys
  this.controlLoc = function() {
    this.velX *= this.friction;
    this.velY *= this.friction;

    if (game.keys[37]) this.velX = -this.speed;
    if (game.keys[38]) this.velY = -this.speed;
    if (game.keys[39]) this.velX = this.speed;
    if (game.keys[40]) this.velY = this.speed;

    this.x += this.velX;
    this.y += this.velY;
  };
  
  // Home in on a target (object) with properties "x" and "y", usually a sprite
  this.homeIn = function(target) {
    this.velX *= this.friction;
    this.velY *= this.friction;

    var disX = target.x - this.x;
    var disY = target.y - this.y;
    if (Math.abs(disX) < this.speed) {
      this.velX = disX;
    } else {
      if (disX > 0) {
        this.velX = this.speed;
      } else {
        this.velX = -this.speed;
      }
    }
    if (Math.abs(disY) < this.speed) {
      this.velY = disY;
    } else {
      if (disY > 0) {
        this.velY = this.speed;
      } else {
        this.velY = -this.speed;
      }
    }

    this.x += this.velX;
    this.y += this.velY;
  };
  
  /*
  Check if the sprite is touching or in a target with the properties:
  "x", "y", "width", and "height"  (Usually a sprite)
  */
  this.collidedWith = function(target) {
    if (
      target.x < this.x + this.width &&
      target.y < this.y + this.height &&
      this.x < target.x + target.width &&
      this.y < target.y + target.height
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  /*
  Checks which side a target touches a target with properties:
  "x", "y", "width", "height" (usually a sprite)
  Most of the code is from somethinghitme.com's canvas platformer tutorial (part 2)
  */
  this.colSide = function(target) {
    var disX = target.x + (target.width / 2) - this.x + (this.width / 2);
    var disY = target.y + (target.height / 2) - this.y + (this.height / 2);
    var offsetX = ((target.width / 2) + (this.width / 2)) - disX;
    var offsetY = ((target.height / 2) + (this.height / 2)) - disY;
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      if (offsetX > 0) {
        return "right";
      } else {
        return "left";
      }
    } else {
      if (offsetY > 0) {
        return "bottom";
      } else {
        return "top";
      }
    }
  };
  
}
