const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");

const app = express();

const httpsOptions = {
    key:  fs.readFileSync("./secrets/server.key"),
    cert: fs.readFileSync("./secrets/server.cert")
};

app.get("/", (req, res) => {
    res.send("Hello");
});



http
	.createServer(app)
	.listen(80, () => console.log("HTTP listening on 80"));

https
	.createServer(httpsOptions, app)
	.listen(443, () => console.log("HTTPS listening on 443"));
