import * as request from "request-promise";
import { IncomingMessage } from "http";
import { Shift } from "./Shift";

///<reference path='Shift.ts'/>
///<reference path='Headers.ts'/>
///<reference path='RegexContainer.ts'/>
export class Website {

    shifts: Shift[] = [];

    url: string;

    employer: string;

    formData: any;

    headers: Header;

    redirectUrl: string;

    redirectFormData: any;

    regex: RegexContainer;

    requestType: string = "POST";

    constructor(objIn: {
        url: string, employer: string, formData: object, headers: Header,
        redirectUrl: string, redirectFormData: object, regex: RegexContainer
    }) {
        this.url = objIn.url;

        this.employer = objIn.employer;

        this.formData = objIn.formData;

        this.headers = objIn.headers;

        this.redirectUrl = objIn.redirectUrl;

        this.redirectFormData = objIn.redirectFormData;

        this.regex = objIn.regex;
    }

    // Pull data from website
    async GetData(): Promise<any> {

        const options = {
            method: this.requestType,
            uri: this.url,
            headers: this.headers,
            form: this.formData,
            resolveWithFullResponse: true,
            followRedirect: true,
            simple: false
        }

        const response = await request(options);

        return response;
    }

    // Scrape the data to fill the shifts array
    ScrapeData(htmlIn: string): void {
        console.log(htmlIn);

        // Scrape all the data, the (|| []) assigns an empty array if no shifts found
        let dates = new RegExp(this.regex.date, "g").exec(htmlIn) || [];
        let startTimes = new RegExp(this.regex.start, "g").exec(htmlIn) || [];
        let endTimes = new RegExp(this.regex.end, "g").exec(htmlIn) || [];
        let locations = new RegExp(this.regex.location, "g").exec(htmlIn) || [];
        let positions = new RegExp(this.regex.position, "g").exec(htmlIn) || [];
        let events = new RegExp(this.regex.event, "g").exec(htmlIn) || [];

        // Convert the scraped data into a Shift object for each datum
        // This assumes that number of dates scrapes = number of shifts = length of all other arrays
        // Iterator increments two values at a time as due to grouping each match yields two strings
        for (let shiftNumber: number = 1; shiftNumber < dates.length; shiftNumber = shiftNumber + 2) {
            this.shifts.push(new Shift(dates[shiftNumber], startTimes[shiftNumber], endTimes[shiftNumber],
                locations[shiftNumber], positions[shiftNumber], events[shiftNumber]))
        }

    }

    // Continue redirection if a 302 is returned, by setting cookies
    // then going to the redirected page
    RedirectRequest(response: IncomingMessage): Promise<any> {

        const cookies: string[] = response.headers["set-cookie"] || [];
        let cookieConstructionString = "";
        for (let i = 0; i < cookies.length; i++) {
            cookieConstructionString += this.RemovePath(cookies[i]);
        }

        this.headers.Cookie = cookieConstructionString;

        this.url = this.redirectUrl;
        this.formData = this.redirectFormData;

        return this.GetData();
    }

    // Removes the "path=;" part of the given cookie 
    RemovePath(cookie: string): string {
        return cookie.split("; ")[0]
    }

}