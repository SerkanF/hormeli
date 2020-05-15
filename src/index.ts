import { Server } from "./server";

// On créé une instance de notre objet server sur le port 4200
const myServer = Server.getInstance();

// On démarrer le server
myServer.start();