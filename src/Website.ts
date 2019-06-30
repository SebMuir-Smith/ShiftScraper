///<reference path='KeyValue.ts'/>
export class Website{
  
    requestType:string = "GET";
    constructor(public url:string, public formData:KeyValue[], public header:KeyValue[]){
        
    }
}