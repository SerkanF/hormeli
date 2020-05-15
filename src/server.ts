/**
 * Création d'un classe Server pour gérer la configuration de notre serveur nodejs
 */

import { Response, Request, Router } from "express";
import express from 'express';
import { ConfigServer } from "./config-server";
const bodyParser = require('body-parser');

export class Server {

    port: number;
    appExpress: any;
    
    private static instance : Server;

    private constructor(port : number) {
        this.port = port;
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new Server(4200);
        }
        return this.instance;
    }

    /**
     * Fonction pour démarrer notre serveur
     */
    start() {

        let self = this;
        
        self.appExpress = express();
        self.appExpress.use(bodyParser.urlencoded({ extended: true }));
        self.appExpress.use(bodyParser.json());
        self.appExpress.use(bodyParser.raw());

        let configServer : ConfigServer = new ConfigServer();
        configServer.initConfig();

        self.run();
    }

    run() {
        let self = this;

        self.appExpress.listen(self.port, function() {
            console.log("Server started");
        });
    }

    getAppExpress() {
        return this.appExpress;
    }

 }