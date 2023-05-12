export default class fase3 extends Phaser.Scene {
  constructor() {
    super("fase3");
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa3", "./assets/mapa3/mapa3.json");

    // Tilesets

    // Mapa 1
    this.load.image("chao3", "./assets/mapa3/chao3.png");
    this.load.image("fundo3", "./assets/mapa3/fundo3.png");
    this.load.image("lua", "./assets/mapa3/lua.png");

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
    this.load.image("texto", "./assets/objetos/fala.png",
    );
    this.load.image("texto2", "./assets/objetos/fala2.png",
    );

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

        /* Trilha sonora */
        this.trilha = this.sound.add("trilha");
        this.trilha.play();
    
        /* Efeitos sonoros */
        this.metal_som = this.sound.add("metal-som");
    
        // Mapa3
    
        // Tilemap
        this.mapa3 = this.make.tilemap({
          key: "mapa3",
        });
    
        this.tileset_fundo3 = this.mapa3.addTilesetImage(
          "fundo3",
          "fundo3"
        );
    
        this.tileset_chao3 = this.mapa3.addTilesetImage(
          "chao3",
          "chao3"
        );
    
        this.tileset_lua = this.mapa3.addTilesetImage(
          "lua",
          "lua"
        );
    
        // Layer 0: fundo3
        this.fundo3 = this.mapa3.createLayer(
          "fundo3",
          [this.tileset_fundo3, this.tileset_chao3, this.tileset_lua],
          0,
          0
        );
    
        // Layer 1: chao3
        this.chao3 = this.mapa3.createLayer(
          "chao3",
          [this.tileset_fundo3, this.tileset_chao3, this.tileset_lua],
          0,
          0
        );

        // Layer 2: elementos
        this.elementos = this.mapa3.createLayer(
          "elementos",
          [this.tileset_fundo3, this.tileset_chao3, this.tileset_lua],
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
        })
    
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.local = "gato-1";
          this.jogador_1 = this.physics.add.sprite(50, 585, this.local);
          this.remoto = "gato-2";
          this.jogador_2 = this.add.sprite(50, 585, this.remoto);
        } else {
          this.remoto = "gato-1";
          this.jogador_2 = this.add.sprite(50, 585, this.remoto);
          this.local = "gato-2";
          this.jogador_1 = this.physics.add.sprite(50, 585, this.local);
        }
    
        // Animação
        this.porta.anims.play("porta-animada", true);
        this.porta.body.setImmovable(true);
    
        this.chave = this.physics.add.sprite(50, 585, "chave");
        this.chave.body.setAllowGravity(false);
        this.chave.disableBody(false, true);
    
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
        this.elementos.setCollisionByProperty({ collides: true });
    
        /* Colisão entre personagem 1 e mapa (por layer) */
        this.physics.add.collider(
          this.jogador_1,
          this.elementos,
          this.collision,
          null,
          this
        );
    
        /* Colisão com os limites da cena */
        this.jogador_1.setCollideWorldBounds(true);
    
        /* Cena maior que a tela (800x450) */
        this.cameras.main.setBounds(0, 0, 2696, 640);
        this.physics.world.setBounds(0, 0, 2496, 640);
        this.cameras.main.startFollow(this.jogador_1);
      
    
        this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
          this.jogador_2.setFrame(frame);
          this.jogador_2.x = x;
          this.jogador_2.y = y;
        });
    
        this.game.socket.on("arfetatos-notificar", (artefatos) => {
          if (artefatos.chaves) {
            this.chaves += artefatos.chaves
          }
        });
      }
    
      update() {
        let frame;
        try {
          frame = this.jogador_1.anims.getFrameName();
        } catch (e) {
          frame = 0;
        }
        this.game.socket.emit("estado-publicar", this.game.sala, {
          frame: frame,
          x: this.jogador_1.body.x + 32,
          y: this.jogador_1.body.y + 32,
        });
    
      }
    
      mensagem1(){
        this.mensagem.enableBody(true, 700, 450, true, true);
      }
      mensagem1_0(){
        this.mensagem.disableBody(true, true);
      }
    
      mensagem2_0(){
        this.mensagem2.disableBody(true, true);
      }
    
      abrirPorta() {
        if (this.chaves === 0) {
          this.chave.enableBody(true, 50, 585, true, true);
          this.mensagem2.enableBody(true, 2300, 450, true, true);
          this.jogador_1.stop;
          this.invisivel.destroy();
          this.invisivel2.destroy();
          this.invisivel3.destroy();
          this.monstro.destroy();
          this.mensagem.destroy();
          this.game.socket.emit("artefatos-publicar",{invisivel: this.invisivel, invisivel3: this.invisivel3, invisivel2: this.invisivel, monstro: this.monstro, mensagem: this.mensagem});
        } else {
          this.porta.anims.stop();
          this.porta.setFrame(5);
          this.game.scene.stop("fase1");
          this.game.scene.start("fase2");
    
        }
      }
    
      coletarChave() {
        this.chave.disableBody(true, true);
        this.mensagem2.destroy();
        this.invisivel4.destroy();
        this.metal_som.play();
    
        /* Jogador 1 tem uma chave a mais */
        this.chaves += 1;
    
        /* Avisa o outro jogador que coletou uma chave */
        this.game.socket.emit("artefatos-publicar",{chaves: this.chaves})
      }
    } 

