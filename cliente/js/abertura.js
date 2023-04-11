export default class CenaDeAbertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {

    // Imagem Inicial
    this.load.image("tela", "./assets/tela.png");
    // Botao de Start
    this.load.spritesheet("start", "./assets/botao/start.png", {
        frameWidth: 64,
        frameHeight: 16,
          });
    // Carregamento de arquivos/objetos em memória (desenhos aqui)
  }

  create() {
    // Carregar em tela e/ou
    // Registrar eventos


    // this.imagem_de_fundo = this.add.image(...)
    // this.botao = this.add.image(...).setInteractive.on("pointerdown", () => {...})

    this.imagem = this.add
      .image(400, 225, "tela")
      .setInteractive()
      .on("pointerdown", () => {
      });
    
    this.start = this.add
      .sprite(400, 80, "start", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.start.setFrame(1);
      })
      .on("pointerup", () => {
        this.start.setFrame(0);
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("principal");
      });
  
    this.texto = this.add.text(330, 50, "Clique em Start...", {
      fill: "#ffffff",

    });
  }
  
  update() {
    // Código executado a cada frame
  }
}
