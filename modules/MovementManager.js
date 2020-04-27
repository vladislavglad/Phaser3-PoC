class MovementManager {
    constructor(scene) {
        this.scene = scene;

        this.localPlayerReferenceCreated = false;
        this.localEnemyReferenceCreated = false;
        this.createLocalPlayerReference();
        this.createLocalEnemyReference();
    }

    playerMovementManager() {
        if (this.localPlayerReferenceCreated) {
            this.player.body.setVelocity(0);

            //horizonatal movements.
            if (this.cursors.left.isDown) {
                this.player.body.setVelocityX(-80);
                this.facingDirection = 2;
            } else if (this.cursors.right.isDown) {
                this.player.body.setVelocityX(80);
                this.facingDirection = 3;
            }

            //vertical movements.
            if (this.cursors.up.isDown) {
                this.player.body.setVelocityY(-80);
                this.facingDirection = 1;
            } else if (this.cursors.down.isDown) {
                this.player.body.setVelocityY(80);
                this.facingDirection = 0;
            }

            //animations for movements.
            if (this.cursors.left.isDown) {
                this.player.flipX = false;
                this.player.anims.play('left', true);
            } else if (this.cursors.right.isDown) {
                this.player.flipX = true;
                this.player.anims.play('left', true);
            } else if (this.cursors.up.isDown) {
                this.player.anims.play('up', true);
            } else if (this.cursors.down.isDown) {
                this.player.anims.play('down', true);
            } else {
                //stops any animation from playing.
                this.player.anims.stop();
            }
        } else
            this.createLocalPlayerReference();
    }

    createLocalPlayerReference() {
        if (this.scene.player != null && this.scene.cursors != null) {
            this.player = this.scene.player;
            this.cursors = this.scene.cursors;
            this.localPlayerReferenceCreated = true; 
        }
    }

    createLocalEnemyReference() {
        if (this.scene.enemies != null) {
            this.enemies = this.scene.enemies;
            this.speed = this.scene.speed;
            this.localEnemyReferenceCreated = true;
        }
    }

    enemyMovementManager() {
        this.scene.time.addEvent({
            delay: 500,
            callback: this.moveEnemies,
            callbackScope: this,
            repeat: Infinity,
            startAt: 2000,
        });
    }

    moveEnemies() {
        if (this.localEnemyReferenceCreated && this.localEnemyReferenceCreated) {
            this.enemies.forEach(enemy => {
                this.moveEnemy(enemy); 
             });
        } else {
            this.createLocalPlayerReference();
            this.createLocalEnemyReference();
        }
    }
    
    moveEnemy(enemy) { 
        if (enemy.active) {
            let diffX = enemy.getCenter().x - this.player.getCenter().x;
            let diffY = enemy.getCenter().y - this.player.getCenter().y;
            
            //Move X
            if (diffX < 0) {
                enemy.scaleX = 1;
                enemy.x += this.speed;
                enemy.flipX = false;
            } else {
                enemy.scaleX = 1;
                enemy.x -= this.speed;
                enemy.flipX = true;
            }
            //Move Y
            if (diffY < 0) {
                enemy.scaleY = 1;
                enemy.y += this.speed;
            } else {
                enemy.scaleY = 1;
                enemy.y -= this.speed;
            }
        }
    }
}