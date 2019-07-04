import * as request from "request-promise";
import { IncomingMessage } from "http";

///<reference path='Shift.ts'/>
///<reference path='Headers.ts'/>
///<reference path='RegexContainer.ts'/>
export class Website {

    shifts: Shift[] = [];

    url:string;

    employer:string;

    formData:any;

    headers:Header;

    redirectUrl:string;

    redirectFormData:any;

    regex:RegexContainer;

    requestType: string = "POST";

    constructor( objIn : { url: string,  employer: string,  formData: object,  headers: Header,
     redirectUrl:string, redirectFormData: object, regex:RegexContainer}) {
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
            followRedirect:true,
            simple:false
        }

        const response = await request(options);

        return response;
    }

    // Scrape the data to fill the shifts array
    ScrapeData(htmlIn: string): void {
        console.log(htmlIn);

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

        return []
    }
}