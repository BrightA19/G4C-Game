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
    this.level[0].start();
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  level: [
    // Level 1
    {
      start: function() {
        enemy = [];
        player.x = 100;
        player.y = 250;
        enemy[0] = new Sprite(250, 150, "./img/Enemy.png", 37.5, 48, "img");
        enemy[0].speed = 1.5;
        enemy[0].stage = 1;
        dog.img.src = "./img/TrappedDog.png";
        dog.x = 450;
        dog.y = 250;

        background.update();
        game.ctx.fillStyle = "#AAA";
        game.ctx.textAlign = "center";
        game.ctx.font = "60px 'Comic Sans MS'";
        game.ctx.fillText("Level 1", 250, 250);
        setTimeout(function() {
          game.level[0].interval = setInterval(game.level[0].update, 20);
        }, 1000);
      },
      stop: function() {
        window.clearInterval(this.interval);
      },
      update: function() {
        game.clear();
        background.update();
        player.controlLoc();
        if (player.collidedWith(dog)) {
          dog.img.src = "./img/Dog.png";
          game.level[0].stop();
          game.level[1].start();
        }
        if (enemy[0].stage == 1) {
          enemy[0].homeIn({
            x: 250,
            y: 350
          });
          if (enemy[0].collidedWith({
              x: 250,
              y: 350,
              width: 1,
              height: 1
            })) {
            enemy[0].stage = 2;
          }
        }
        if (enemy[0].stage == 2) {
          enemy[0].homeIn({
            x: 250,
            y: 150
          });
          if (enemy[0].collidedWith({
              x: 250,
              y: 150,
              width: 1,
              height: 1
            })) {
            enemy[0].stage = 1;
          }
        }
        if (player.collidedWith(enemy[0])) {
          game.level[0].stop();
          game.ctx.fillStyle = "#F44";
          game.ctx.textAlign = "center";
          game.ctx.font = "60px 'Comic Sans MS'";
          game.ctx.fillText("Game Over!", 250, 250);
        }
        dog.update();
        enemy[0].update();
        player.update();
      }
    },
    // Level 2
    {
      start: function() {
        enemy = [];
        player.x = 100;
        player.y = 100;
        enemy[0] = new Sprite(250, 250, "./img/Enemy.png", 37.5, 48, "img");
        enemy[0].speed = 1.5;
        dog.img.src = "./img/TrappedDog.png";
        dog.x = 450;
        dog.y = 40;

        background.update();
        game.ctx.fillStyle = "#AAA";
        game.ctx.textAlign = "center";
        game.ctx.font = "60px 'Comic Sans MS'";
        game.ctx.fillText("Level 2", 250, 250);
        setTimeout(function() {
          game.level[1].interval = setInterval(game.level[1].update, 20);
        }, 1000);
      },
      stop: function() {
        window.clearInterval(this.interval);
      },
      update: function() {
        game.clear();
        background.update();
        player.controlLoc();
        enemy[0].homeIn(player);
        if (player.collidedWith(dog)) {
          dog.img.src = "./img/Dog.png";
          game.level[1].stop();
          game.ctx.fillStyle = "#FF0";
          game.ctx.textAlign = "center";
          game.ctx.font = "60px 'Comic Sans MS'";
          game.ctx.fillText("You Win!", 250, 250);
        }
        if (player.collidedWith(enemy[0])) {
          game.level[1].stop();
          game.ctx.fillStyle = "#F44";
          game.ctx.textAlign = "center";
          game.ctx.font = "60px 'Comic Sans MS'";
          game.ctx.fillText("Game Over!", 250, 250);

        }
        dog.update();
        enemy[0].update();
        player.update();
      }
    }
  ]
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
  this.angle = 0;
  this.friction = 0.7;
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
