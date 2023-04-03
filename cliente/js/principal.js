export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

    preload() {
    this.load.spritesheet("gato-1", "./assets/gato1-inteiro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //
    this.load.spritesheet("gato-2", "./assets/gato2-inteiro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.jogador_1 = this.physics.add.sprite(200, 225, "gato-1");
    //
    this.anims.create({
      key: "gato1-baixo",
      frames: this.anims.generateFrameNumbers("gato-1", {
        start: 0,
        end: 3,
      }),
      frameRate: 11,
      repeat: -1,
    }),
    //
      this.jogador_1.anims.play("gato1-baixo", true);
    //
    this.jogador_2 = this.physics.add.sprite(600, 225, "gato-2");
    //
    this.anims.create({
      key: "gato2-baixo",
      frames: this.anims.generateFrameNumbers("gato-2", {
        start: 0,
        end: 3,
      }),
      frameRate: 11,
      repeat: -1,
    });
    //
    this.jogador_2.anims.play("gato2-baixo", true);
  }

  update() {}
}