class PreloadAssets extends Phaser.Scene { 
    constructor() {
        super("PreloadAssets");
    }

    preload() {

        //loading images.
        this.load.image("background-image", "assets/images/title-screen-bg.png");

        //tile images.
        //this.load.image("grass-tile", "assets/map/grass-tile.png");
 
        //preload map in JSON.
        //this.load.tilemapTiledJSON("map", "assets/map/myMap.json");

        //player spritesheet.
        this.load.spritesheet("player", "assets/spritesheets/player.png", {
            frameWidth: 48/3,
            frameHeight: 64/4
        }); 

        this.load.spritesheet("baddie", "assets/spritesheets/baddie.png", {
            frameWidth: 64/4,
            frameHeight: 16
        });
    }

    create() {      
        //craete player movement animations.
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {
                frames: [0,1,2]
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "up", 
            frames: this.anims.generateFrameNumbers("player", {
                frames: [3,4,5]
            }),
            frameRate: 10, 
            repeat: -1
        });

        this.anims.create({
            key: "down",
            frames: this.anims.generateFrameNumbers("player", {
                frames: [6,7,8]
            }),
            frameRate: 10,
            repeat: -1
        });

        //Indicate that everything has been loaded into memory.
        isFinishedLoading = true;
        this.scene.switch("GameWorld");
    }
}