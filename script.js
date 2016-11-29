var player = new Sprite(48, 150, "../img/Player.png", 37.5, 48, "img");

var game = {
  start: function() {
    this.div = document.getElementById("cLoc");
    this.cvs = document.getElementById("c");
    this.ctx = this.cvs.getContext("2d");
    this.width = this.cvs.width;
    this.height = this.cvs.height;
    this.update = window.setInterval(updateGame, 20);
    this.keys = [];
    this.div.addEventListener("keydown", function(e) {
      e.preventDefault();
      game.keys[e.keyCode] = true;
    });
    this.div.addEventListener("keyup", function(e) {
      game.keys[e.keyCode] = false;
    });
  },
  stop: function() {
    window.clearInterval(this.update);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
};

function Sprite(x, y, color, w, h, type) {
  this.type = type;
  if (type == "img") {
    this.img = new Image();
    this.img.src = color;
  }
  this.width = w;
  this.height = h;
  this.velX = 0;
  this.velY = 0;
  this.x = x;
  this.y = y;
  this.speed = 2;
  this.angle = 0;
  this.friction = 1.5;
  this.update = function() {
    if (type == "img") {
      game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
  this.newLoc = function() {
    this.velX /= this.friction;
    this.velY /= this.friction;

    if (game.keys[37]) this.velX = -this.speed;
    if (game.keys[38]) this.velY = -this.speed;
    if (game.keys[39]) this.velX = this.speed;
    if (game.keys[40]) this.velY = this.speed;

    this.x += this.velX;
    this.y += this.velY;
  };
}

function updateGame() {
  game.clear();
  player.newLoc();
  player.update();
}