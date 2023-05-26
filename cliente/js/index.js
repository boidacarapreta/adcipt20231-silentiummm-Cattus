import config from "./config.js";
import salas from "./salas.js";
import abertura from "./abertura.js";
import fase1 from "./fase1.js";
import fase2 from "./fase2.js";
import fase3 from "./fase3.js";
import fase4 from "./fase4.js";
import final from "./final.js";

class Game extends Phaser.Game {
  constructor() {

    super(config);

    /* Lista de servidor(es) ICE */
    this.ice_servers = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    /* Associação de objeto HTML de áudio e objeto JS */
    this.audio = document.querySelector("audio");

    this.socket = io();
    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });
    this.scene.add("abertura", abertura);
    this.scene.add("salas", salas);
    this.scene.add("fase1", fase1);
    this.scene.add("fase2", fase2);
    this.scene.add("fase3", fase3);
    this.scene.add("fase4", fase4);
    this.scene.add("final", final);
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
