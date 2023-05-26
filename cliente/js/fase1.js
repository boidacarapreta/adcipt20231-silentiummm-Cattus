export default class fase1 extends Phaser.Scene {
  constructor() {
    super("fase1");
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

    // Objetos

    this.load.spritesheet("chave", "./assets/objetos/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("porta", "./assets/objetos/porta.png", {
      frameWidth: 128,
      frameHeight: 180,
    });

    // 400 x 120
    this.load.image("texto", "./assets/objetos/fala.png");
    this.load.image("texto2", "./assets/objetos/fala2.png");

    this.load.spritesheet("invisivel", "./assets/objetos/vazio2.png", {
      frameWidth: 32,
      frameHeight: 800,
    });

    this.load.spritesheet("invisivel1", "./assets/objetos/vazio.png", {
      frameWidth: 32,
      frameHeight: 32,
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
    this.game.fase = 1;
    this.chaves = 0;

    /* Trilha sonora */
    this.trilha = this.sound.add("trilha");
    this.trilha.play();

    /* Efeitos sonoros */
    this.metal_som = this.sound.add("metal-som");

    // Mapa1

    // Tilemap
    this.mapa1 = this.make.tilemap({
      key: "mapa1",
    });

    this.tileset_caverna1 = this.mapa1.addTilesetImage(
      "cave_tileset",
      "caverna1"
    );

    this.tileset_fundo1 = this.mapa1.addTilesetImage(
      "bg-layer-2-full-alpha",
      "fundo1"
    );

    this.tileset_plataforma1 = this.mapa1.addTilesetImage(
      "platformertiles",
      "plataforma1"
    );

    // Layer 0: fundo
    this.fundo = this.mapa1.createLayer(
      "fundo",
      [this.tileset_caverna1, this.tileset_fundo1, this.tileset_plataforma1],
      0,
      0
    );

    // Layer 1: plataformas
    this.plataformas = this.mapa1.createLayer(
      "plataformas",
      [this.tileset_caverna1, this.tileset_fundo1, this.tileset_plataforma1],
      0,
      0
    );

    this.porta = this.physics.add.sprite(2300, 540, "porta");
    this.porta.body.setAllowGravity(false);
    this.anims.create({
      key: "porta-animada",
      frames: this.anims.generateFrameNumbers("porta", {
        start: 0,
        end: 4,
      }),
      frameRate: 4,
      repeat: -1,
    });

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "gato-1";
      this.jogador_1 = this.physics.add.sprite(200, 570, this.local);
      this.remoto = "gato-2";
      this.jogador_2 = this.add.sprite(200, 570, this.remoto);
    } else {
      this.remoto = "gato-1";
      this.jogador_2 = this.add.sprite(200, 570, this.remoto);
      this.local = "gato-2";
      this.jogador_1 = this.physics.add.sprite(200, 570, this.local);

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          console.log(stream);

          /* Consulta ao(s) servidor(es) ICE */
          this.game.localConnection = new RTCPeerConnection(
            this.game.ice_servers
          );

          /* Associação de mídia com conexão remota */
          stream
            .getTracks()
            .forEach((track) =>
              this.game.localConnection.addTrack(track, stream)
            );

          /* Oferta de candidatos ICE */
          this.game.localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              this.game.socket.emit("candidate", this.game.sala, candidate);
          };

          /* Associação com o objeto HTML de áudio */
          this.game.localConnection.ontrack = ({ streams: [stream] }) => {
            this.game.audio.srcObject = stream;
          };

          /* Oferta de mídia */
          this.game.localConnection
            .createOffer()
            .then((offer) =>
              this.game.localConnection.setLocalDescription(offer)
            )
            .then(() => {
              this.game.socket.emit(
                "offer",
                this.game.sala,
                this.game.localConnection.localDescription
              );
            });

          this.game.midias = stream;
        })
        .catch((error) => console.log(error));
    }

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.ice_servers);

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      let midias = this.game.midias;
      this.game.remoteConnection.ontrack = ({ streams: [midias] }) => {
        this.game.audio.srcObject = this.game.midias;
      };

      /* Contraoferta de mídia */
      this.game.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) =>
          this.game.remoteConnection.setLocalDescription(answer)
        )
        .then(() => {
          this.game.socket.emit(
            "answer",
            this.game.sala,
            this.game.remoteConnection.localDescription
          );
        });
    });

    /* Recebimento de contraoferta de mídia */
    this.game.socket.on("answer", (description) => {
      this.game.localConnection.setRemoteDescription(description);
    });

    /* Recebimento de candidato ICE */
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.game.localConnection || this.game.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Texto
    this.mensagem = this.physics.add.sprite(700, 350, "texto");
    this.mensagem.body.setAllowGravity(false);
    this.mensagem.disableBody(false, true);

    this.mensagem01 = this.physics.add.sprite(2300, 340, "texto2");
    this.mensagem01.body.setAllowGravity(false);
    this.mensagem01.disableBody(true, true);

    // monstro

    this.monstro = this.physics.add.sprite(700, 550, "monstro");
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

    // Animação
    this.porta.anims.play("porta-animada", true);
    this.porta.body.setImmovable(true);

    this.chave = [
      {
        x: 50,
        y: 570,
        objeto: undefined,
      },
    ];
    this.chave.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave");
      item.objeto.body.setAllowGravity(false);
      this.physics.add.collider(
        this.jogador_1,
        item.objeto,
        this.coletarChave,
        null,
        this
      );
    });

    // Personagem 1

    // Frames Movimentação
    this.anims.create({
      key: "gato1-baixo",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 3,
      }),
      frameRate: 11,
      repeat: -1,
    }),
      this.anims.create({
        key: "gato1-esquerda",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 4,
          end: 7,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-direita",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 8,
          end: 11,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-cima",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 16,
          end: 19,
        }),
        frameRate: 11,
        repeat: -1,
      }),
      // Frames Parado
      this.anims.create({
        key: "gato1-parado-baixo",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 20,
          end: 23,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-parado-esquerda",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 20,
          end: 23,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-parado-direita",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 24,
          end: 27,
        }),
        frameRate: 4,
        repeat: -1,
      }),
      this.anims.create({
        key: "gato1-parado-cima",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 17,
          end: 19,
        }),
        frameRate: 4,
        repeat: -1,
      }),
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
    this.plataformas.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.jogador_1,
      this.plataformas,
      null,
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
    });

    this.game.socket.on("cena-notificar", (cena) => {
      this.game.scene.stop("fase1");
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
    }
  }
  mensagem1_0() {
    if (this.mensagem.body) {
      this.mensagem.disableBody(true, true);
    }
  }

  abrirPorta(jogador) {
    if (this.chaves === 0) {
      this.mensagem01.enableBody(true, 2300, 340, true, true);
      this.invisivel.disableBody(true, true);
      this.invisivel2.disableBody(true, true);
      this.invisivel3.disableBody(true, true);
      this.monstro.disableBody(true, true);
      this.mensagem.disableBody(true, true);
    } else {
      this.porta.setFrame(5);
      this.game.scene.stop("fase1");
      this.game.scene.start("fase2");
      this.game.socket.emit("cena-publicar", this.game.sala, "fase2");
    }
  }

  coletarChave(jogador, chave) {
    chave.disableBody(true, true);
    this.metal_som.play();
    this.chaves += 1;
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      chave: this.chaves,
    });
  }
}
