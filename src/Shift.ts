export class Shift {
    startTime: Date;

    endTime: Date;

    location: string;

    position: string;

    event: string;

    constructor(date: string, startTime: string, endTime: string, location: string, position: string, event: string) {
        let [day, month, year] = date.split("/").map((input) => Number.parseInt(input));

        // Construct and assign a new datetime object for the starting time of the shift
        let [hour, minute] = startTime.split(":").map((input) => Number.parseInt(input));
        this.startTime = new Date(year, month, day, hour, minute);

        // Do the same thing for end time. Note that this assumes that shifts can't cross over multiple dates
        [hour, minute] = endTime.split(":").map((input) => Number.parseInt(input));
        this.endTime = new Date(year, month, day, hour, minute);

        this.location = Shift.CleanHtml(location);

        this.position = Shift.CleanHtml(position);

        this.event = Shift.CleanHtml(event);
    };

    // Clean and return the inputted string to remove html artifacts or unwanted spaces
    static CleanHtml(input:string):string{

        // Remove first character if it's just a space
        input = input[0] == "" ? input.substring(1,input.length) : input;

        // Split on incorrectly formatted ampersands so that they can be removed
        const splitArray:string[] = input.split("&amp;");

        // Add characters before the first ampersand to the output
        let out:string = splitArray[0];

        // Progressively add ampersands and the remaining text, recreating the original string
        for (let i = 1; i < splitArray.length; i++){
            out += "&" + splitArray[i];
        }

        return out;
    }
}