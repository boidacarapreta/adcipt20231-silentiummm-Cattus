export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa1", "./assets/mapa1/mapa1.json");

    // Tilesets

      // Mapa 1
        this.load.image("caverna1", "./assets/mapa1/caverna1.png");
        this.load.image("fundo1", "./assets/mapa1/fundo1.png");
        this.load.image("plataforma1", "./assets/mapa1/plataforma1.png");

    // Corpo do Gato 1
    this.load.spritesheet("gato-1", "./assets/gato1/gato1-inteiro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Corpo do Gato 2
    this.load.spritesheet("gato-2", "./assets/gato2-inteiro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Botões

    this.load.spritesheet("cima", "./assets/botao/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("baixo", "./assets/botao/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("esquerda", "./assets/botao/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("direita", "./assets/botao/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    // Mapa1

    // Tilemap
    this.mapa1 = this.make.tilemap({
      key: "mapa1",
    });

    this.tileset_caverna1 = this.mapa1.addTilesetImage("caverna1", "caverna1");

    this.tileset_fundo1 = this.mapa1.addTilesetImage("fundo1", "fundo1");

    this.tileset_plataforma1 = this.mapa1.addTilesetImage(
      "plataforma1",
      "plataforma1"
    );

    // Layer 0: fundo
    this.fundo = this.mapa1.createLayer("fundo", this.tileset_fundo1, 0, 0);
    // Layer 1: fundo_chão
    this.fundo_chao = this.mapa1.createLayer(
      "fundo_chao",
      this.tileset_caverna1,
      this.tileset_plataforma1,
      0,
      0
    );

    // Layer 2: chão
    this.chao = this.mapa1.createLayer(
      "chão",
      this.tileset_caverna1,
      this.tileset_plataforma1,
      0,
      0
    );

    // Layer 3: fundo_parede
    this.fundo_parede = this.mapa1.createLayer(
      "chão",
      this.tileset_caverna1,
      0,
      0
    );

    // Layer 4: parede
    this.parede = this.mapa1.createLayer("parede", this.tileset_caverna1, 0, 0);

    // Layer 5: parede2
    this.parede2 = this.mapa1.createLayer(
      "parede2",
      this.tileset_caverna1,
      0,
      0
    );

    // Layer 6: objetos
    this.objetos = this.mapa1.createLayer(
      "objetos",
      this.tileset_caverna1, this.tileset_plataforma1,
      0,
      0
    );

    // Layer 7: parede3
    this.parede3 = this.mapa1.createLayer(
      "parede3",
      this.tileset_caverna1,
      0,
      0
    );

    // Personagem 1
    // Movimentos e Física
    this.jogador_1 = this.physics.add.sprite(200, 225, "gato-1");

    // Frames Movimentação
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
          end: 7,
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
      // Frames Parado
      this.anims.create({
        key: "gato1-parado-baixo",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 16,
          end: 19,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-parado-esquerda",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 20,
          end: 23,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-parado-direita",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 24,
          end: 27,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-parado-cima",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 28,
          end: 31,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      // Animação
      this.jogador_1.anims.play("gato1-baixo", true);

    // Personagem 2
    // Movimentos e Física
    this.jogador_2 = this.add.sprite(600, 225, "gato-2");

    // Botão //

    this.cima = this.add
      .sprite(700, 300, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-50);
        this.jogador_1.anims.play("gato1-cima");
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("gato1-parado-cima");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(760, 350, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(50);
        this.jogador_1.anims.play("gato1-direita");
      })
      .on("pointerup", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("gato1-parado-direita");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(640, 350, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-50);
        this.jogador_1.anims.play("gato1-esquerda");
      })
      .on("pointerup", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("gato1-parado-esquerda");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(700, 400, "baixo", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(50);
        this.jogador_1.anims.play("gato1-baixo");
      })
      .on("pointerup", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("gato1-parado-baixo");
      })
      .setScrollFactor(0);

    /* Colisões por tile */
    this.fundo.setCollisionByProperty({ collides: true });
    this.fundo_chao.setCollisionByProperty({ collides: true });
    this.chao.setCollisionByProperty({ collides: true });
    this.fundo_parede.setCollisionByProperty({ collides: true });
    this.parede.setCollisionByProperty({ collides: true });
    this.parede2.setCollisionByProperty({ collides: true });
    this.objetos.setCollisionByProperty({ collides: true });
    this.parede3.setCollisionByProperty({ collides: true });
    
    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.jogador_1,
      this.fundo,
      this.collision,
      null,
      this
     );

   /this.physics.add.collider(
      this.jogador_1,
      this.fundo_chao,
      this.collision,
      null,
      this
    );

    this.physics.add.collider(
      this.jogador_1,
      this.chao,
      this.collision,
      null,
      this
    );

    this.physics.add.collider(
      this.jogador_1,
      this.fundo_parede,
      this.collision,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador_1,
      this.parede,
      this.collision,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador_1,
      this.parede2,
      this.collision,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador_1,
      this.parede3,
      this.collision,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador_1,
      this.objetos,
      this.collision,
      null,
      this
    );

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);

    /* Cena (960) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 960, 960);
    this.physics.world.setBounds(0, 0, 960, 960);
    this.cameras.main.startFollow(this.jogador_1);
  }

  update() {}

  }