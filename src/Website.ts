import * as request from "request-promise";

///<reference path='Shift.ts'/>

export class Website {

    shifts: Shift[] = [];

    requestType: string = "GET";
    constructor(public url: string, public employer: string, public formData: object, public headers: object) {
    }

    // Pull data from website
    async GetData(): Promise<string> {

        const options = {
            url: this.url,
            headers: this.headers,
            json: true
        }

        const response = await request(options);

        return response;
    }

    // Scrape the data to fill the shifts array
    ScrapeData(htmlIn: string): void {


    }
}