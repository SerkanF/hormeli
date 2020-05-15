import { Product } from "./product";

/**
 * Change this service to use Firebase instance of data attribute
 */
export default class ProductService {

    data : Product[] = [];

    private static instance : ProductService;

    private constructor() {}

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ProductService();
        }

        return this.instance;
    }

    findAll() : Product[] {
        return ProductService.instance.data;
    }

    add(product : Product) : Product[] {
        ProductService.instance.data.push(product);
        return ProductService.instance.findAll();
    }

    update(product : Product) : Product[] {

        for (let index = 0; index < ProductService.instance.data.length; index++) {
            const element = ProductService.instance.data[index];
            if (element.id == product.id) {
                ProductService.instance.data[index] = product;
            }
        }

        return ProductService.instance.findAll();
    }

    delete(id : any) : Product[] {

        let index = null;

        for (let i = 0; i < ProductService.instance.data.length; i++) {
            const element = ProductService.instance.data[i];
            if (element.id == id) {
                index = i;
            }
        }

        if (index != null) {
            ProductService.instance.data.splice(index, 1);
        }

        return this.findAll();
    }


}