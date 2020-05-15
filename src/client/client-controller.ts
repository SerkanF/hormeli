import { Server } from "../server";
import { Response, Request, Router } from "express";
import ClientService from "./client-service";
import { ResponseEntity } from "../common/response";

export class ClientController {

    clientService : ClientService;

    private static instance : ClientController;

    private constructor() {
        this.clientService = ClientService.getInstance();
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ClientController();
        }
        return this.instance;
    }

    public addRoutes() {
        let app = Server.getInstance().getAppExpress();
        app.route("/clients").get(this.getAction);
        app.route("/clients").post(this.postAction);
        app.route("/clients").put(this.putAction);
        app.route("/clients").delete(this.deleteAction);
    }

    public getAction(req : Request, res : Response) {
        res.json(ClientController.instance.getResponseEntity());
    }

    public postAction(req : Request, res : Response) {
        ClientController.instance.clientService.add(req.body);
        res.json(ClientController.instance.getResponseEntity());
    }

    public putAction(req : Request, res : Response) {
        ClientController.instance.clientService.update(req.body);
        res.json(ClientController.instance.getResponseEntity());
    }

    public deleteAction(req : Request, res : Response) { 
        ClientController.instance.clientService.delete(req.query.id);
        res.json(ClientController.instance.getResponseEntity());
    }

    private getResponseEntity() : ResponseEntity {
        return {
            content : ClientController.instance.clientService.findAll(),
            status : 200
        }
    }

}