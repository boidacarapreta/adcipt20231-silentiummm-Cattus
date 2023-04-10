export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

    preload() {
      // Mapa
      // Tilemap
      this.load.tilemapTiledJSON(
        "mapa-inicial",
        "./assets/mapa1.json"
      );
      // Tilesets
      this.load.image("tijolos", "./assets/tijolos.png");
      //
      this.load.spritesheet("gato-1", "./assets/gato1-inteiro.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      //
      this.load.spritesheet("gato-2", "./assets/gato2-inteiro.png", {
        frameWidth: 64,
        frameHeight: 64,
      });

      this.load.spritesheet("cima", "./assets/cima.png", {
        frameWidth: 64,
        frameHeight: 64,
      });

      this.load.spritesheet("baixo", "./assets/baixo.png", {
        frameWidth: 64,
        frameHeight: 64,
      });

      this.load.spritesheet("esquerda", "./assets/esquerda.png", {
        frameWidth: 64,
        frameHeight: 64,
      });

      this.load.spritesheet("direita", "./assets/direita.png", {
        frameWidth: 64,
        frameHeight: 64,
      });

    }

  create() {
    // Mapa
    // Tilemap
    this.mapa_inicial = this.make.tilemap({
      key: "mapa-inicial",
    });

    this.tileset_principal_terreo_parede = this.mapa_inicial.addTilesetImage(
      "tijolos",
      "tijolos"
    );

    // Layer 0: chão
    this.chao = this.mapa_inicial.createLayer(
      "chao",
      this.tileset_principal_terreo_chao,
      0,
      0
    );
    // Layer 1: parede
    this.parede = this.mapa_inicial.createLayer(
      "tijolos",
      this.tileset_principal_terreo_parede,
      0,
      0
    );

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
      this.anims.create({
        key: "gato1-esquerda",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 4,
          end: 8,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-direita",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 8,
          end: 11,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-cima",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 12,
          end: 15,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      //
      this.jogador_1.anims.play("gato1-baixo", true);
    //
    this.jogador_2 = this.add.sprite(600, 225, "gato-2");

    // Botão //

    this.cima = this.add
      .sprite(700, 400, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-50)
        this.jogador_1.anims.play("gato1-cima")
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("gato1-cima");
      })
    
    this.direita = this.add
      .sprite(750, 300, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityX(50);
        this.jogador_1.anims.play("gato1-direita");
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("gato1-direita");
      });
    
  
  }

  update() {}
}