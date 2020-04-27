class GameModule extends Phaser.Scene {
    constructor() {
        super("GameModule");
    }

    create() {
        this.add.text(45, config.height/2, "Game Module Placeholder.");

        //Exit placeholder.
        this.time.addEvent({delay: 2000, repeat: true, callback: () => {
            this.scene.switch("GameWorld");
        }, callbackScope: this});
    }
}