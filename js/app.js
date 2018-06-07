// Enemies our player must avoid
let Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200) + 50;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x >= 515) {
        this.x = -75;
        //Following line setting speed was developed by researching the Udacity Discussion Forums
        this.speed = this.speed = Math.floor(Math.random() * 250) + 150;
    }
    //Handles collision with enemy - code adapted from http://www.gaminglogy.com/tutorial/collision-detection/
        if ((this.x <= player.x && this.x + 100 >= player.x) &&
            (this.y <= player.y && this.y + 85 >= player.y)) {
            player.reset();
        }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create player class
let Player = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
};

// Player reaches the water, reset player
Player.prototype.update = function() {
    if (this.y === -25) {
        player.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
    if (move.valueOf() === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (move.valueOf() === 'up' && this.y > -25) {
        this.y -= 85;
    }
    if (move.valueOf() === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (move.valueOf() === 'down' && this.y < 400) {
        this.y += 85;
    }

};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// instantiate Enemy and Player objects with starting positions.
let allEnemies = [];
let enemy1 = new Enemy(0,60);
let enemy2 = new Enemy(0,145);
let enemy3 = new Enemy(0,230);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

let player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
