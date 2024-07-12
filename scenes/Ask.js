export default class Ask extends Phaser.Scene {
    constructor() {
      super("Ask");
    }
    init(){
    }

    preload(){
    this.load.image("backgask", "./public/askima.png");
    this.load.image("goback", "./public/gobackb.png");
    this.load.audio("flytrap2", [ "./music/flytrap2.mp3"])
    }
    
    create(){
    this.backg = this.add.image(500, 300, "backgask");   
    this.goback = this.add.image(927, 532, "goback")

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