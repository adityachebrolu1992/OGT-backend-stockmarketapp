// console.log("this is server, i am listening");

// const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json()) //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //to support url-encoded-bodies
let arr = [];
app.post("/myStockFeed", (req, res) => {
    const body = req.body;
    // id2 = new Date().valueOf();
    let id = JSON.stringify(req.body["id"]);

    console.log(id);
    fs.writeFile(`${id}.json`, JSON.stringify(req.body), "utf-8", (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(body);
        }
    })
})


app.put("/myStocks/:stockID", (req, res) => {
    const body = req.body;
    const stockID = req.params.stockID;

    fs.readFile(`search/${stockID}.json`, "utf-8", (err, fileData) => {
        if (err) {
            res.status(404).send("Not found");
        } else {
            const existingData = JSON.parse(fileData);
            existingData.shares = body.shares;
            existingData.price = body.price;
            fs.writeFile(`search/${stockID}.json`, JSON.stringify(existingData), "utf-8", (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(existingData);
                }
            });
        }
    });

});

app.delete(`myStocks/:stockID`, (req, res) => {
    const stockID = req.params.stockID;

    fs.unlink(`search/${stockID}.json`, (err) => {
        if (err) {
            res.status(404).send("file not found");
        }
        else {
            res.sendStatus(200);
        }
    });
});

app.get(`/myStocks`, (err, files) => {
    const arr = [];
    fs.readdir(`search`, (err, files) => {
        files.forEach(file => {
            fs.readFile(`search/` + file, "utf-8", (err, fileData) => {
                const jsonData = JSON.parse(fileData);
                arr.push(jsonData);
                if (arr.length === files.length) {
                    res.send(arr);
                }
            })
        });
    })
});




app.get("/myStock", function (req, res) {
    res.sendFile(__dirname + "/search/data1.json");
    console.log("hello express")
});

app.get("/json", (req, res) => {
    res.json(
        { message: "Hello json" }
    );
});

app.listen(9999);