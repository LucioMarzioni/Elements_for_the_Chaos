// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game")
  }

  init() {
    // init variables
    // take data passed from other scenes
    this.gameOver = false;
    this.timer = 10;
    this.score = 0;
    this.activateshield = false;
    this.gems = {
      gemu: { points: 3 },
      gemd: { points: 3 },
      gemt: { points: 3 },
    };
  }

  preload() {
    // load assets
    this.load.image("backg", "./public/background.png");
    this.load.image("floor", "./public/Floorl.png");
    this.load.image("plataform", "./public/plataform.png");
    this.load.image("gemu", "./public/gem.png")
    this.load.image("gemd", "./public/gem.png");
    this.load.image("gemt", "./public/gem.png");
    this.load.spritesheet("player", "./public/playerfinish.png", { frameWidth: 35, frameHeight: 75});
    this.load.image("upe", "./public/upE.png");
    this.load.image("upv", "./public/upV.png");
    this.load.audio("arcadeweekend", ["./music/Arcadeweekend.mp3"]);
    this.load.audio("coin", ["./music/Pickup_Coin12.wav"]);
    this.load.audio("powerups", ["./music/Powerup12.wav"]);
    this.load.audio("final", ["./music/final.mp3"]);
    this.load.spritesheet("electricd", "./public/electricsf.png", { frameWidth: 300, frameHeight: 300});
    this.load.spritesheet("iced", "./public/icesf.png", { frameWidth: 258, frameHeight: 255});
    this.load.spritesheet("fired", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
    this.load.spritesheet("toxicd", "./public/toxicsf.png", { frameWidth: 253, frameHeight: 253});
    this.load.spritesheet("fired2", "./public/firesf.png", { frameWidth: 277, frameHeight: 300});
    this.load.image("warning", "./public/warning.png")
    this.load.image("shield", "./public/Escudo.png")
    this.load.image("vel", "./public/velocidad.png")
    this.load.audio("firesound", ["./music/firesound.mp3"]);
    this.load.audio("icesound", ["./music/icesound.mp3"]);
    this.load.audio("toxicsound", ["./music/acidsound.mp3"]);
    this.load.audio("electricsound", ["./music/electricsound.mp3"]);
    this.load.image("fireresto", "./public/fireresto.png")
    this.load.image("firerestoo", "./public/fireresto.png")
    this.load.image("iceresto", "./public/iceresto.png")
    this.load.image("acidresto", "./public/acidresto.png")
    this.load.image("electricresto", "./public/electricresto.png")
  }

  create() {
    this.speed = 300;
    

    this.sound.pauseOnBlur = false;

    const music = this.sound.add("arcadeweekend");
    music.loop = true;

    music.play();

    //fondo
    this.backg = this.add.image(500, 300, "backg");
    //piso
    this.floor = this.physics.add.staticGroup();
    this.floor.create(500, 575, "floor").setScale(0.5).refreshBody();

    
    //plataforma izquierda
    this.plataform = this.physics.add.staticGroup();
    this.plataform.create(150, 375, "plataform").setScale(0.3).refreshBody();
    //plataforma derecha
    this.plataform.create(850, 375, "plataform").setScale(0.3).refreshBody();
    //plataforma arriba
    this.plataform.create(500, 165, "plataform").setScale(0.3).refreshBody();

    //gema izquierda 1
    this.gemu = this.physics.add.image(
      Phaser.Math.Between(100, 100),
      Phaser.Math.Between(320, 320),
      "gemu"
    );
    this.gemu.body.setSize(20, 20);
    this.gemu.body.setAllowGravity(false);

    //gema derecha 2
    this.gemd = this.physics.add.image(
      Phaser.Math.Between(900, 900),
      Phaser.Math.Between(510, 510),
      "gemd"
    );
    this.gemd.body.setSize(20, 20);
    this.gemd.body.setAllowGravity(false);

    this.gemt = this.physics.add.image(
      Phaser.Math.Between(500, 500),
      Phaser.Math.Between(100, 100),
      "gemt"
    );
    this.gemt.body.setSize(20, 20);
    this.gemt.body.setAllowGravity(false);

    //Personaje
    this.player = this.physics.add.sprite(500, 450, "player");
    this.player.setScale(1.0);
    this.player.setCollideWorldBounds(true);
    

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 0 }),
      frameRate: 10,
      repeat: -1
  });
  
  this.anims.create({
      key: 'turn',
      frames: [ { key: 'player', frame: 5 } ],
      frameRate: 20
  });
  
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'firea',
    frames: this.anims.generateFrameNumbers('fired', { start: 0, end: 13 }),
    frameRate: 10,
    repeat: -1
});
   
 this.anims.create({
    key: 'fireaa',
    frames: this.anims.generateFrameNumbers('fired2', { start: 0, end: 13 }),
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

  this.player.anims.play('turn');

    this.icetime = setTimeout(() => {
    this.warning = this.add.image(30, 525, "warning").setScale(0.1);
    this.time.delayedCall(3000, () => {
    this.iced = this.physics.add.sprite(30, 525, "iced").setScale(0.19);
    this.iced.anims.play('icea');
    this.iced.setCollideWorldBounds(true);
    this.physics.add.collider(this.iced, this.floor);
    this.physics.add.collider(this.iced, this.plataform);
    this.warning.destroy();
    this.physics.add.overlap(
      this.player,
      this.iced,
      this.enemyTouch,
      null,
      this
    );
  });
    }, 45000)
    
    this.firetime = setTimeout(() => {
      this.warning = this.add.image(30, 330, "warning").setScale(0.1);
      this.time.delayedCall(3000, () => {
      this.fired = this.physics.add.sprite(30, 330, "fired").setScale(0.19);
      this.fired.anims.play('firea');
      this.fired.setCollideWorldBounds(true);
      this.physics.add.collider(this.fired, this.floor);
      this.physics.add.collider(this.fired, this.plataform);
      this.warning.destroy();
      this.physics.add.overlap(
        this.player,
        this.fired,
        this.enemyTouchFire,
        null,
        this
      );
     })
    }, 15000)
    
    
    this.fireetime = setTimeout(() => {
        this.warning = this.add.image(970, 330, "warning").setScale(0.1);
        this.time.delayedCall(3000, () => {
        this.fired2 = this.physics.add.sprite(970, 330, "fired2").setScale(0.19);
        this.fired2.anims.play('fireaa');
        this.fired2.setCollideWorldBounds(true);
        this.physics.add.collider(this.fired2, this.floor);
        this.physics.add.collider(this.fired2, this.plataform);
        this.warning.destroy();
        this.physics.add.overlap(
          this.player,
          this.fired2,
          this.enemyTouchFire2,
          null,
          this
        );
      });
        }, 30000) 
        
    this.toxictime = setTimeout(() => {
      this.warning = this.add.image(50, 50, "warning").setScale(0.1);
      this.time.delayedCall(3000, () => {
      this.toxicd = this.physics.add.sprite(50, 50, "toxicd").setScale(0.2);
      this.toxicd.anims.play('toxica');
      this.toxicd.setCollideWorldBounds(true);
      this.physics.add.collider(this.toxicd, this.floor);
      this.toxicd.setBounce(1);
      this.toxicd.setVelocity(300, 300);
      this.warning.destroy();
      this.physics.add.overlap(
        this.player,
        this.toxicd,
        this.enemyTouchToxic,
        null,
        this
       );
      });
    }, 85000)
  
    
    this.electrictime = setTimeout(() => {
      this.warning = this.add.image(370, 100, "warning").setScale(0.1);
      this.time.delayedCall(3000, () => {
      this.electricd = this.physics.add.sprite(385, 100, "electricd").setScale(0.25);
      this.electricd.anims.play('electrica');
      this.electricd.setCollideWorldBounds(true);
      this.physics.add.collider(this.electricd, this.floor);
      this.physics.add.collider(this.electricd, this.plataform);
      this.warning.destroy();
      this.physics.add.overlap(
      this.player,
      this.electricd,
      this.enemyTouchElectric,
      null,
      this
       );
      });
    }, 100000)
    

    //Colisión de personaje con pisos
    this.physics.add.collider(this.player, this.floor);
    this.physics.add.collider(this.player, this.plataform);

    //Accion al tocar las gemas
    this.physics.add.overlap(
      this.player,
      this.gemu,
      this.collisionHandler1,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.gemd,
      this.collisionHandler2,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.gemt,
      this.collisionHandler3,
      null,
      this
    );

    this.cursor = this.input.keyboard.createCursorKeys();
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.recolectables = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.recolectables,
      this.pj,
      null,
      this
    );

    this.time.addEvent({
      delay: 1000,
      callback: this.handlerTimer,
      callbackScope: this,
      loop: true,
    });

    //contador
    this.timerText = this.add.text(825, 10, `Time:${this.timer}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    //score
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.time.addEvent({
      delay: 15000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    setTimeout(() => {
    this.tweens.add({
      targets: this.iced,
      x: 970,
      ease: "ease-out", //linear  //ease line
      duration: 2000,
      repeat: -1,
      yoyo: true,
    });
    }, 48200)

    setTimeout(() => {
      this.tweens.add({
        targets: this.fired,
        x: 280,
        ease: "ease-out", //linear  //ease line
        duration: 3000,
        repeat: -1,
        yoyo: true,
      });
      }, 18200)

    setTimeout(() => {
      this.tweens.add({
          targets: this.fired2,
          x: 720,
          ease: "ease-out", //linear  //ease line
          duration: 3000,
          repeat: -1,
          yoyo: true,
        });
        }, 33200)

    
    setTimeout(() => { 
        this.tweens.add({
          targets: this.electricd,
          x: 610,
          duration: 500,
          repeat: -1,
          hold: 5000,
          repeatDelay: 5000,
          ease: 'expo.in',
          yoyo: true,
      }
    );
      }, 103200)
  }

update() {
  // update game objects
  //if (this.r.isDown) {
  //  this.scene.restart();
  //}
  if (this.cursor.left.isDown) {
    this.player.setVelocityX(-this.speed);
    this.player.anims.play('left', true);
  } else if (this.cursor.right.isDown) {
    this.player.setVelocityX(this.speed);
    this.player.anims.play('right', true);
  } else {
    this.player.setVelocityX(0);
    this.player.anims.play('turn', true);
  }
  if (this.cursor.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-800);
  }
  this.scoreText.setText("score:" + this.score);
}

  collisionHandler1() {
    this.gemu.x = Phaser.Math.Between(-100, -100);
    this.gemu.y = Phaser.Math.Between(-100, -100);
    setTimeout(() => {
      this.gemu.x = Phaser.Math.Between(25, 900);
      this.gemu.y = Phaser.Math.Between(200, 320);
    }, 3000);
    this.gemu.setVelocity(0, 0);
    this.score += 3;
    this.timer += 3;
    this.sound.pauseOnBlur = false;

    const music = this.sound.add("coin");

    music.play();
  }

  collisionHandler2() {
    this.gemd.x = Phaser.Math.Between(-100, -100);
    this.gemd.y = Phaser.Math.Between(-100, -100);
    setTimeout(() => {
      this.gemd.x = Phaser.Math.Between(25, 900);
      this.gemd.y = Phaser.Math.Between(420, 500);
    }, 3000);
    this.gemd.setVelocity(0, 0);
    this.score += 3;
    this.timer += 3;
    this.sound.pauseOnBlur = false;

    const music = this.sound.add("coin");

    music.play();
  }

  collisionHandler3() {
    this.gemt.x = Phaser.Math.Between(-100, -100);
    this.gemt.y = Phaser.Math.Between(-100, -100);
    setTimeout(() => {
      this.gemt.x = Phaser.Math.Between(25, 900);
      this.gemt.y = Phaser.Math.Between(50, 120);
    }, 3000);
    this.gemt.setVelocity(0, 0);
    this.score += 3;
    this.timer += 3;
    this.sound.pauseOnBlur = false;

    const music = this.sound.add("coin");

    music.play();

  }

  enemyTouch() {
    this.iced.destroy();
    const music = this.sound.add("icesound");

    music.play();
    this.icedtime = setTimeout(() => {
      this.iced = this.physics.add.sprite(30, 525, "iced").setScale(0.19);
      this.iced.anims.play('icea');
      this.iced.setCollideWorldBounds(true);
      this.physics.add.collider(this.iced, this.floor);
      this.physics.add.collider(this.iced, this.plataform);
      this.physics.add.overlap(
      this.player,
      this.iced,
      this.enemyTouch,
      null,
      this
      )
      this.tweens.add({
        targets: this.iced,
        x: 970,
        ease: "ease-out", //linear  //ease line
        duration: 2000,
        repeat: -1,
        yoyo: true,
      });
    }, 5000)
      if (!this.activateshield) {
      this.iceresto = this.add.image(940, 70, "iceresto").setScale(0.5);
      this.timer -= 10;
      this.time.delayedCall(1500, () => {
        this.iceresto.destroy();
      });
    }
  }

  enemyTouchFire() {
    this.fired.destroy();
    const music = this.sound.add("firesound");

    music.play();
    this.firedtime = setTimeout(() => {
      this.fired = this.physics.add.sprite(30, 330, "fired").setScale(0.19);
      this.fired.anims.play('firea');
      this.fired.setCollideWorldBounds(true);
      this.physics.add.collider(this.fired, this.floor);
      this.physics.add.collider(this.fired, this.plataform);
      this.physics.add.overlap(
      this.player,
      this.fired,
      this.enemyTouchFire,
      null,
      this
      )
      this.tweens.add({
        targets: this.fired,
        x: 280,
        ease: "ease-out", //linear  //ease line
        duration: 3000,
        repeat: -1,
        yoyo: true,
      });
    }, 5000)
    
      if (!this.activateshield) {
      this.fireresto = this.add.image(940, 70, "fireresto").setScale(0.5);  
      this.timer -= 10;
      this.time.delayedCall(1500, () => {
        this.fireresto.destroy();
      });
    }
  }
    
  enemyTouchFire2() {
    this.fired2.destroy();
    const music = this.sound.add("firesound");

    music.play();
    this.fireedtime = setTimeout(() => {
      this.fired2 = this.physics.add.sprite(970, 330, "fired2").setScale(0.19);
      this.fired2.anims.play('fireaa');
      this.fired2.setCollideWorldBounds(true);
      this.physics.add.collider(this.fired2, this.floor);
      this.physics.add.collider(this.fired2, this.plataform);
      
      this.physics.add.overlap(
      this.player,
      this.fired2,
      this.enemyTouchFire2,
      null,
      this
      )
      this.tweens.add({
        targets: this.fired2,
        x: 720,
        ease: "ease-out", //linear  //ease line
        duration: 3000,
        repeat: -1,
        yoyo: true,
      });
    }, 5000)
      if (!this.activateshield) {
      this.firerestoo = this.add.image(940, 70, "firerestoo").setScale(0.5);  
      this.timer -= 10;
      this.time.delayedCall(1500, () => {
        this.firerestoo.destroy();
      });
    }
  }

  enemyTouchToxic() {
    this.toxicd.destroy();
    const music = this.sound.add("toxicsound");

    music.play();
    this.toxicdtime = setTimeout(() => {
      this.toxicd = this.physics.add.sprite(50, 50, "toxicd").setScale(0.2);
      this.toxicd.anims.play('toxica');
      this.toxicd.setCollideWorldBounds(true);
      this.physics.add.collider(this.toxicd, this.floor);
      this.toxicd.setBounce(1);
      this.toxicd.setVelocity(300, 300);
      this.physics.add.overlap(
          this.player,
          this.toxicd,
          this.enemyTouchToxic,
          null,
          this
         );
      }, 3000)
      if (!this.activateshield) {
      this.acidresto = this.add.image(940, 70, "acidresto").setScale(0.5);
      this.timer -= 10;
      this.time.delayedCall(1500, () => {
        this.acidresto.destroy();
      });
    }
  }

  enemyTouchElectric() {
    this.electricd.destroy(); 
    const music = this.sound.add("electricsound");

    music.play();
    this.electricdtime = setTimeout(() => {
      this.electricd = this.physics.add.sprite(380, 100, "electricd").setScale(0.25);
      this.electricd.anims.play('electrica');
      this.electricd.setCollideWorldBounds(true);
      this.physics.add.collider(this.electricd, this.floor);
      this.physics.add.collider(this.electricd, this.plataform);
      this.physics.add.overlap(
      this.player,
      this.electricd,
      this.enemyTouchElectric,
      null,
      this
       );
       this.tweens.add({
        targets: this.electricd,
        x: 630,
        duration: 500,
        repeat: -1,
        hold: 5000,
        repeatDelay: 5000,
        ease: 'expo.in',
        yoyo: true,
       }
       );
    }, 3000)
    if (!this.activateshield) {
    this.electricresto = this.add.image(940, 70, "electricresto").setScale(0.5);
    this.timer -= 10;
    this.time.delayedCall(1500, () => {
      this.electricresto.destroy();
    });
    }
  }


  onSecond() {
    const tipos = ["upe", "upv"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectable = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    recolectable.setVelocity(0, 0);
    recolectable.setBounce(0.5);
    recolectable.setScale(0.5);
    recolectable.setGravity(0, -1000);
  }

  handlerTimer() {
    this.timer -= 1;
    this.timerText.setText(`Time:${this.timer}`);
    if (this.timer <= 0) {
      this.time.delayedCall(1000, () => {
      this.sound.get("arcadeweekend").stop();
      this.sound.get("arcadeweekend").destroy();
      this.sound.pauseOnBlur = false;
     
      const music = this.sound.add("final");

      music.play(); 
      clearTimeout(this.firetime)
      clearTimeout(this.icetime) 
      clearTimeout(this.fireetime)
      clearTimeout(this.toxictime)
      clearTimeout(this.electrictime)
      clearTimeout(this.firedtime)
      clearTimeout(this.icedtime)
      clearTimeout(this.fireedtime)
      clearTimeout(this.toxicdtime)
      clearTimeout(this.electricdtime)
     this.scene.start("Gameover", { score: this.score });  
    })
    }
  }

  pj(_player, recolectables) {

    if (recolectables.texture.key === "upe") {
      console.log("upe recolectado");
      this.shield = this.add.image(790, 25, "shield").setScale(0.5);
      this.activateshield = true;
      this.time.delayedCall(5000, () => {
        this.activateshield = false;
        this.shield.destroy();
        console.log("prueba");
       });  
    }
    if (recolectables.texture.key === "upv") {
      console.log("upv recolectado");
      this.vel = this.add.image(790, 25, "vel").setScale(0.5);
      this.speed = 500;
      this.time.delayedCall(10000, () => {
        this.speed = 300;
        this.vel.destroy();
        console.log("prueba");
      });
    }
    recolectables.destroy();
    this.sound.pauseOnBlur = false;

    const music = this.sound.add("powerups");

    music.play();
  
  }
  
}
