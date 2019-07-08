export class Redirect{
    redirectUrl: string;

    redirectFormData: any;

    redirectMethod:string;

    // Used to test if the next month of shifts should be searched as well
    nextMonth:boolean;

    constructor (objIn: {redirectUrl:string, redirectFormData:any, redirectMethod:string, nextMonth:boolean}){
        this.redirectUrl = objIn.redirectUrl;

        this.redirectFormData = objIn.redirectFormData;

        this.redirectMethod = objIn.redirectMethod;

        // Give the nextMonth variable a default of false
        this.nextMonth = objIn.nextMonth == null ? false : objIn.nextMonth;
    }
}