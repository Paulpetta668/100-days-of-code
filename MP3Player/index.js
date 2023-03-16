const express = require("express");
const fs = require("fs");

const api = express();

const porta = 32768;
const pathPrefix = "./MP3s";

api.listen(porta, () => {
    console.log("Api avviata e in ascolto sulla porta " + porta);
});

api.get("/song/:filename", (req, res) =>{
    var fileName = req.params['filename'];
    var finds = searchSong(fileName);

    res.send("<h3>Titolo canzone: " + finds + "</h3>");
});

function searchSong(songName){
    var finds = new Array();

    fs.readdir(pathPrefix, (err, files) =>{
        for(file of files){
            if(file.toLowerCase().includes(songName.toLowerCase())){
                console.log(file);
                
            }
        }
    });

    return finds;
}