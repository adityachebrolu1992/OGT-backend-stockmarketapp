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
//{"id":25, "key": "IBM", "Name": "Integrnational Business Model", "numberOfShares": 25, "costOfPurchase": 55}
//ADD a new company to my List

app.post("/search", (req, res) => {
    const body = req.body;
    dataPresentFlag = true;
    let inputedData = req.body;
    arr.push(inputedData);
    console.log("post-mysearch", arr);
});

//ADD some shares to one of my company 

app.put("/updateSearch", (req, res) => {
    const body = req.body;
    let index = Number(JSON.parse(body[0]));
    let incomingShares = Number(JSON.parse(body[1]));
    let incomingPrice = Number(JSON.parse(body[2]));
    console.log("incomingShares=", incomingShares);
    console.log("incomingPrice=", incomingPrice);
    console.log("index=", index);
    arr[index]["numberOfShares"] = Number(arr[index]["numberOfShares"]) + Number(incomingShares);
    arr[index]["costOfPurchase"] = Number(arr[index]["costOfPurchase"]) + Number(incomingPrice);
    arr = [...arr];
    console.log("put-search", arr);
    res.status(200).send(arr);
});

//REMOVE some shares from one of my company after selling

app.put("/sellSomeShares", (req, res) => {
    const body = req.body;
    let index = Number(JSON.parse(body[0]));
    let incomingShares = Number(JSON.parse(body[1]));
    let incomingPrice = Number(JSON.parse(body[2]));
    arr[index]["numberOfShares"] = Number(incomingShares);
    arr[index]["costOfPurchase"] = Number(arr[index]["costOfPurchase"]) - Number(incomingPrice);
    console.log("sold shares", arr);
});

//DELETE a company after selling all it's shares
app.put("/deleteData", (req, res) => {
    const body = req.body;
    console.log("im in put-delete");
    let index = Number(JSON.parse(body[0]));
    console.log("index to delete=", index);
    arr.splice(index, 1);
    arr = [...arr];
    console.log("in put-delete", arr);
});

//SEND my list of companies and its details

app.get(`/myStocks`, (req, res) => {
    res.send(arr);
    console.log("in get", arr);
});


/*-----------------------------------------Previous data---------------------------------------------//
app.get(`/myStocks`, (err, files) => {
    // const arr = [];
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

app.post("/myStockFeed", (req, res) => {
    const body = req.body;
    // id2 = new Date().valueOf();
    let id = JSON.stringify(req.body["id"]);

    console.log(id);
    fs.writeFile(`search/${id}.json`, JSON.stringify(req.body), "utf-8", (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(body);
        }
    })
});

app.put("/myStocks/:stockID", (req, res) => {
    const body = req.body;
    const stockID = req.params.stockID;

    fs.readFile(`${stockID}.json`, "utf-8", (err, fileData) => {
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




//-----------------------------------------previous data----------------------------------------------*/
app.listen(9999);