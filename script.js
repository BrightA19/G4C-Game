var background = new Sprite(0, 0, "./img/Background.png", 600, 500, "img");
var dog = new Sprite(225, 445, "./img/Dog.png", 37.5, 37.5, "img");
var player = new Sprite(350, 200, "./img/Player.png", 37.5, 48, "img");
player.speed = 3;
var enemy = [];

var game = {
  start: function() {
    this.div = document.getElementById("cLoc");
    this.cvs = document.getElementById("c");
    this.ctx = this.cvs.getContext("2d");
    this.width = this.cvs.width;
    this.height = this.cvs.height;
    this.keys = [];
    this.div.addEventListener("keydown", function(e) {
      e.preventDefault();
      game.keys[e.keyCode] = true;
    });
    this.div.addEventListener("keyup", function(e) {
      game.keys[e.keyCode] = false;
    });
    
    this.currentLevel = 0;
    this.changeLevel(0);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
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
    this.level[this.currentLevel].start();
  },
  announceLvl: function() {
    var txt = new Sprite(250, 250, "#AAA", "Level " + this.currentLevel, "60px 'Comic Sans MS'", "txt");
    txt.update();
  },
  gameOver: function() {
    this.level[this.currentLevel].stop();
    var txt = new Sprite(250, 250, "#F44", "Game Over!", "60px 'Comic Sans MS'", "txt");
    txt.update();
  },
  youWin: function() {
    this.level[this.currentLevel].stop();
    var txt = new Sprite(250, 250, "#FC0", "You Win!", "60px 'Comic Sans MS'", "txt");
    txt.update();
  },
  level: [],
  currentLevel: 0
};

function Sprite(x, y, color, w, h, type) {
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
  this.rotate = function(choice, measure) {
    game.ctx.save();
    game.ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));

    if (choice == "add") {
      this.angle += measure;
    } else {
      this.angle = measure;
    }
    if (this.angle >= 360) {
      this.angle -= 360;
    }
    game.ctx.rotate(this.angle * (Math.PI / 360));

    game.ctx.fillStyle = color;
    game.ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    game.ctx.restore();
  };
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
