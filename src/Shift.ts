export class Shift {
    startTime:Date;

    endTime:Date;

    location:string;

    position:string;

    event:string;

    constructor(date:string, startTime:string, endTime:string, location:string, position:string, event:string){
        let [day,month,year] = date.split("/").map((input) => Number.parseInt(input));

        // Construct and assign a new datetime object for the starting time of the shift
        let [hour, minute] = startTime.split(":").map((input) => Number.parseInt(input));
        this.startTime = new Date(year,month,day,hour,minute);

        // Do the same thing for end time. Note that this assumes that shifts can't cross over multiple dates
        [hour, minute] = endTime.split(":").map((input) => Number.parseInt(input));
        this.endTime = new Date(year,month,day,hour,minute);

        this.location = location;

        this.position = position;

        this.event = event;
    };
}