const http = require('http');
const request = require('request');
const url = require('url');

const port = "4000";
const url_checkstatus = "/checkstatus";

function handler(req, res) {
    var query = url.parse(req.url, true).query;
    var uri = query.pu;
    if (req.url.startsWith(url_checkstatus) && uri) {
        request(uri, (e, r, b) => {
            var status = 500;
            if (!e && r) {
                status = r.statusCode;
            }
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            });
            res.write(JSON.stringify({ status: status }));
            res.end();
        })
    } else {
        res.writeHead(404);
        res.write(JSON.stringify({ error: "Resource not found" }));
        res.end();
    }
};

http.createServer(handler).listen(port);