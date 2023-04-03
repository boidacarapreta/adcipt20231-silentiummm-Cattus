export default class CenaDeAbertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    this.load.image("teste1", "./assets/teste 1.webp");
    // Carregamento de arquivos/objetos em memória (desenhos aqui)
  }

  create() {
    // Carregar em tela e/ou
    // Registrar eventos
    this.imagem = this.add
      .image(400, 225, "teste1")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("principal");
      });
  
    this.texto = this.add.text(490, 50, "Clique no nariz do gato para entrar...", {
      fill: "#ffffff",

    });
  }
  
  update() {
    // Código executado a cada frame
  }
}
