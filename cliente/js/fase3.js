export default class fase3 extends Phaser.Scene {
  constructor() {
    super("fase3");
    this.chaves = 0;
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa4", "./assets/mapa4/mapa4.json");

    // Tilesets

    // Mapa 1
    this.load.image("fundo-camada5", "./assets/mapa4/fundo-camada5.png");

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

    this.load.spritesheet("arvore", "./assets/objetos/arvore.png", {
      frameWidth: 105,
      frameHeight: 224,
    });

    this.load.spritesheet("barreira2", "./assets/objetos/arvore.png", {
      frameWidth: 105,
      frameHeight: 224,
    });

    this.load.image("texto", "./assets/objetos/fala.png");

    this.load.spritesheet("invisivel", "./assets/objetos/vazio.png", {
      frameWidth: 32,
      frameHeight: 800,
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

    /* Trilha sonora */
    this.trilha = this.sound.add("trilha");
    this.trilha.loop = true;
    this.trilha.play();
    this.metal_som = this.sound.add("metal-som");
    // Mapa2

    // Tilemap
    this.mapa4 = this.make.tilemap({
      key: "mapa4",
    });

    this.tileset_camada5 = this.mapa4.addTilesetImage(
      "fundo-camada5",
      "fundo-camada5"
    );

    // Layer 0: fundo 2
    this.fundo2 = this.mapa4.createLayer(
      "fundo2",
      [this.tileset_camada5],
      0,
      0
    );

    // Layer 1: chão 2
    this.plataforma2 = this.mapa4.createLayer(
      "plataforma2",
      [this.tileset_camada5],
      0,
      0
    );

    // Porta e Chave

    this.porta = this.physics.add.sprite(2350, 500, "porta");
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

      (this.porta_entrada = this.physics.add.sprite(100, 500, "porta_entrada"));
    this.porta_entrada.body.setAllowGravity(false);

    this.porta_entrada = this.physics.add.sprite(100, 220, "porta_entrada");
    this.porta_entrada.body.setAllowGravity(false);

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "gato-1";
      this.jogador_1 = this.physics.add.sprite(100, 500, this.local);
      this.remoto = "gato-2";
      this.jogador_2 = this.add.sprite(100, 220, this.remoto);
    } else {
      this.remoto = "gato-1";
      this.jogador_2 = this.add.sprite(100, 500, this.remoto);
      this.local = "gato-2";
      this.jogador_1 = this.physics.add.sprite(100, 220, this.local);
    }

    this.chave = this.physics.add.sprite(2200, 570, "chave");
    this.chave.body.setAllowGravity(false);

    // Mensagem

    this.mensagem = this.physics.add.sprite(2350, 440, "texto");
    this.mensagem.body.setAllowGravity(false);
    this.mensagem.disableBody(false, true);

    this.barreiras1 = [
      {
        x: 300,
        y: 180,
        imagem: "arvore",
      },
      {
        x: 640,
        y: 470,
        imagem: "arvore",
      },
      {
        x: 940,
        y: 180,
        imagem: "arvore",
      },
      {
        x: 1140,
        y: 470,
        imagem: "arvore",
      },
      {
        x: 1260,
        y: 180,
        imagem: "arvore",
      },
      {
        x: 1700,
        y: 180,
        imagem: "arvore",
      },
    ];
    this.barreiras1.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, item.imagem);
      item.objeto.body.setAllowGravity(false);
      item.objeto.body.setImmovable(true);
      this.physics.add.collider(this.jogador_1, item.objeto, null, null, this);
    });

    // interruptor1
    this.interruptor1 = this.physics.add.sprite(250, 560, "interruptor");
    this.interruptor1.setFrame(0);
    this.interruptor1.body.setAllowGravity(false);
    this.interruptor1.body.setImmovable(true);

    // interruptor2
    this.interruptor2 = this.physics.add.sprite(480, 280, "interruptor");
    this.interruptor2.setFrame(0);
    this.interruptor2.body.setAllowGravity(false);
    this.interruptor2.body.setImmovable(true);

    // interruptor3
    this.interruptor3 = this.physics.add.sprite(685, 560, "interruptor");
    this.interruptor3.setFrame(0);
    this.interruptor3.body.setAllowGravity(false);
    this.interruptor3.body.setImmovable(true);

    // interruptor4
    this.interruptor4 = this.physics.add.sprite(1200, 280, "interruptor");
    this.interruptor4.setFrame(0);
    this.interruptor4.body.setAllowGravity(false);
    this.interruptor4.body.setImmovable(true);

    // interruptor5
    this.interruptor5 = this.physics.add.sprite(1400, 560, "interruptor");
    this.interruptor5.setFrame(0);
    this.interruptor5.body.setAllowGravity(false);
    this.interruptor5.body.setImmovable(true);

    // interruptor6
    this.interruptor6 = this.physics.add.sprite(1650, 280, "interruptor");
    this.interruptor6.setFrame(0);
    this.interruptor6.body.setAllowGravity(false);
    this.interruptor6.body.setImmovable(true);

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

    /* Colisão entre jogador 1 e interruptor 1 */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor1,
      this.pressionarbotao1,
      null,
      this
    );

    /* Colisão entre jogador 1 e interruptor 2 */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor2,
      this.pressionarbotao2,
      null,
      this
    );

    /* Colisão entre jogador 1 e interruptor 3 */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor3,
      this.pressionarbotao3,
      null,
      this
    );

    /* Colisão entre jogador 1 e interruptor 4 */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor4,
      this.pressionarbotao4,
      null,
      this
    );

    /* Colisão entre jogador 1 e interruptor 5 */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor5,
      this.pressionarbotao5,
      null,
      this
    );

    /* Colisão entre jogador 1 e interruptor 6 */
    this.physics.add.overlap(
      this.jogador_1,
      this.interruptor6,
      this.pressionarbotao6,
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

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      if (artefatos.chave) {
        this.chaves = artefatos.chave;
      }
      if (artefatos.barreiras1) {
        for (let i = 0; i < artefatos.barreiras1.length; i++) {
          if (artefatos.barreiras1[i]) {
            this.barreiras1[i].objeto.enableBody(
              false,
              this.barreiras1[i].x,
              this.barreiras1[i].y,
              true,
              true
            );
          } else {
            this.barreiras1[i].objeto.disableBody(true, true);
          }
        }
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

  pressionarbotao1() {
    this.interruptor1.setFrame(1);
    this.barreiras1[0].objeto.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      barreiras1: this.barreiras1.map((item) => item.objeto.visible),
    });

    if (!this.contando) {
      this.tempo = 3;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva1,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva1() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreiras1[0].objeto.enableBody(
        true,
        this.barreiras1[0].x,
        this.barreiras1[0].y,
        true,
        true
      );
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        barreiras1: this.barreiras1.map((item) => item.objeto.visible),
      });
      this.contador.destroy();
      this.contando = false;
    }
  }

  pressionarbotao2() {
    this.interruptor2.setFrame(1);
    this.barreiras1[1].objeto.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      barreiras1: this.barreiras1.map((item) => item.objeto.visible),
    });
    if (!this.contando) {
      this.tempo = 5;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva2,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva2() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreiras1[1].objeto.enableBody(
        true,
        this.barreiras1[1].x,
        this.barreiras1[1].y,
        true,
        true
      );
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        barreiras1: this.barreiras1.map((item) => item.objeto.visible),
      });
      this.contador.destroy();
      this.contando = false;
    }
  }

  pressionarbotao3() {
    this.interruptor3.setFrame(1);
    this.barreiras1[2].objeto.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      barreiras1: this.barreiras1.map((item) => item.objeto.visible),
    });
    if (!this.contando) {
      this.tempo = 3;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva3,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva3() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreiras1[2].objeto.enableBody(
        true,
        this.barreiras1[2].x,
        this.barreiras1[2].y,
        true,
        true
      );
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        barreiras1: this.barreiras1.map((item) => item.objeto.visible),
      });
      this.contador.destroy();
      this.contando = false;
    }
  }

  pressionarbotao4() {
    this.interruptor4.setFrame(1);
    this.barreiras1[3].objeto.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      barreiras1: this.barreiras1.map((item) => item.objeto.visible),
    });
    if (!this.contando) {
      this.tempo = 10;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva4,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva4() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreiras1[3].objeto.enableBody(
        true,
        this.barreiras1[3].x,
        this.barreiras1[3].y,
        true,
        true
      );
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        barreiras1: this.barreiras1.map((item) => item.objeto.visible),
      });
      this.contador.destroy();
      this.contando = false;
    }
  }

  pressionarbotao5() {
    this.interruptor5.setFrame(1);
    this.barreiras1[4].objeto.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      barreiras1: this.barreiras1.map((item) => item.objeto.visible),
    });
    if (!this.contando) {
      this.tempo = 10;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva5,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva5() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreiras1[4].objeto.enableBody(
        true,
        this.barreiras1[4].x,
        this.barreiras1[4].y,
        true,
        true
      );
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        barreiras1: this.barreiras1.map((item) => item.objeto.visible),
      });
      this.contador.destroy();
      this.contando = false;
    }
  }

  pressionarbotao6() {
    this.interruptor6.setFrame(1);
    this.barreiras1[5].objeto.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      barreiras1: this.barreiras1.map((item) => item.objeto.visible),
    });
    if (!this.contando) {
      this.tempo = 10;
      this.contador = this.time.addEvent({
        delay: 1000,
        callback: this.contagem_regressiva6,
        callbackScope: this,
        loop: true,
      });
      this.contando = true;
    }
  }

  contagem_regressiva6() {
    this.tempo -= 1;
    console.log(this.tempo);
    if (this.tempo === 0) {
      this.barreiras1[5].objeto.enableBody(
        true,
        this.barreiras1[5].x,
        this.barreiras1[5].y,
        true,
        true
      );
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        barreiras1: this.barreiras1.map((item) => item.objeto.visible),
      });
      this.contador.destroy();
      this.contando = false;
    }
  }

  abrirPorta() {
    if (this.chaves === 0) {
    } else {
      this.porta.setFrame(5);
      this.game.scene.stop("fase3");
      this.game.scene.start("fase4");
      this.game.socket.emit("cena-publicar", this.game.sala, "fase4");
    }
  }

  coletarChave() {
    this.chave.disableBody(true, true);
    this.metal_som.play();
    this.chaves += 1;
  }
}
