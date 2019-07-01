///<reference path='Website.ts'/>

import { Website } from "./Website";

// For some reason ./ is not working here
let obga:Website = require(process.cwd() + "/data/obgaHeader.json");

console.log(obga);

let myWebsite: Website = new Website("https://threepointsix.azurewebsites.net/api/post", "Sample Employer",
    [{ key: "Message", value: "nice" }, { key: "Authors", value: ["BigMemeDaddy"] }], [{ key: "Authors", value: ["BigMemeDaddy"] }]);

myWebsite.GetData()
    //.then((response) => myWebsite.ScrapeData(response));

// Second call for debugging
myWebsite.GetData()
    //.then((response) => console.log(response));
