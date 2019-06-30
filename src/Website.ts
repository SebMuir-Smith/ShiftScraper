export class Website{
  
    requestType:string = "GET";
    constructor(public url:string, public formData:object, public header:object){
        
    }
}