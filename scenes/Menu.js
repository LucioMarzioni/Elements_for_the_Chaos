export default class Menu extends Phaser.Scene {
    constructor() {
      super("main");
    }
    init(){ 
    }

    preload(){
    this.load.image("menuimg", "./public/menuimg.png");
    this.load.image("play", "./public/playb.png");
    this.load.image("askb", "./public/askb.png");
    this.load.image("creditsb", "./public/creditsb.png");
    this.load.audio('flytrap', [ './music/Heinousflytrap.mp3'])
    }

    create(){   
    this.menuimg = this.add.image(500, 300, "menuimg");
    this.play = this.add.image(750, 400, "play").setInteractive();
    this.askb = this.add.image(865, 525, "askb").setInteractive();
    this.creditsb = this.add.image(680, 525, "creditsb").setInteractive();

    this.sound.pauseOnBlur = false;

    const music = this.sound.add('flytrap');
    music.loop = true
    
    music.play();
    
    this.input.on('gameobjectover', (pointer, gameObject) =>
      {

          gameObject.setScale(1.1)

      });

      this.input.on('gameobjectout', (pointer, gameObject) =>
      {

          gameObject.setScale(1);

      });
    this.play.setInteractive();
    this.play.on("pointerdown", () =>{
      this.sound.get("flytrap").stop();
      this.sound.get("flytrap").destroy();
      this.scene.start("Game");
    })

    this.askb.setInteractive();
    this.askb.on("pointerdown", () =>{
      this.sound.get("flytrap").stop();
      this.sound.get("flytrap").destroy();
      this.scene.start("Ask")
    })

    this.creditsb.setInteractive();
    this.creditsb.on("pointerdown", () =>{
      this.sound.get("flytrap").stop();
      this.sound.get("flytrap").destroy();
      this.scene.start("Credits")
    })
    
    }

    update () {


    }

}   