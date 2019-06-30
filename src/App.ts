///<reference path='Website.ts'/>

import { Website } from "./Website";

let myWebsite: Website = new Website("https://threepointsix.azurewebsites.net/api/post", 
[{ key: "Message", value: "nice" }, { key: "Authors", value: ["BigMemeDaddy"] }], [{ key: "Authors", value: ["BigMemeDaddy"] }]);

myWebsite.GetData()
.then((response) => myWebsite);

myWebsite.GetData()
.then((response) => console.log(response));

