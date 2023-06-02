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
    let iceServers;
    if (window.location.host === "ifsc.digital") {
      this.socket = io.connect({ path: "/Cattus/socket.io/" });

      iceServers = [
        {
          urls: "stun:ifsc.digital",
        },
        {
          urls: "turns:ifsc.digital",
          username: "Cattus",
          credential: "Cattus",
        },
      ];
    } else {
      this.socket = io();

      iceServers = [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ];
    }
    this.ice_servers = { iceServers };
    this.audio = document.querySelector("audio");

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });
    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });
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
