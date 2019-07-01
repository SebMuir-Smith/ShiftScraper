///<reference path='Website.ts'/>

import { Website } from "./Website";
const fs = require('fs');
// For some reason ./ is not working here
let myWebsite:Website = require(process.cwd() + "/data/obgaHeader.json");

console.log(...'nice');

myWebsite = new Website(myWebsite.url,myWebsite.employer,myWebsite.formData,myWebsite.headers);

console.log(myWebsite);

myWebsite.GetData()
    .then((response) => myWebsite.ScrapeData(response))
    .catch((response) => {fs.writeFileSync("errorout.html",response);
    myWebsite.ScrapeData(response)});

