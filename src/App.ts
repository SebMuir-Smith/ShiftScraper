///<reference path='KeyValue.ts'/>
///<reference path='Website.ts'/>

let myWebsite: Website = new Website("https://threepointsix.azurewebsites.net", "443", "/api/post",
    [{ key: "Message", value: "nice" }, { key: "Authors", value: ["BigMemeDaddy"] }], [{ key: "Authors", value: ["BigMemeDaddy"] }]);

console.log(myWebsite);
