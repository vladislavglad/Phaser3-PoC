class EnemyObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, moduleID, enemyDefeated = false) {
        super(scene, x, y, texture, frame);

        //ID to differentiate enemy -> each represent a game module.
        this.moduleID = moduleID;
        this.enemyDefeated = enemyDefeated;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);
    }
}