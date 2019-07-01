import * as request from "request-promise";
import { resolve } from "bluebird";

///<reference path='Shift.ts'/>

export class Website {

    shifts: Shift[] = [];

    requestType: string = "POST";
    constructor(public url: string, public employer: string, public formData: object, public headers: object) {
    }

    // Pull data from website
    async GetData(): Promise<any> {

        const options = {
            uri: this.url,
            headers: this.headers,
            form: this.formData,
            resolveWithFullResponse: true
        }

        const response = await request(options);

        return response;
    }

    // Scrape the data to fill the shifts array
    ScrapeData(htmlIn: string): void {
        console.log(htmlIn);

    }
}