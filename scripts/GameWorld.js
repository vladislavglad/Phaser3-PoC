class GameWorld extends Phaser.Scene {
    constructor() {
        super("GameWorld");

        //Have to initialize these to be able to use MovementManager class.
        this.player = null;
        this.cursors = null;
        this.enemies = null;
    }

    create() {
        this.add.image(config.width/2, config.height/2, "background-image").setScale(1.3);
        this.player = this.physics.add.sprite(config.width/2 ,config.height/2, "player");
        this.cursors = this.input.keyboard.createCursorKeys();

        /*
        MovementManager - is a universal class that manages player/enemy movement.
        (Introduced as a workaround to reuse code)
        */
        this.MovementManager = new MovementManager(this);

        this.physics.world.bounds.width = config.width;
        this.physics.world.bounds.height = config.height;
        this.player.setCollideWorldBounds();

        this.enemies = []
        let enemy = this.physics.add.sprite(20, 20, "baddie", 3);
        let enemy2 = this.physics.add.sprite(config.width - 20, 20, "baddie", 3);
        this.enemies.push(enemy, enemy2);
        this.speed = 40;

        //Enemy movement engine.
        this.MovementManager.enemyMovementManager();
        // this.time.addEvent({
        //     delay: 500,
        //     callback: this.moveEnemies,
        //     callbackScope: this,
        //     repeat: Infinity,
        //     startAt: 2000,
        // });
    }

    update() {
        //here should go player movement manager that would be imported from a universal module.
        this.MovementManager.playerMovementManager();
    }

    moveEnemies_local() {
        this.enemies.forEach(enemy => {
            this.moveEnemy_local(enemy);
        });
    }

    moveEnemy_local(enemy) { 
        if (enemy.active) {
            let diffX = enemy.x - this.player.x;
            let diffY = enemy.y - this.player.y;

            //Move X
            if (diffX < 0) {
                enemy.scaleX = 1;
                enemy.setVelocityX(this.speed);
                enemy.flipX = false;
            } else {
                enemy.scaleX = 1;
                enemy.setVelocityX(-this.speed);
                enemy.flipX = true;
            }
            //Move Y
            if (diffY < 0) {
                enemy.scaleY = 1;
                enemy.setVelocityY(this.speed);
            } else {
                enemy.scaleY = 1;
                enemy.setVelocityY(-this.speed);
            }
        }
    }
}