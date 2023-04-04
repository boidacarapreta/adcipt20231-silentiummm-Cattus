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
    }

  create() {
    // Mapa
    // Tilemap
    this.mapa_inicial = this.make.tilemap({
      key: "mapa-inicial",
    });
    // Tilesets
    this.tileset_principal_terreo_chao = this.mapa_inicial.addTilesetImage(
      "chao",
      "chao"
    );
    this.tileset_principal_terreo_parede = this.mapa_inicial.addTilesetImage(
      "tijolos",
      "tijolos"
    );

    // Layer 0: chão
    this.chao = this.mapa_principal_terreo.createLayer(
      "chao",
      this.tileset_principal_terreo_chao,
      0,
      0
    );
    // Layer 1: parede
    this.parede = this.mapa_principal_terreo.createLayer(
      "parede",
      this.tileset_principal_terreo_parede,
      0,
      0
    );

    // Layer 0: chão
    this.chao = this.mapa_principal_terreo.createLayer(
      "chao",
      this.tileset_principal_terreo_chao,
      0,
      0
    );
    // Layer 1: parede
    this.parede = this.mapa_principal_terreo.createLayer(
      "parede",
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