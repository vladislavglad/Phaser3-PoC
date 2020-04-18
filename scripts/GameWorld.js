class GameWorld extends Phaser.Scene {
    constructor() {
        super("GameWorld");
    }

    create() {
        this.add.image(config.width/2, config.height/2, "background-image").setScale(1.3);
        this.player = this.physics.add.sprite(config.width/2 ,config.height/2, "player");
        this.cursors = this.input.keyboard.createCursorKeys();

        //Workaround to reuse code.
        this.MovementManager = new MovementManager(this.player, this.cursors);

        this.physics.world.bounds.width = config.width;
        this.physics.world.bounds.height = config.height;
        this.player.setCollideWorldBounds();

        this.enemy = this.physics.add.sprite(20, 20, "baddie", 3);
        this.speed = 40;

        //Enemy movement engine.
        this.time.addEvent({
            delay: 500,
            callback: this.moveEnemy,
            callbackScope: this,
            repeat: Infinity,
            startAt: 2000,
        });
    }

    update() {
        //here should go player movement manager that would be imported from a universal module.
        this.MovementManager.playerMovementManager();
    }

    moveEnemy() { 
        if (this.enemy.active) {
            let diffX = this.enemy.x - this.player.x;
            let diffY = this.enemy.y - this.player.y;

            //Move X
            if (diffX < 0) {
                this.enemy.scaleX = 1;
                this.enemy.setVelocityX(this.speed);
                this.enemy.flipX = false;
            } else {
                this.enemy.scaleX = 1;
                this.enemy.setVelocityX(-this.speed);
                this.enemy.flipX = true;
            }
            //Move Y
            if (diffY < 0) {
                this.enemy.scaleY = 1;
                this.enemy.setVelocityY(this.speed);
            } else {
                this.enemy.scaleY = 1;
                this.enemy.setVelocityY(-this.speed);
            }
        }
    }
}