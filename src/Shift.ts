export class Shift {
    startTime:Date = new Date();

    endTime:Date = new Date();

    location:string = "";

    position:string = "";

    event:string = "";

    constructor(date:string, startTime:string, endTime:string, location:string, position:string, event:string){
        let [day,month,year] = date.split("/");
    };
}