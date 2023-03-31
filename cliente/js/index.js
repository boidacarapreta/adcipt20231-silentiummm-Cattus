
// Configuração do jogo
import config from "./config.js";

// Cena de abertura
import abertura from "./abertura.js";

// Cena principal
import principal from "./principal.js";

// Cena Encerramento 1 
import encerramento1 from "./encerramento1.js";

// Cena Encerramento 2
import encerramento2 from "./encerramento2.js";


class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    //Carregar as cenas
    this.scene.add("Abertura", abertura);
    this.scene.add("Cena Principal", principal);
    this.scene.add("Cena de Encerramento 1", encerramento1);
    this.scene.add("Cena de Encerramento 2", encerramento2);
    //
    // Iniciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};