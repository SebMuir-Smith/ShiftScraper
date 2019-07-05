///<reference path='Website.ts'/>
import { Website } from "./Website";
const fs = require('fs');


// For some reason ./ is not working here
const firstWebsiteData = require(process.cwd() + "/data/obgaHeader.json");
const firstWebsiteForms = require(process.cwd() + "/data/obgaFormData.json");

let firstWebsite = new Website(firstWebsiteData, firstWebsiteForms);

// Get data and scrape it
firstWebsite.GetData()
    .then((response) => firstWebsite.RedirectRequest(response, 1)
        .then((response) => {
            firstWebsite.ScrapeData(response.body);
            console.log(firstWebsite.shifts);
        }))
    .catch((response) => {
        fs.writeFileSync("errorout.html", response);
        firstWebsite.ScrapeData(response)
    });



const secondWebsiteData = require(process.cwd() + "/data/gctcHeader.json");
const secondWebsiteForms = require(process.cwd() + "/data/gctcFormData.json");
let secondWebsite = new Website(secondWebsiteData,secondWebsiteForms);

// Get data and scrape it
secondWebsite.GetData()
    .then((response) => secondWebsite.RedirectRequest(response, 1)
        .then((response) => {
            secondWebsite.RedirectRequest(response, 2).then((res) => { secondWebsite.ScrapeData(res.body) })
        }))
    .catch((response) => {
        fs.writeFileSync("errorout.html", response);
        secondWebsite.ScrapeData(response)
    });

