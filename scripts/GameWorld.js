// const AGGRO_RADIUS = 120;
// const REACTIVATION_RADIUS = 50;
// const ENEMY_SPEED = 40;

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

        this.enemies = [];
        //Entierly new class (to differentiate enemies by ID).
        let enemy = new EnemyObject(this, 20,20, "baddie", 3, 0).setTintFill(0xadd8e6);
        let enemy2 = new EnemyObject(this, config.width - 20, 20, "baddie", 3, 1).setTintFill(0x90ee90);
        this.enemies.push(enemy, enemy2);

        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            //this.cameras.main.shake(300);

            //IMPORTANT: allows the game world to know what is being presented.
            currentContentID = enemy.moduleID;

            if (enemy.moduleID === 0)
                switchTo("myDiv1"); //called from within scheduler.js
            else if (enemy.moduleID === 1)
                switchTo("myDiv2");
            
            enemy.active = false;
            enemy.setVisible(false);
            enemy.disableBody();
            //this.scene.switch("GameModule");
        }, null, this);

        //Enemy movement engine.
        this.MovementManager.initiateEnemy();

        this.events.on("wake", this.onWakeUp, this);
    }

    update() {
        //here should go player movement manager that would be imported from a universal module.
        this.MovementManager.playerMovementManager();
    }

    initiateEnemy_local() {
        this.time.addEvent({
            delay: 500,
            callback: this.moveEnemies_local,
            callbackScope: this,
            repeat: Infinity,
            startAt: 2000,
        });
    }

    moveEnemies_local() {
        this.enemies.forEach(enemy => {
            if (this.shouldChase(enemy))
                this.moveEnemy_local(enemy);
            else 
                enemy.setVelocity(0,0);
        });
    }

    moveEnemy_local(enemy) { 
        if (enemy.active) {
            let diffX = enemy.x - this.player.x;
            let diffY = enemy.y - this.player.y;

            //Move X
            if (diffX < 0) {
                enemy.scaleX = 1;
                enemy.setVelocityX(ENEMY_SPEED);
                enemy.flipX = false;
            } else {
                enemy.scaleX = 1;
                enemy.setVelocityX(-ENEMY_SPEED);
                enemy.flipX = true;
            }
            //Move Y
            if (diffY < 0) {
                enemy.scaleY = 1;
                enemy.setVelocityY(ENEMY_SPEED);
            } else {
                enemy.scaleY = 1;
                enemy.setVelocityY(-ENEMY_SPEED);
            }
        } else 
            this.reactivateEntity(enemy);
    }

    shouldChase(enemy) {
        let currentDistance = this.getDistanceToPlayer(enemy);
        //console.log(currentDistance);

        if (currentDistance < AGGRO_RADIUS) {
            //console.log("Should Chase");
            return true;
        } else 
            return false;
    }

    getDistanceToPlayer(entity) {
        //Current central coordinates: x and y.
        let playerPosition = this.player.getCenter();
        let entityPosition = entity.getCenter();

        //Get distance between the two entities.
        return entityPosition.distance(playerPosition);
    }

    reactivateEntity(entity) {
        if (this.shouldReactivate(entity)) {
            entity.active = true;
            entity.enableBody();
        } else return;
    }

    shouldReactivate(entity) {
        let currentDistance = this.getDistanceToPlayer(entity);

        if (currentDistance > REACTIVATION_RADIUS) {
            return true;
        } else return false;
    }

    onWakeUp() {
        this.MovementManager.resetCursors();
    }
}