///<reference path='KeyValue.ts'/>
export class Website{
  
    constructor(public hostname:string, public port:string,
        public path:string, public formData:KeyValue[], public header:KeyValue[]){
        
    }
}