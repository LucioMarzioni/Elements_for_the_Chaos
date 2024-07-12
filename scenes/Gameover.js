export default class Gameover extends Phaser.Scene {
    constructor() {
      super("Gameover");
    }
    init(data){
      this.score = data.score

    }

    preload(){
    this.load.image("gaver", "./public/gameover.png");
    this.load.image("homeb", "./public/homeb.png");
    this.load.image("repeat", "./public/retryb.png")
    }
    
    create(){ 
    this.gaver = this.add.image(500, 300, "gaver"); 
    this.homeb = this.add.image(565, 450, "homeb"); 
    this.repeat = this.add.image(435, 450, "repeat")
    this.scoreText = this.add.text(
      420,
      290,
      `Score: ${this.score}`, {
        fontSize: "32px",
      fill: "#fff",
      }
    );

    this.input.on('gameobjectover', (pointer, gameObject) =>
      {

          gameObject.setScale(1.1)

      });

      this.input.on('gameobjectout', (pointer, gameObject) =>
      {

          gameObject.setScale(1);

      });

    this.homeb.setInteractive();
    this.homeb.on("pointerdown", () =>{
      this.scene.start("main")
    })

    this.repeat.setInteractive();
    this.repeat.on("pointerdown", () =>{  
    this.scene.start("Game");  
    })

    }
    update(){
      this.scoreText.setText( "score:"+this.score );
    }

}    