import * as request from "request-promise";
import { IncomingMessage } from "http";
import { Shift } from "./Shift";
import { Redirect } from "./Redirect";

///<reference path='Shift.ts'/>
///<reference path='Headers.ts'/>
///<reference path='RegexContainer.ts'/>
export class Website {

    shifts: Shift[] = [];

    url: string;

    employer: string;

    formData: any;

    headers: Header;

    regex: RegexContainer;

    requestType: string;

    redirects:Redirect[];

    constructor(objIn: {
        headers: Header, employer:string,
        redirects:Redirect[], regex: RegexContainer
    }, formDataIn : object[]) {

        this.employer = objIn.employer;

        this.headers = objIn.headers;

        this.regex = objIn.regex;

        this.redirects = objIn.redirects;

        // Add the sensitive form data from a separate file
        for (let i = 0; i < formDataIn.length; i++){
            this.redirects[i].redirectFormData = formDataIn[i];
        }

        // Set the current url, formData and request method to the first of the redirects
        this.url = this.redirects[0].redirectUrl;
        this.formData = this.redirects[0].redirectFormData;
        this.requestType = this.redirects[0].redirectMethod;
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
    // then going to the next desired page in the json
    RedirectRequest(response: IncomingMessage, redirectIndex:number): Promise<any> {

        const cookies: string[] = response.headers["set-cookie"] || [];
        let cookieConstructionString = "";
        for (let i = 0; i < cookies.length; i++) {
            cookieConstructionString += Website.RemovePath(cookies[i]) + "; ";
        }

        // For the first request, there won't be any cookies yet
        if (this.headers.Cookie == null){
            this.headers.Cookie = "";
        }
        
        this.headers.Cookie += cookieConstructionString;

        this.url = this.redirects[redirectIndex].redirectUrl;

        // Redirect to next month's shift page instead if desired
        if (this.redirects[redirectIndex].nextMonth){
            const today:Date = new Date();

            // Handle if the next month is january of next year
            if (today.getMonth() != 11){
                this.url += `?Month=${today.getMonth() + 2}&Year=${today.getFullYear()}&vm=1`;
            }
            else{
                this.url += `?Month=0&Year=${today.getFullYear() + 1}&vm=1`;
            }
            
        }

        this.formData = this.redirects[redirectIndex].redirectFormData;
        this.requestType = this.redirects[redirectIndex].redirectMethod;

        return this.GetData();
    }

    // Removes the "path=;" part of the given cookie 
    static RemovePath(cookie: string): string {
        return cookie.split("; ")[0]
    }

}