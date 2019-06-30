import * as request from "request-promise";

export class Website {

    requestType: string = "GET";
    constructor(public url: string, public formData: object, public headers: object) {
    }

    getData(): void {

        let options = {
            url: this.url,
            headers: this.headers,
            json: true
        }

        request(options)
            .then((response) => {
                console.log(response);
            })

    }
}