export default class fase2 extends Phaser.Scene {
  constructor() {
    super("fase2");
    this.chaves = 0;
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa2", "./assets/mapa2/mapa2.json");

    // Tilesets

    // Mapa 1
    this.load.image("fundo-camada1", "./assets/mapa2/fundo-camada1.png");
    this.load.image("fundo-camada1", "./assets/mapa2/fundo-camada2.png");
    this.load.image("fundo-camada3", "./assets/mapa2/fundo-camada3.png");
    this.load.image("plataforma2", "./assets/mapa2/plataforma2.png");

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

    // Objetos

    this.load.spritesheet("chave", "./assets/objetos/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("porta", "./assets/objetos/porta.png", {
      frameWidth: 128,
      frameHeight: 180,
    });

    this.load.spritesheet(
      "porta_entrada",
      "./assets/objetos/porta_entrada.png",
      {
        frameWidth: 128,
        frameHeight: 180,
      }
    );

    this.load.spritesheet("interruptor", "./assets/objetos/interruptor.png", {
      frameWidth: 41,
      frameHeight: 32,
    });

    this.load.spritesheet("barreira", "./assets/objetos/barreira.png", {
      frameWidth: 32,
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

    this.load.spritesheet("tela-cheia", "./assets/botao/tela-cheia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Sons */
    this.load.audio("trilha", "./assets/musicas/trilha.mp3");
    this.load.audio("metal-som", "./assets/musicas/metal.mp3");
  }

  create() {
    /* Trilha sonora */
    this.trilha = this.sound.add("trilha");
    this.trilha.loop = true;
    this.trilha.play();

    // Mapa2

    // Tilemap
    this.mapa2 = this.make.tilemap({
      key: "mapa2",
    });

    this.tileset_camada1 = this.mapa2.addTilesetImage(
      "fundo-camada1",
      "fundo-camada1"
    );

    this.tileset_camada2 = this.mapa2.addTilesetImage(
      "fundo-camada2",
      "fundo-camada2"
    );

    this.tileset_camada3 = this.mapa2.addTilesetImage(
      "fundo-camada3",
      "fundo-camada3"
    );

    this.tileset_plataforma2 = this.mapa2.addTilesetImage(
      "plataforma2",
      "plataforma2"
    );

    // Layer 0: fundo 2
    this.fundo2 = this.mapa2.createLayer(
      "fundo2",
      [
        this.tileset_camada1,
        this.tileset_camada2,
        this.tileset_camada3,
        this.tileset_plataforma2,
      ],
      0,
      0
    );

    // Layer 1: chão 2
    this.plataforma2 = this.mapa2.createLayer(
      "plataforma2",
      [
        this.tileset_camada1,
        this.tileset_camada2,
        this.tileset_camada3,
        this.tileset_plataforma2,
      ],
      0,
      0
    );

    // Porta de Entrada

    this.porta_entrada = this.physics.add.sprite(100, 420, "porta_entrada");
    this.porta_entrada.body.setAllowGravity(false);

    // Barreira e interruptor

    this.barreira = this.physics.add.sprite(300, 450, "barreira");
    this.barreira.body.setAllowGravity(false);
    this.barreira.body.setImmovable(true);

    // adicione o botão ao mapa aqui
    this.interruptor = this.physics.add.sprite(250, 470, "interruptor");
    this.interruptor.setFrame(0);
    this.interruptor.body.setAllowGravity(false);
    this.interruptor.body.setImmovable(true);

    // Personagem 1
    // Movimentos e Física
    this.jogador_1 = this.physics.add.sprite(100, 430, "gato-1");

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
          start: 16,
          end: 19,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      // Frames Parado
      this.anims.create({
        key: "gato1-parado-baixo",
        frames: this.anims.generateFrameNumbers("gato-1", {
          start: 20,
          end: 23,
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
          start: 17,
          end: 19,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      // Personagem 2
      // Movimentos e Física
      (this.jogador_2 = this.add.sprite(600, 225, "gato-2"));

    // Porta e Chave

    this.porta = this.physics.add.sprite(2350, 540, "porta");
    this.porta.body.setAllowGravity(false);
    this.anims.create({
      key: "porta-animada",
      frames: this.anims.generateFrameNumbers("porta", {
        start: 0,
        end: 4,
      }),
      frameRate: 4,
      repeat: -1,
    }),
      // Animação da porta
      this.porta.anims.play("porta-animada", true);
    this.porta.body.setImmovable(true);

    this.chave = this.physics.add.sprite(50, 585, "chave");
    this.chave.body.setAllowGravity(false);
    this.chave.disableBody(false, true);

    // Botão //

    this.cima = this.add
      .sprite(700, 300, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-300);
        this.jogador_1.anims.play("gato1-cima");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("gato1-parado-cima");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(760, 350, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200);
        this.jogador_1.anims.play("gato1-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("gato1-parado-direita");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(640, 350, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200);
        this.jogador_1.anims.play("gato1-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("gato1-parado-esquerda");
      })
      .setScrollFactor(0);

    this.tela_cheia = this.add
      .sprite(750, 50, "tela-cheia", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.tela_cheia.setFrame(1);
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);

    /* Colisões por tile */
    this.plataforma2.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.jogador_1,
      this.plataforma2,
      this.collision,
      null,
      this
    );

    /* Colisão entre personagem 1 e barreira */
    this.physics.add.collider(
      this.jogador_1,
      this.barreira,
      this.collision,
      null,
      this
    );

    /* Colisão entre jogador 1 e interruptor */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor,
      this.pressionarbotao,
      null,
      this
    );

    /* Colisão entre jogador 1 e porta */
    this.physics.add.collider(
      this.jogador_1,
      this.porta,
      this.abrirPorta,
      null,
      this
    );

    /* Colisão entre jogador 1 e chave */
    this.physics.add.collider(
      this.jogador_1,
      this.chave,
      this.coletarChave,
      null,
      this
    );

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);

    /* Cena maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 2696, 640);
    this.physics.world.setBounds(0, 0, 2496, 640);
    this.cameras.main.startFollow(this.jogador_1);
  }

  pressionarbotao() {
    this.interruptor.setFrame(1);
    this.barreira.disableBody(true, true);
    if (!this.contando) {
      this.tempo = 3;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreira.enableBody(
        true,
        this.barreira.x,
        this.barreira.y,
        true,
        true
      );
      this.contador.destroy();
      this.contando = false;
    }
  }

  abrirPorta() {
    if (this.chaves === 0) {
      this.chave.enableBody(true, 200, 420, true, true);
      this.jogador_1.stop;
    } else {
      this.porta.anims.stop();
      this.jogador_1.destroy();
      this.porta.setFrame(5);
      this.game.scene.start("fase3");
    }
  }

  coletarChave() {
    this.chave.disableBody(true, true);
    this.chaves += 1;
  }
}
