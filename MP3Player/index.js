const express = require("express");
const fs = require("fs");
const sqlite = require("sqlite3").verbose();

const api = express();
const db = new sqlite.Database("Roba", (err) => {
    if(err){
        console.log("Errore nel caricamento del database");
    }else{
        console.log("Database caricato correttamente");
    }
});

const porta = 35000;
const pathPrefix = "./MP3s";

api.listen(porta, () => {
    console.log("Api avviata e in ascolto sulla porta " + porta);
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

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send(json);
    }else{
        res.status(300).send("File non trovato");
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