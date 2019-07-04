
class RegexContainer{
     start:string;

     end:string;

     date:string;

     location:string; 
     
     position:string; 
     
     event:string;

     constructor(objIn : {start:string, end:string, date:string, location:string, position:string, event:string}){

         this.start = objIn.start;

         this.end = objIn.end;

         this.date = objIn.date;

         this.location = objIn.location;

         this.position = objIn.position;

         this.event = objIn.event;
     }
}