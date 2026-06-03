(function() {



    var Bullet, Enemy, Player, bulletEnemyHandler, bullet_time, bullets, bullets_count, checkInput, controls, create, currentHorizontalDirection, currentVerticalDirection, drawShape, enemies, enemies_bullets, enemies_count, game, gameOver, killEnemy, max_delay, min_delay, motion, motionUpdate, motion_timer, moveBullets, moveEnemies, movePlayer, nextLevel, player, playerEnemyHandler, preload, preview, render, resetGame, score, score_text, slowDownTime, spawnText, speed, speedUpTime, text, time, update, updateMotion, updateScore;
    player = null;
    bullets = null;
    bullets_count = 3;
    bullet_time = 0;
    enemies = null;
    enemies_count = 0;
    enemies_bullets = null;
    time = 0;
    speed = 10;
    motion = 0;
    motion_timer = null;
    max_delay = 60;
    min_delay = 1;
    text = null;
    score = 0;
    score_text = null;
    controls = [];
    currentVerticalDirection = false;
    currentHorizontalDirection = false;
    abeceda = ['a', 'b', 'v', 'g', 'd', 'e', 'ž', 'z', 'i', 'đ', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'š', 'ć', 'c', 'č', 'j', 'ê', 'ь', 'û', 'ô', 'ï', 'î'];
    slova_u_igri = [];
    var rnd_broj = ""
    preload = function() {};
    create = function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.stage.backgroundColor = '#CCCCCC';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.Y);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.Z);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.CONTROL); // Dodaj ovaj red
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.RIGHT);
controls = {
    "up": game.input.keyboard.addKey(Phaser.Keyboard.UP),
    "down": game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
    "left": game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
    "right": game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
};

        return nextLevel();

    };
    resetGame = function() {

        var bullet, enemy, i;
        game.world.removeAll();
        score_text = game.add.text(game.world.width - 60, 10, score);
        score_text.align = 'right';
        score_text.font = 'Orbitron';
        score_text.fontSize = 40;
        score_text.fill = '#ff0000';
        player = new Player(game, game.rnd.integerInRange(100, game.world.width - 100), 500, drawShape(32, 32, '#FFFFFF', "igrac"));
        bullets = game.add.group();
        i = 0;
        while (i < bullets_count) {
            bullet = new Bullet(game, 0, 0, drawShape(10, 10, '#000000', "a"));

            bullets.add(bullet);
            bullet.events.onOutOfBounds.add(bullet.kill, bullet);
            i++;
        }
        enemies = game.add.group();
        enemies_bullets = game.add.group();
        i = 0;
        while (i < enemies_count) {
            enemy = new Enemy(game, game.rnd.integerInRange(100, game.world.width - 100), game.rnd.integerInRange(50, 150), drawShape());
            enemies.add(enemy);
            i++;
        }
        return motion_timer = game.time.events.loop(60, motionUpdate, this);
    };
    drawShape = function(width, height, color, text) {
        var bmd;
        if (width == null) {
            width = 64;
        }
        if (height == null) {
            height = 64;
        }
        if (color == null) {
            color = '#ff0000';
        }
        bmd = game.add.bitmapData(width, height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = color;
        bmd.ctx.fill();

        if (text == null) {
            bmd.ctx.font = '50px Gla';
            bmd.ctx.textBaseline = "top";
            bmd.ctx.fillStyle = 'white';
            slova_u_igri.push(rnd_broj);

            switch (rnd_broj) {
                case "đ":
                    bmd.ctx.fillText(rnd_broj, 12, 4);
                    break;
                case "ь":
                    bmd.ctx.fillText('[', 15, 6);
                    break;
                case "š":
                    bmd.ctx.fillText(rnd_broj, 10, 5);
                    break;
                case "e":
                    bmd.ctx.fillText(rnd_broj, 20, 4);
                    break;
                case "o":
                    bmd.ctx.fillText(rnd_broj, 20, 5);
                    break;
                case "i":
                    bmd.ctx.fillText(rnd_broj, 20, 5);
                    break;
                case "ž":
                    bmd.ctx.fillText(rnd_broj, 12, 10);
                    break;
                case "j":
                    bmd.ctx.fillText(rnd_broj, 12, 5);
                    break;
                case "č":
                    bmd.ctx.fillText(rnd_broj, 12, 5);
                    break;
                case "r":
                    bmd.ctx.fillText(rnd_broj, 20, 5);
                    break;
                case "g":
                    bmd.ctx.fillText(rnd_broj, 12, 2);
                    break;
                case "g":
                    bmd.ctx.fillText(rnd_broj, 20, 2);
                    break;
                case "f":
                    bmd.ctx.fillText(rnd_broj, 18, 2);
                    break;
                case "v":
                    bmd.ctx.fillText(rnd_broj, 12, 4);
                    break;
                case "t":
                    bmd.ctx.fillText(rnd_broj, 12, 5);
                    break;
                case "s":
                    bmd.ctx.fillText(rnd_broj, 13, 5);
                    break;
                case "š":
                    bmd.ctx.fillText(rnd_broj, 29, 8);
                    break;
                case "n":
                    bmd.ctx.fillText(rnd_broj, 20, 5);
                    break;
                case "l":
                    bmd.ctx.fillText(rnd_broj, 10, 10);
                    break;
                case "u":
                    bmd.ctx.fillText(rnd_broj, 15, 5);
                    break;
                case "b":
                    bmd.ctx.fillText(rnd_broj, 18, 5);
                    break;
                case "d":
                    bmd.ctx.fillText(rnd_broj, 12, 4);
                    break;
                case "a":
                    bmd.ctx.fillText(rnd_broj, 18, 4);
                    break;
                case "ć":
                    bmd.ctx.fillText(rnd_broj, 10, 6);
                    break;
                case "ê":
                    bmd.ctx.fillText('', 15, 6);
                    break;

                case "û":
                    bmd.ctx.fillText('', 10, 6);
                    break;
                case "ô":
                    bmd.ctx.fillText('C', 10, 6);
                    break;
                case "ï":
                    bmd.ctx.fillText('I', 10, 6);
                    break;
                case "î":
                    bmd.ctx.fillText('Y', 10, 6);
                    break;
                default:
                    bmd.ctx.fillText(rnd_broj, 15, 2);
            }
        } else if (text === "igrac") {
            bmd.ctx.font = '20px Arial';
            bmd.ctx.textBaseline = "top";
            bmd.ctx.fillStyle = 'black';
            bmd.ctx.fillText(rnd_broj, width / 2 - 4, height / 2 - 10);
        }

        return bmd;
    };
checkInput = function() {
    if (controls.up.isDown || controls.down.isDown || controls.left.isDown || controls.right.isDown) {
        speedUpTime();
    } else {
        slowDownTime();
    }
    if (controls.left.isDown) {
        currentHorizontalDirection = "left";
    } else if (controls.right.isDown) {
        currentHorizontalDirection = "right";
    } else {
        currentHorizontalDirection = false;
    }
    if (controls.up.isDown) {
        currentVerticalDirection = "up";
    } else if (controls.down.isDown) {
        currentVerticalDirection = "down";
    } else if (!currentHorizontalDirection) {
        currentVerticalDirection = "up";
    } else {
        currentVerticalDirection = false;
    }
if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.isDown(Phaser.Keyboard.Z) || game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
    return player.fireBullet(currentHorizontalDirection, currentVerticalDirection);
}
};
    movePlayer = function() {
        return player.motionUpdate();
    };
    moveEnemies = function() {
        return enemies.forEachAlive(function(enemy) {
            return enemy.motionUpdate();
        });
    };
    moveBullets = function() {
        bullets.forEachAlive(function(bullet) {
            return bullet.motionUpdate();
        });
        return enemies_bullets.forEachAlive(function(bullet) {
            return bullet.motionUpdate();
        });
    };
    playerEnemyHandler = function(player, enemy) {
        if (enemy.can_kill) {
            enemy.can_kill = false;
            player.tint = 0xff0000;
            slova_u_igri = [];
            return game.time.events.add(Phaser.Timer.SECOND * 0.2, function() {
                return gameOver();
            }, this);
        }
    };
    bulletEnemyHandler = function(bullet, enemy) {
        enemy.tint = 0x673ab;

        bullet.kill();
        enemy.can_kill = false;
        updateScore(score += 1);
        return game.time.events.add(Phaser.Timer.SECOND * 0.2, function() {
            return killEnemy(enemy);
        }, this);
    };
    killEnemy = function(enemy) {
        enemy.kill();
        if (!enemies.getFirstAlive()) {
            return nextLevel();
        }
    };
    speedUpTime = function() {
        if (motion_timer.delay > min_delay) {
            motion_timer.delay -= 2;
        } else {
            motion_timer.delay = min_delay;
        }
        return time = motion_timer.delay + speed;
    };
    slowDownTime = function() {
        if (motion_timer.delay < max_delay) {
            motion_timer.delay += 2;
        } else {
            motion_timer.delay = max_delay;
        }
        return time = motion_timer.delay - speed;
    };
    updateMotion = function() {
        return motion = (100 - (time * 2)) + speed;
    };
    gameOver = function() {
        enemies_count = 1;
        updateScore(0);
        rnd_broj = abeceda[Math.floor(Math.random() * abeceda.length)];
        resetGame();

        spawnText("KRAJ");
        return game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            return spawnText("IGRE");
        }, this);
    };
    nextLevel = function() {
        rnd_broj = abeceda[Math.floor(Math.random() * abeceda.length)];
        enemies_count++;
        slova_u_igri = [];
        resetGame();
        spawnText("NOVA");
        return game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            return spawnText("RAZINA");

        }, this);
    };
    spawnText = function(text, lifespan) {
        if (text == null) {
            text = false;
        }
        if (lifespan == null) {
            lifespan = 0.5;
        }
        if (text) {
            text = game.add.text(game.world.centerX, game.world.centerY, text);
            text.anchor.set(0.5);
            text.align = 'center';
            text.font = 'Orbitron';
            text.fontSize = 150;
            text.fill = '#ff0000';
            return game.time.events.add(Phaser.Timer.SECOND * lifespan, function() {
                return text.kill();
            }, this);
        }
    };
    updateScore = function(points) {
        score = points;
        return score_text.text = score;
    };
    motionUpdate = function() {
        updateMotion();
        movePlayer();
        moveEnemies();
        return moveBullets();
    };
    update = function() {
        checkInput();
        game.physics.arcade.overlap(player, enemies, playerEnemyHandler, null, this);
        game.physics.arcade.overlap(player, enemies_bullets, playerEnemyHandler, null, this);
        game.physics.arcade.overlap(bullets, enemies, bulletEnemyHandler, null, this);
        return game.physics.arcade.collide(bullets, enemies_bullets);
    };
    render = function() {};
    Player = function(game, x, y, sprite) {
        Phaser.Sprite.call(this, game, x, y, sprite);
        game.physics.arcade.enable(this);
        this.game = game;
        this.anchor.set(0.5);
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.reposition, this);
        this.body.drag.x = 1;
        this.body.drag.y = 1;
        return game.add.existing(this);
    };
    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;
    Player.prototype.motionUpdate = function() {
        var speed_modifier;
        speed_modifier = speed / 6;
        if (controls.up.isDown) {
            this.body.velocity.y = -motion * speed_modifier;
        } else if (controls.down.isDown) {
            this.body.velocity.y = motion * speed_modifier;
        }
        if (controls.left.isDown) {
            this.body.velocity.x = -motion * speed_modifier;
        } else if (controls.right.isDown) {
            this.body.velocity.x = motion * speed_modifier;
        }
        if (!controls.up.isDown && !controls.down.isDown && !controls.left.isDown && !controls.right.isDown) {
            if (this.body.velocity.x > 0) {
                this.body.velocity.x -= motion / 2;
            } else if (this.body.velocity.x < 0) {
                this.body.velocity.x += motion / 2;
            }
            if (this.body.velocity.y > 0) {
                return this.body.velocity.y -= motion / 2;
            } else if (this.body.velocity.y < 0) {
                return this.body.velocity.y += motion / 2;
            }
        }
    };
    Player.prototype.reposition = function() {
        if (this.x < 0) {
            return this.x = game.world.width;
        } else if (this.x > game.world.width) {
            return this.x = 0;
        } else if (this.y < 0) {
            return this.y = game.world.height;
        } else if (this.y > game.world.height) {
            return this.y = 0;
        }
    };
    Player.prototype.fireBullet = function(h, v) {
        var bullet;
        if (h == null) {
            h = false;
        }
        if (v == null) {
            v = false;
        }
        if (game.time.now > bullet_time) {
            bullet = bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(this.x, this.y);
                bullet.h = h;
                bullet.v = v;
                bullet.mass = 1;
                return bullet_time = game.time.now + 150;
            }
        }
    };
    Bullet = function(game, x, y, sprite, h, v) {
        if (h == null) {
            h = false;
        }
        if (v == null) {
            v = false;
        }
        Phaser.Sprite.call(this, game, x, y, sprite);
        game.physics.arcade.enable(this);
        this.game = game;
        this.exists = false;
        this.visible = false;
        this.checkWorldBounds = true;
        this.angle = 45;
        this.anchor.set(0.5);
        this.mass = 0.2;
        this.can_kill = true;
        this.h = h;
        return this.v = v;
    };
    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;
