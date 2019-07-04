///<reference path='Website.ts'/>
import { Website } from "./Website";
const fs = require('fs');


// For some reason ./ is not working here
const firstWebsiteData = require(process.cwd() + "/data/obgaHeader.json");

let firstWebsite = new Website(firstWebsiteData);

// Get data and scrape it
firstWebsite.GetData()
    .then((response) => firstWebsite.RedirectRequest(response)
        .then((response) => {
            firstWebsite.ScrapeData(response.body);
            fs.writeFileSync("SuccessOut.html", response.body)
        }))
    .catch((response) => {
        fs.writeFileSync("errorout.html", response);
        firstWebsite.ScrapeData(response)
    });


