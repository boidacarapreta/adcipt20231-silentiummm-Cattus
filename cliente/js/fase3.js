export default class fase3 extends Phaser.Scene {
  constructor() {
    super("fase3");
    this.chaves = 0;
  }

  // Esse é o mapa de encerramento

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa3", "./assets/mapa3/mapa3.json");

    // Tilesets

    // Mapa 1
    this.load.image("fundo-camada6", "./assets/mapa3/fundo-camada6.png");

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

    this.load.image("texto", "./assets/objetos/fala.png");

    this.load.spritesheet("invisivel1", "./assets/objetos/vazio.png", {
      frameWidth: 32,
      frameHeight: 800,
    });

    // Monstro

    this.load.spritesheet("monstro", "./assets/monstros/monstro1.png", {
      frameWidth: 128,
      frameHeight: 128,
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
    this.game.fase = 3;
    this.chaves = 0;

    /* Trilha sonora */
    this.trilha = this.sound.add("trilha");
    this.trilha.loop = true;
    this.trilha.play();
    this.metal_som = this.sound.add("metal-som");

    // Mapa de Encerramento
    this.mapa3 = this.make.tilemap({
      key: "mapa3",
    });

    this.tileset_camada6 = this.mapa3.addTilesetImage(
      "fundo-camada6",
      "fundo-camada6"
    );

    // Layer 0: fundo 2
    this.fundo2 = this.mapa3.createLayer(
      "fundo2",
      [this.tileset_camada6],
      0,
      0
    );

    // Layer 1: chão 2
    this.plataforma2 = this.mapa3.createLayer(
      "plataforma2",
      [this.tileset_camada6],
      0,
      0
    );
    // Porta e Chave

    this.porta = this.physics.add.sprite(2350, 510, "porta");
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
      // Porta de Entrada
      (this.porta_entrada = this.physics.add.sprite(150, 520, "porta_entrada"));
    this.porta_entrada.body.setAllowGravity(false);

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "gato-1";
      this.jogador_1 = this.physics.add.sprite(150, 580, this.local);
      this.remoto = "gato-2";
      this.jogador_2 = this.add.sprite(150, 580, this.remoto);
    } else {
      this.remoto = "gato-1";
      this.jogador_2 = this.add.sprite(150, 580, this.remoto);
      this.local = "gato-2";
      this.jogador_1 = this.physics.add.sprite(150, 580, this.local);
    }

    // Botao Invisivel para setar falas
    this.invisivel = this.physics.add.sprite(700, 550, "invisivel1");
    this.invisivel.body.setAllowGravity(false);
    this.invisivel.body.setImmovable(true);

    // Botão invisivel para desativar falas
    this.invisivel2 = this.physics.add.sprite(800, 550, "invisivel1");
    this.invisivel2.body.setAllowGravity(false);
    this.invisivel2.body.setImmovable(true);

    // Botão invisivel para desativar falas
    this.invisivel3 = this.physics.add.sprite(600, 550, "invisivel1");
    this.invisivel3.body.setAllowGravity(false);
    this.invisivel3.body.setImmovable(true);

    // monstro

    this.monstro = this.physics.add.sprite(700, 540, "monstro");
    this.monstro.body.setAllowGravity(false);
    this.anims.create({
      key: "monstro",
      frames: this.anims.generateFrameNumbers("monstro", {
        start: 0,
        end: 4,
      }),
      frameRate: 4,
      repeat: -1,
    }),
      this.monstro.anims.play("monstro", true);
    this.monstro.body.setImmovable(true);

    // Mensagem

    this.mensagem = this.physics.add.sprite(2350, 440, "texto");
    this.mensagem.body.setAllowGravity(false);
    this.mensagem.disableBody(false, true);

    this.chave = this.physics.add.sprite(50, 585, "chave");
    this.chave.body.setAllowGravity(false);
    this.chave.disableBody(false, true);

    // Personagem 1
    this.anims.create({
      key: "gato1-baixo",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 3,
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "gato1-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 4,
        end: 7,
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "gato1-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 8,
        end: 11,
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "gato1-cima",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 16,
        end: 19,
      }),
      frameRate: 11,
      repeat: -1,
    });

    // Frames Parado
    this.anims.create({
      key: "gato1-parado-baixo",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 20,
        end: 23,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "gato1-parado-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 20,
        end: 23,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "gato1-parado-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 24,
        end: 27,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "gato1-parado-cima",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 17,
        end: 19,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Animação
    this.jogador_1.anims.play("gato1-baixo", true);

    // Botão //

    this.cima = this.add
      .sprite(700, 300, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-400);
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

    /* Colisão entre jogador 1 e porta */
    this.physics.add.overlap(
      this.jogador_1,
      this.porta,
      this.abrirPorta,
      null,
      this
    );

    // Colisão para ativar as falas
    this.physics.add.overlap(
      this.jogador_1,
      this.invisivel,
      this.mensagem1,
      null,
      this
    );

    // Colisão para desativar as falas
    this.physics.add.overlap(
      this.jogador_1,
      this.invisivel2,
      this.mensagem1_0,
      null,
      this
    );

    // Colisão para desativar as falas
    this.physics.add.overlap(
      this.jogador_1,
      this.invisivel3,
      this.mensagem1_0,
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

    this.game.socket.on("estado-notificar", ({ cena, frame, x, y }) => {
      if (cena === this.game.fase) {
        this.jogador_2.setFrame(frame);
        this.jogador_2.x = x;
        this.jogador_2.y = y;
      }
    });

    this.game.socket.on("cena-notificar", (cena) => {
      this.game.scene.stop("fase3");
      this.game.scene.start(cena);
    });
  }

  update() {
    let frame;
    try {
      frame = this.jogador_1.anims.getFrameName();
      this.game.socket.emit("estado-publicar", this.game.sala, {
        cena: this.game.fase,
        frame: frame,
        x: this.jogador_1.body.x + 32,
        y: this.jogador_1.body.y + 32,
      });
    } catch (e) {
      console.log(e);
    }
  }

  mensagem1() {
    if (this.mensagem.body) {
      this.mensagem.enableBody(true, 700, 450, true, true);
      this.chave.enableBody(true, 1505, 580, true, true);
    }
  }
  mensagem1_0() {
    if (this.mensagem.body) {
      this.mensagem.disableBody(true, true);
    }
  }

  abrirPorta() {
    if (this.chaves === 0) {
    } else {
      this.porta.setFrame(5);
      this.game.scene.stop("fase3");
      this.game.scene.start("final");
      this.game.socket.emit("cena-publicar", this.game.sala, "final");
    }
  }

  coletarChave() {
    this.chave.disableBody(true, true);
    this.metal_som.play();
    this.mensagem.destroy();
    this.invisivel.destroy();
    this.chaves += 1;
  }
}