Bullet.prototype.motionUpdate = function() {
    var speed_modifier = speed / 2;
    
    switch (this.h) {
        case "left":
            this.body.velocity.x = -motion * speed_modifier;
            break;
        case "right":
            this.body.velocity.x = motion * speed_modifier;
            break;
    }
    
    switch (this.v) {
        case "up":
            this.body.velocity.y = -motion * speed_modifier;
            break;
        case "down":
            this.body.velocity.y = motion * speed_modifier;
            break;
    }
};
    Enemy = function(game, x, y, sprite) {
        Phaser.Sprite.call(this, game, x, y, sprite);
        game.physics.arcade.enable(this);
        this.game = game;
        this.anchor.set(0.5);
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.reposition, this);
        this.body.bounce.x = 1;
        this.body.bounce.y = 1;
        this.body.drag.x = 1;
        this.body.drag.y = 1;
        this.type = _.sample([1, 2, 3, 4, 5]);
        this.can_kill = true;
        return this.can_shoot = true;
    };
    Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy.prototype.constructor = Enemy;
    Enemy.prototype.motionUpdate = function() {
        switch (this.type) {
            case 1:
                this.body.velocity.y = motion;
                break;
            case 2:
                this.body.velocity.x = -motion;
                break;
            case 3:
                this.body.velocity.x = motion;
                break;
            default:
                this.game.physics.arcade.moveToObject(this, player, motion);
        }
        if (this.can_shoot) {
            this.fireBullet();
            this.can_shoot = false;
            return this.game.time.events.add(Phaser.Timer.SECOND * this.game.rnd.integerInRange(3, 10), function() {
                return this.can_shoot = true;
            }, this);
        }
    };
    Enemy.prototype.reposition = function() {
        if (this.x < 0) {
            return this.x = game.world.width;
        } else if (this.x > game.world.width) {
            return this.x = 0;
        } else if (this.y < 0) {
            return this.y = game.world.height;
        } else if (this.y > game.world.height) {
            return this.y = 0;
        }
    };
    Enemy.prototype.fireBullet = function() {
    var buffer, bullet, h, v;
    bullet = new Bullet(game, 0, 0, drawShape(10, 10, '#ff0000'));
    enemies_bullets.add(bullet);
    bullet.reset(this.x, this.y);
    buffer = 100;
    if (player.x < this.x - buffer) {
        h = "left";
    } else if (player.x > this.x + buffer) {
        h = "right";
    } else {
        h = false;
    }
    if (player.y < this.y - buffer) {
        v = "up";
    } else if (player.y > this.y + buffer) {
        v = "down";
    } else {
        v = false;
    }
    bullet.h = h;
    return bullet.v = v;
};
// === ZAMIJENI S OVIH 13 REDOVA ===
if (document.fonts && document.fonts.load) {
    // Čekamo da preglednik preuzme font prije pokretanja Phaser igre
    document.fonts.load('1px Gla').then(initGame);
} else {
    // Fallback za starije preglednike
    setTimeout(initGame, 400);
}

function initGame() {
    game = new Phaser.Game(900, 600, Phaser.AUTO, "game", {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
}
}).call(this);