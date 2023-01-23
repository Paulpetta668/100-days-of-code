const express = require("express");

const simbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var tokens = [];

const api = express();
const porta = 40000;

api.listen(porta, () => {
    console.log("Api avviata e in ascolto sulla porta " + porta);
});

api.get("/ping", (req, res) =>{
    res.send("Pong");
});

api.post("/entry", (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let name = "";

    console.log("Richiesta di accesso da parte di " + ip);

    if(validIP(ip)){
        console.log("IP valido");
        let token = genToken();

        tokens.push({ name: name, ip: ip, token: token });
        console.log("Token generato: " + tokens);
        res.status(200).send( token );
    }else res.sendStatus(400);
});

function genToken(){
    let token = "";
    for(let i = 0; i < 20; i++){
        token += simbols[Math.floor(Math.random() * simbols.length)];
    }
    return token;
}
function validIP(ip){
    let temp = ip.split(":");
    temp = temp[3].split(".");
    
    if(temp.length != 4) return false;
    for(let i = 0; i < temp.length; i++){
        if(isNaN(temp[i])) return false;
    }
    return true;
}