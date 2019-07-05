export class Redirect{
    redirectUrl: string;

    redirectFormData: any;

    redirectMethod:string;

    constructor (objIn: {redirectUrl:string, redirectFormData:any, redirectMethod:string}){
        this.redirectUrl = objIn.redirectUrl;

        this.redirectFormData = objIn.redirectFormData;

        this.redirectMethod = objIn.redirectMethod;
    }
}