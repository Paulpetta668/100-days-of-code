const express = require('express')
const fs = require('fs')

const simbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const app = express()
const port = 40000

var devices = [];
var measurements = [];
var history = [];
var users = [];

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)

    fs.readFile("devices.json", (err, data) => {
        if(err) console.log(err);
        else{
            devices = JSON.parse(data);
            console.log("Loaded devices from file");
        }
    });
    fs.readFile("measurements.json", (err, data) => {
        if(err) console.log(err);
        else{
            measurements = JSON.parse(data);
            console.log("Loaded measurements from file");
        }
    });
    fs.readFile("history.json", (err, data) => {
        if(err) console.log(err);
        else{
            history = JSON.parse(data);
            console.log("Loaded history from file");
        }
    });
    fs.readFile("users.json", (err, data) => {
        if(err) console.log(err);
        else{
            users = JSON.parse(data);
            console.log("Loaded users from file");
        }
    });
});

app.get('/ping', (req, res) => {
    res.send("pong")
});

app.get("/entry", (req, res) =>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Token requested from: " + ip);

    let Name = req.query.name;
    let indexFound = devices.findIndex(x => x.name == Name);

    if(indexFound == -1) {
        devices.push({name: Name, ip: ip, token: genToken(), lastAccess: new Date()});
        console.log("Token generated for: " + ip);

        saveToFile();
        res.status(200).send(genToken());
    }
    else{
        if(devices[indexFound].ip == ip){
            res.status(200).send(devices[indexFound].token);
            console.log("Token sent to: " + ip);
        }else{
            res.status(403).send("Forbidden");
            console.log("Token request from: " + ip + " refused");
        }
    }    
})
app.get("/requestTK", (req, res) =>{
    
});
app.get("/putTempHum", (req, res) =>{
    let temp = req.query.t;
    let hum = req.query.h;

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let indexFound = devices.findIndex(x => x.ip == ip);

    if(indexFound == -1){
        res.status(403).send("Forbidden");
        console.log("TempHum request from: " + ip + " refused");
    }else{
        if(devices[indexFound].token == req.query.token){
            console.log("TempHum request from: " + ip + " accepted");

            devices[indexFound].lastAccess = new Date();

            if(measurements.findIndex(x => x.name == devices[indexFound].name) == -1) measurements.push({name: devices[indexFound].name, temp: temp, hum: hum, lastSent: new Date()});
            else{
                measurements[measurements.findIndex(x => x.name == devices[indexFound].name)].temp = temp;
                measurements[measurements.findIndex(x => x.name == devices[indexFound].name)].hum = hum;
                measurements[measurements.findIndex(x => x.name == devices[indexFound].name)].lastSent = new Date();
            }

            history.push({name: devices[indexFound].name, temp: temp, hum: hum, date: new Date()});
            saveToFile();
            res.status(200).send("OK");
        }else{
            res.status(403).send("Forbidden");
            console.log("TempHum request from: " + ip + " refused");
        }
    }
});

app.post("/login", (req, res) =>{
    
});

function genToken(){
    var token = "";
    for (var i = 0; i < 32; i++) token += simbols.charAt(Math.floor(Math.random() * simbols.length));
    return token;
}
function saveToFile(){ //Every time a new token is generated, the file is updated
    fs.writeFile("devices.json", JSON.stringify(devices), (err) => {
        if(err) console.log(err);
    });
    fs.writeFile("measurements.json", JSON.stringify(measurements), (err) => {
        if(err) console.log(err);
    });
    fs.writeFile("history.json", JSON.stringify(history), (err) => {
        if(err) console.log(err);
    });
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if(err) console.log(err);
    });
}