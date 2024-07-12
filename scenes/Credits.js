export default class Credits extends Phaser.Scene {
    constructor() {
      super("Credits");
    }
    init(){
    }

    preload(){
    this.load.image("backg", "./public/background.png");
    this.load.image("goback", "./public/homeb.png");
    this.load.image("thx", "./public/thx.png");
    this.load.image("ejem", "./public/ejem.png");
    this.load.spritesheet("electricd", "./public/electricsf.png", { frameWidth: 300, frameHeight: 300});
    this.load.spritesheet("iced", "./public/icesf.png", { frameWidth: 258, frameHeight: 255});
    this.load.spritesheet("fired", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
    this.load.spritesheet("toxicd", "./public/toxicsf.png", { frameWidth: 253, frameHeight: 253});
    this.load.audio("flytrap2", [ "./music/flytrap2.mp3"])
    }
    
    create(){

      this.anims.create({
        key: 'firea',
        frames: this.anims.generateFrameNumbers('fired', { start: 0, end: 13 }),
        frameRate: 10,
        repeat: -1
    });
       
      this.anims.create({
        key: 'toxica',
        frames: this.anims.generateFrameNumbers('toxicd', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: -1
      });
      
      this.anims.create({
        key: 'electrica',
        frames: this.anims.generateFrameNumbers('electricd', { start: 0, end: 5 }),
        frameRate: 20,
        repeat: -1
      });
    
      this.anims.create({
        key: 'icea',
        frames: this.anims.generateFrameNumbers('iced', { start: 0, end: 15 }),
        frameRate: 10,
        repeat: -1
      });
    
    this.thx = this.add.image(500, 300, "thx");    
    this.goback = this.add.image(500, 500, "goback");
    this.iced = this.add.sprite(910, 90, "iced").setScale(0.5);
    this.iced.anims.play('icea');
    this.fired = this.add.sprite(90, 95, "firea").setScale(0.5);
    this.fired.anims.play('firea');
    this.toxicd = this.add.sprite(90, 510, "toxica").setScale(0.55);
    this.toxicd.anims.play('toxica');
    this.electricd = this.add.sprite(905, 505, "electrica").setScale(0.5);
    this.electricd.anims.play('electrica');
    this.ejem = this.add.image(990, 78, "ejem");
    this.sound.pauseOnBlur = false;

    const music = this.sound.add("flytrap2");
    music.loop = true
    
    music.play()

    this.input.on('gameobjectover', (pointer, gameObject) =>
      {

          gameObject.setScale(1.1)

      });

      this.input.on('gameobjectout', (pointer, gameObject) =>
      {

          gameObject.setScale(1);

      });

    this.goback.setInteractive();
    this.goback.on("pointerdown", () =>{
      this.sound.get("flytrap2").stop();
      this.sound.get("flytrap2").destroy();
      this.scene.start("main")
    })

    }

    update(){

    
   
    }
}