import { Server } from "../server";
import { Response, Request, Router } from "express";
import ProductService from "./product-service";
import { ResponseEntity } from "../common/response";

export class ProductController {
    
    productService : ProductService;

    private static instance : ProductController;

    private constructor() {
        this.productService = ProductService.getInstance();
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ProductController();
        }
        return this.instance;
    }

    public addRoutes() {
        let app = Server.getInstance().getAppExpress();
        app.route("/products").get(this.getAction);
        app.route("/products").post(this.postAction);
        app.route("/products").put(this.putAction);
        app.route("/products").delete(this.deleteAction);
    }

    public getAction(req : Request, res : Response) {
        console.log(ProductController.instance.productService);
        res.json(ProductController.instance.getResponseEntity());
    }

    public postAction(req : Request, res : Response) {
        ProductController.instance.productService.add(req.body);
        res.json(ProductController.instance.getResponseEntity());
    }

    public putAction(req : Request, res : Response) {
        ProductController.instance.productService.update(req.body);
        res.json(ProductController.instance.getResponseEntity());
    }

    public deleteAction(req : Request, res : Response) { 
        ProductController.instance.productService.delete(req.query.id);
        res.json(ProductController.instance.getResponseEntity());
    }

    private getResponseEntity() : ResponseEntity {
        return {
            content : ProductController.instance.productService.findAll(),
            status : 200
        }
    }
}