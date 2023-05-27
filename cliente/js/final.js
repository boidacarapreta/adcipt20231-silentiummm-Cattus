export default class final extends Phaser.Scene {
  constructor() {
    super("final");
  }

  preload() {
    // Imagem Inicial
    this.load.image("final", "./assets/final.png");
    // Botao de Start
    this.load.spritesheet("start", "./assets/botao/start.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    // Carregamento de arquivos/objetos em memória (desenhos aqui)
  }

  create() {
    // Carregar em tela e/ou
    // Registrar eventos

    // this.imagem_de_fundo = this.add.image(...)
    // this.botao = this.add.image(...).setInteractive.on("pointerdown", () => {...})

    this.imagem = this.add
      .image(400, 225, "final")
      .setInteractive()
      .on("pointerdown", () => {});

    this.start = this.add
      .sprite(400, 220, "start", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.start.setFrame(1);
      })
      .on("pointerup", () => {
        this.start.setFrame(0);
        this.imagem.destroy();
        this.texto.destroy();
        this.start.destroy();
        this.game.scene.start("abertura");
      });

    this.texto = this.add.text(320, 180, "Voltar ao início.", {
      fill: "#ffffff",
    });
  }
}
