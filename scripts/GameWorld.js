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
    }

    update() {
        //here should go player movement manager that would be imported from a universal module.
        this.MovementManager.playerMovementManager();
    }
}