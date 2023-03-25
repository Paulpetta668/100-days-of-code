const express = require("express");
const fs = require("fs");
const mysql = require('mysql');
const Utils = require("./dbUtils.js");

const api = express();
const db = new Utils(mysql);

const porta = 35000;
const pathPrefix = "./MP3s";

api.listen(porta, () => {
    console.log("Api avviata e in ascolto sulla porta " + porta);
    
});

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
});

api.get("/song/:filename", (req, res) =>{
    var fileName = req.params['filename'];
    var finds = searchSong(fileName);

    if(finds.length > 0){
        //Creat Json response
        var json = new Object();
        json["songs"] = new Array();

        for(file of finds){
            var song = new Object();
            song["name"] = file;
            song["path"] = pathPrefix + "/" + file;
            json["songs"].push(song);
        }

        res.status(200).send(json);
    }else{
        res.status(300).send("File non trovato");
    }
});

api.post("/user/login", (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;

    try{
        if(db.loginUser(username, password)) res.status(200).send("Utente trovato!");
        else res.status(400).send("Utente non trovato!");
    }catch(err){
        res.status(300).send("Errore: " + err);
    }
});

api.post("/user/signup", (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    try{
        if(db.registerUser(username, password, email)) res.status(200).send("Utente registrato!");
        else res.status(400).send("Utente non registrato!");
    }catch(err){
        res.status(300).send("Errore: " + err);
    }
});

function searchSong(songName){
    let finds = new Array();
    let files = fs.readdirSync(pathPrefix);

    for(file of files){
        if(advancedSearch(file, songName)){
            finds.push(file);
        }
    }

    console.log(finds);
    return finds;
}
function advancedSearch(file, songName){
    if (file.toLowerCase().includes(songName.toLowerCase())) return true;
    if (file.toLowerCase().includes(songName.toLowerCase().replace(/ /g, "_"))) return true;
    if (file.toLowerCase().includes(songName.toLowerCase().replace(/ /g, "-"))) return true;
    if (file.toLowerCase().includes(songName.toLowerCase().replace(/ /g, ""))) return true;

    return false;
}