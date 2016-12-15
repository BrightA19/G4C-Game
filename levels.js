// Level 0
game.level[0] = {
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
    game.announceLvl();
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
      game.changeLevel("next");
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
      game.gameOver();
    }
    dog.update();
    enemy[0].update();
    player.update();
  }
};
  
game.level[1] = {
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
    game.announceLvl();
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
      game.youWin();
    }
    if (player.collidedWith(enemy[0])) {
      game.gameOver();
    }
    dog.update();
    enemy[0].update();
    player.update();
  }
};