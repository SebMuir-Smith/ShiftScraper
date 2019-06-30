import * as request from "request-promise";
import { promises } from "fs";

export class Website {

    requestType: string = "GET";
    constructor(public url: string, public formData: object, public headers: object) {
    }

    async GetData(): Promise<object[]> {

        let options = {
            url: this.url,
            headers: this.headers,
            json: true
        }

        const topTen = await request(options);

        return topTen;
    }
}