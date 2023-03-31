<<<<<<< HEAD

=======
>>>>>>> eb113510d97606725da043c5a861090c363e4935
// Configuração do jogo
import config from "./config.js";

// Cena de abertura
<<<<<<< HEAD
import abertura from "./abertura.js";

// Cena principal
import principal from "./principal.js";

// Cena Encerramento 1 
import encerramento1 from "./encerramento1.js";

// Cena Encerramento 2
import encerramento2 from "./encerramento2.js";
=======
import CenaDeAbertura from "./cena.js";

// Cena principal
import CenaPrincipal from "./cenaprincipal.js";

// Cena Encerramento 1 
import CenaEncerramento1 from "./cenaencerramento1.js";

// Cena Encerramento 2
import CenaEncerramento2 from "./cenaencerramento2.js";
>>>>>>> eb113510d97606725da043c5a861090c363e4935


class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    //Carregar as cenas
<<<<<<< HEAD
    this.scene.add("Abertura", abertura);
    this.scene.add("Cena Principal", principal);
    this.scene.add("Cena de Encerramento 1", encerramento1);
    this.scene.add("Cena de Encerramento 2", encerramento2);
=======
    this.scene.add("abertura", CenaDeAbertura);
    this.scene.add("Cena Principal", CenaPrincipal);
    this.scene.add("Cena de Encerramento 1", CenaEncerramento1);
    this.scene.add("Cena de Encerramento 2", CenaEncerramento2);
>>>>>>> eb113510d97606725da043c5a861090c363e4935
    //
    // Iniciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
<<<<<<< HEAD
};
=======
};
>>>>>>> eb113510d97606725da043c5a861090c363e4935
