import { Client } from "./client";

/**
 * Change this service to use Firebase instance of data attribute
 */
export default class ClientService {

    data : Client[] = [];

    private static instance : ClientService;

    private constructor() {}

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ClientService();
        }

        return this.instance;
    }

    findAll() : Client[] {
        return ClientService.instance.data;
    }

    add(client : Client) : Client[] {
        ClientService.instance.data.push(client);
        return ClientService.instance.findAll();
    }

    update(client : Client) : Client[] {

        for (let index = 0; index < ClientService.instance.data.length; index++) {
            const element = ClientService.instance.data[index];
            if (element.id == client.id) {
                ClientService.instance.data[index] = client;
            }
        }

        return ClientService.instance.findAll();
    }

    delete(id : any) : Client[] {

        let index = null;

        for (let i = 0; i < ClientService.instance.data.length; i++) {
            const element = ClientService.instance.data[i];
            if (element.id == id) {
                index = i;
            }
        }

        if (index != null) {
            ClientService.instance.data.splice(index, 1);
        }

        return this.findAll();
    }


}