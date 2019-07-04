import * as request from "request-promise";
import { IncomingMessage } from "http";

///<reference path='Shift.ts'/>
///<reference path='Headers.ts'/>
export class Website {

    shifts: Shift[] = [];

    requestType: string = "POST";
    constructor(public url: string, public employer: string, public formData: object, public headers: Header,
        public redirectUrl:string, public redirectFormData: object, public regex: object) {
    }

    // Pull data from website
    async GetData(): Promise<any> {

        const options = {
            method: this.requestType,
            uri: this.url,
            headers: this.headers,
            form: this.formData,
            resolveWithFullResponse: true,
            followRedirect:true,
            simple:false
        }

        const response = await request(options);

        return response;
    }

    // Scrape the data to fill the shifts array
    ScrapeData(htmlIn: string): void {
        console.log(htmlIn);

        let regex:RegExp;
        patterns:string[] = this.GetPatterns();
        for (let i = 0; i < Object.keys(this.regex).length; i++){
            regex = new RegExp(this.regex[i])

        }

    }

    // Continue redirection if a 302 is returned, by setting cookies
    // then going to the redirected page
    RedirectRequest(response:IncomingMessage):Promise<any>{

        const cookies:string[] = response.headers["set-cookie"] || [];
        let cookieConstructionString = "";
        for (let i = 0; i < cookies.length; i++){
            cookieConstructionString += this.RemovePath(cookies[i]);
       }

        this.headers.Cookie = cookieConstructionString;

        this.url = this.redirectUrl;
        this.formData = this.redirectFormData;

        return this.GetData();
    }

    RemovePath(cookie:string):string{
        return cookie.split("; ")[0]
    }

    GetPatterns():string[]{
        let patterns:RegExp[] = [];
        
        let keys:string[] = Object.keys(this.regex);

        let regex:object = this.regex;
        for (let i = 0; i < keys.length; i++){
            patterns.push(new RegExp(this.regex.(keys[i])), "g");

        }

        return []
    }
}