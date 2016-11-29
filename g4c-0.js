var player = new Sprite(10, 10, 48, 150, "#0F0");
var blue = new Sprite(25, 25, 20, 200, "#66F");
var red = new Sprite(25, 25, 60, 200, "#F66");

var game = {
  start: function() {
    this.div = document.getElementById("cLoc");
    this.cvs = document.getElementById("c");
    this.ctx = this.cvs.getContext("2d");
    this.width = this.cvs.width;
    this.height = this.cvs.height;
    this.update = window.setInterval(updateGame, 20);
    this.keys = [];
    this.div.addEventListener("keydown", function (e) {
      e.preventDefault()
      game.keys[e.keyCode] = true;
    });
    this.div.addEventListener("keyup", function (e) {
      game.keys[e.keyCode] = false;
    });
  },
  stop: function() {
    window.clearInterval(this.update);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

function Sprite(w, h, x, y, color) {
  this.width = w;
  this.height = h;
  this.velX = 0;
  this.velY = 0;
  this.x = x;
  this.y = y;
  this.speed = 2;
  this.angle = 0;
  this.update = function() {
    game.ctx.fillStyle = color;
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
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
  this.newLoc = function () {
    this.velX /= 1.5;
    this.velY /= 1.5;
    
    if (game.keys[37]) this.velX = -this.speed;
    if (game.keys[38]) this.velY = -this.speed;
    if (game.keys[39]) this.velX = this.speed;
    if (game.keys[40]) this.velY = this.speed;
    
    this.x += this.velX;
    this.y += this.velY;
  }
}

function updateGame() {
  game.clear();
  blue.rotate("add", 5.625);
  red.rotate("add", -5.625);
  player.newLoc();
  player.update();
}
