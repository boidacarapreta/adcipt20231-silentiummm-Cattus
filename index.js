// Configuração do jogo
import config from "./config.js";

// Cena de abertura
import CenaDeAbertura from "./cena.js";

// Cena principal
import CenaPrincipal from "./cenaprincipal.js";

// Cena Encerramento 1 
import CenaEncerramento1 from "./cenaencerramento1.js";

// Cena Encerramento 2
import CenaEncerramento2 from "./cenaencerramento2.js";


class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    //Carregar as cenas
    this.scene.add("abertura", CenaDeAbertura);
    this.scene.add("Cena Principal", CenaPrincipal);
    this.scene.add("Cena de Encerramento 1", CenaEncerramento1);
    this.scene.add("Cena de Encerramento 2", CenaEncerramento2);
    //
    // Iniciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
