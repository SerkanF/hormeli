import { ClientController } from "./client/client-controller";
import { ProductController } from "./product/product-controller";

export class ConfigServer {

    clientController : ClientController = ClientController.getInstance();
    productController : ProductController = ProductController.getInstance();

    public constructor() {
        this.clientController = ClientController.getInstance();
        this.productController = ProductController.getInstance();
    }

    initConfig() {
        this.clientController.addRoutes();
        this.productController.addRoutes();
    }

}